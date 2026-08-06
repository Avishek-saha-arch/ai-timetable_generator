from flask import Blueprint, jsonify

attendance_bp = Blueprint("attendance", __name__)


@attendance_bp.route("/", methods=["GET"])
def attendance():
    return jsonify({
        "message": "Attendance Module"
    })