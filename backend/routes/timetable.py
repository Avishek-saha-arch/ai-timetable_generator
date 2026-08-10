import uuid
import threading
from flask import Blueprint, request, jsonify
from ortools.sat.python import cp_model

timetable_bp = Blueprint('timetable', __name__, url_prefix='/api/timetable')

# In-memory storage for asynchronous generation jobs
generation_jobs = {}

DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

def run_solver_job(job_id, payload):
    """Background task to run the OR-Tools CP-SAT Constraint Solver."""
    try:
        class_name = payload.get('className', 'Class')
        section = payload.get('section', 'A')
        num_periods = int(payload.get('numPeriods', 6))
        period_duration = int(payload.get('periodDuration', 45))
        subjects = payload.get('subjects', [])

        # Filter subjects with non-zero allocation hours
        active_subjects = [s for s in subjects if int(s.get('hours', 0)) > 0]

        model = cp_model.CpModel()

        # Decision variables: x[s, d, p] = 1 if subject s is placed on day d, period p
        x = {}
        for s_idx, s in enumerate(active_subjects):
            for d_idx in range(len(DAYS)):
                for p_idx in range(num_periods):
                    x[s_idx, d_idx, p_idx] = model.NewBoolVar(f'x_{s_idx}_{d_idx}_{p_idx}')

        # Constraint 1: Exactly one subject per slot (Day x Period)
        for d_idx in range(len(DAYS)):
            for p_idx in range(num_periods):
                model.Add(sum(x[s_idx, d_idx, p_idx] for s_idx in range(len(active_subjects))) == 1)

        # Constraint 2: Satisfy weekly required hours for each subject
        for s_idx, s in enumerate(active_subjects):
            req_hours = int(s.get('hours', 0))
            model.Add(
                sum(x[s_idx, d_idx, p_idx] for d_idx in range(len(DAYS)) for p_idx in range(num_periods))
                == req_hours
            )

        # Constraint 3 (Soft heuristic): Distribute non-free subjects across days (Max 2 per day)
        for s_idx, s in enumerate(active_subjects):
            if s.get('id') != 'free_period_row':
                for d_idx in range(len(DAYS)):
                    model.Add(sum(x[s_idx, d_idx, p_idx] for p_idx in range(num_periods)) <= 2)

        solver = cp_model.CpSolver()
        solver.parameters.max_time_in_seconds = 10.0
        
        # Update progress before solving
        generation_jobs[job_id] = {'status': 'processing', 'progress': 50}

        status = solver.Solve(model)

        if status in (cp_model.OPTIMAL, cp_model.FEASIBLE):
            # Construct Day-keyed dictionary structure required by TimetableGrid.jsx
            # Format: { "Monday": [slot0, slot1, ...], "Tuesday": [...], ... }
            timetable_by_day = {day: [None] * num_periods for day in DAYS}

            for p_idx in range(num_periods):
                for d_idx, day in enumerate(DAYS):
                    assigned_subject = None
                    for s_idx, s in enumerate(active_subjects):
                        if solver.Value(x[s_idx, d_idx, p_idx]) == 1:
                            assigned_subject = s
                            break

                    if assigned_subject:
                        teachers = [t for t in assigned_subject.get('teachers', []) if isinstance(t, str) and t.strip()]
                        teacher_display = ", ".join(teachers) if teachers else "N/A"
                        is_free = assigned_subject.get('id') == 'free_period_row' or 'Free' in assigned_subject.get('name', '')

                        timetable_by_day[day][p_idx] = {
                            'subject': assigned_subject.get('name') or ('Free Period' if is_free else 'Lecture'),
                            'teacher': teacher_display,
                            'type': 'Break' if is_free else assigned_subject.get('type', 'Lecture'),
                            'color': 'emerald' if is_free else assigned_subject.get('color', 'blue'),
                            'room': assigned_subject.get('room', f'Room {101 + (d_idx + p_idx) % 10}')
                        }
                    else:
                        timetable_by_day[day][p_idx] = {
                            'subject': 'Free Period',
                            'teacher': 'N/A',
                            'type': 'Break',
                            'color': 'emerald',
                            'room': 'N/A'
                        }

            generation_jobs[job_id] = {
                'status': 'done',
                'progress': 100,
                'result': {
                    'className': f"{class_name} - {section}".strip(" -"),
                    'schedule': timetable_by_day
                }
            }
        else:
            generation_jobs[job_id] = {
                'status': 'failed',
                'progress': 100,
                'error': 'Could not satisfy all slot constraints with the given hours allocation.'
            }

    except Exception as e:
        generation_jobs[job_id] = {
            'status': 'failed',
            'progress': 100,
            'error': str(e)
        }


@timetable_bp.route('/generate', methods=['POST'])
def generate():
    payload = request.get_json() or {}
    job_id = str(uuid.uuid4())

    generation_jobs[job_id] = {'status': 'processing', 'progress': 10}

    # Execute constraint solving asynchronously
    thread = threading.Thread(target=run_solver_job, args=(job_id, payload))
    thread.start()

    return jsonify({'jobId': job_id}), 202


@timetable_bp.route('/status/<job_id>', methods=['GET'])
def get_status(job_id):
    job = generation_jobs.get(job_id)
    if not job:
        return jsonify({'error': 'Job ID not found'}), 404

    return jsonify(job), 200