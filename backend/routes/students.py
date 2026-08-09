from flask import Blueprint, jsonify
from services.student_services import get_students

student_bp = Blueprint("students", __name__)

@student_bp.get("/students")
def fetch_all_students():
    result, status = get_students()
    return jsonify(result), status