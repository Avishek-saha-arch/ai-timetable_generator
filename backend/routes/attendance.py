from flask import Blueprint, request, jsonify, make_response
from database.supabase import supabase  # Your initialized supabase client

attendance_bp = Blueprint('attendance', __name__)

@attendance_bp.route('/roster', methods=['GET', 'OPTIONS'])
def get_roster():
    if request.method == 'OPTIONS':
        return make_response('', 200)

    class_name = request.args.get('className')
    section = request.args.get('section')

    if not class_name or not section:
        return jsonify({
            'error': 'className and section are required'
        }), 400

    try:
        students_res = (
            supabase
            .table('students')
            .select(
                'id, user_id, name, className, section, roll, attendance'
            )
            .eq('className', class_name)
            .eq('section', section)
            .order('roll', desc=False)
            .execute()
        )

        students = students_res.data or []

        formatted_roster = []

        for s in students:
            formatted_roster.append({
                'id': s['id'],
                'user_id': s['user_id'],
                'name': s['name'],
                'roll': s.get('roll'),
                'className': s['className'],
                'section': s['section'],
                'attendance': s.get('attendance', 0),
                'status': 'Present'
            })

        return jsonify(formatted_roster), 200

    except Exception as e:
        print("Backend Error:", str(e))
        return jsonify({'error': str(e)}), 500

@attendance_bp.route('/save', methods=['POST', 'OPTIONS'])
def save_attendance():
    if request.method == 'OPTIONS':
        return make_response('', 200)

    try:
        data = request.get_json(silent=True) or {}

        print(data)

        records = data.get('records', [])

        if not records:
            return jsonify({
                'error': 'No attendance records provided'
            }), 400

        updated_count = 0

        for record in records:

            user_id = record.get('user_id')
            status = record.get('status')

            print(f"Processing: {user_id} -> {status}")

            if not user_id:
                print("Missing user_id")
                continue

            if status != 'Present':
                continue

            # Find student
            student_response = (
                supabase
                .table('students')
                .select('id, user_id, name, attendance')
                .eq('user_id', user_id)
                .limit(1)
                .execute()
            )

            print("Student found:", student_response.data)

            if not student_response.data:
                print(f"Student not found: {user_id}")
                continue

            student = student_response.data[0]

            current_attendance = student.get('attendance') or 0
            new_attendance = current_attendance + 1

            print(
                f"Updating {student['name']}: "
                f"{current_attendance} -> {new_attendance}"
            )

            update_response = (
                supabase
                .table('students')
                .update({
                    'attendance': new_attendance
                })
                .eq('user_id', user_id)
                .execute()
            )

            print("Update result:", update_response.data)

            updated_count += 1

        print("Total updated:", updated_count)

        return jsonify({
            'message': 'Attendance saved successfully',
            'updated': updated_count
        }), 200

    except Exception as e:
        print("Save Attendance Error:", repr(e))

        return jsonify({
            'error': str(e)
        }), 500