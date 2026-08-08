from flask import Blueprint, request, jsonify
from services.auth_services import login, register_user

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/login")
def login_route():
    data = request.get_json(silent=True) or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required"
        }), 400

    result, status = login(email, password)
    return jsonify(result), status


@auth_bp.post("/register")
def register():
    data = request.get_json(silent=True) or {} 
    required_fields = ["name", "email", "password", "role"]
    for field in required_fields:
        if not data.get(field):
            return jsonify({
                "success": False,
                "message": f"'{field}' is required"
            }), 400
        
    response = register_user(
        name=data["name"],
        email=data["email"],
        password=data["password"],
        role=data["role"]
    )

    if isinstance(response, tuple):
        result, status = response
    else:
        result = response
        status = 201 if result.get("success") else 400

    return jsonify(result), status  