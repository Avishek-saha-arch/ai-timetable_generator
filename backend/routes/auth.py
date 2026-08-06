from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    return jsonify({
        "message": "Login Successful",
        "email": email
    })


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    return jsonify({
        "message": "User Registered",
        "user": data
    })