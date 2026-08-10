from flask import Blueprint, request, jsonify
from services.auth_services import login, register_user, get_user_by_token

auth_bp = Blueprint("auth", __name__)


def normalize_auth_response(result):
    if not isinstance(result, dict):
        return result

    # Extract user data object
    user_data = result.get("user") or result.get("data", {}).get("user")
    
    # Extract token
    token = result.get("token") or result.get("access_token")

    # If top-level user details exist directly on result (e.g. result['email'])
    if not user_data and "email" in result:
        user_data = {
            "id": result.get("id"),
            "name": result.get("name"),
            "email": result.get("email"),
            "role": result.get("role", "student")
        }

    if user_data:
        result["user"] = user_data
    if token:
        result["token"] = token

    return result


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
    
    # Ensure payload contains { token, user }
    normalized_result = normalize_auth_response(result)
    
    return jsonify(normalized_result), status


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

    # Ensure payload contains { token, user }
    normalized_result = normalize_auth_response(result)

    return jsonify(normalized_result), status


@auth_bp.get("/me")
def get_current_user():
    auth_header = request.headers.get("Authorization", "")
    token = None

    if auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]

    if not token:
        return jsonify({"success": False, "message": "Missing authorization token"}), 401

    # Call service function to decode token/fetch profile from Supabase
    user, status = get_user_by_token(token) if 'get_user_by_token' in globals() else (None, 401)

    if not user or status != 200:
        return jsonify({"success": False, "message": "Invalid or expired session"}), 401

    return jsonify({
        "success": True,
        "user": user
    }), 200


@auth_bp.post("/logout")
def logout_route():
    # Session handling is client-side JWT removal
    return jsonify({"success": True, "message": "Logged out successfully"}), 200