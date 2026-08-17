from flask import Blueprint, jsonify
from services.students_services import get_students, get_total_students, get_average_attendance

students_bp = Blueprint("students", __name__)

@students_bp.get("/get-students")
def fetch_all_students():
    result, status = get_students()
    return jsonify(result), status

@students_bp.get("/count")
def student_count():
    result, status = get_total_students()
    return jsonify(result), status

@students_bp.get("/average-attendance")
def student_average_attendance():
    result, status = get_average_attendance()
    return jsonify(result), status