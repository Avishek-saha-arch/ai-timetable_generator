import os
import datetime
import jwt
import traceback
from werkzeug.security import generate_password_hash, check_password_hash
from database.supabase import supabase
import secrets
jwt_secret_key = secrets.token_hex(32)

# Secret key for signing JWT tokens (Fallback provided for development)
JWT_SECRET = jwt_secret_key
JWT_ALGORITHM = "HS256"


def generate_jwt_token(user_id: str, role: str) -> str:
    """Generates a JWT token valid for 7 days."""
    payload = {
        "sub": user_id,
        "role": role,
        "iat": datetime.datetime.now(datetime.timezone.utc),
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def register_user(name: str, email: str, password: str, role: str):
    try:
        # 1. Check if email already exists
        existing_user = supabase.table("users").select("id").eq("email", email).execute()
        if existing_user.data:
            return {"success": False, "message": "Email already registered"}, 400

        # 2. Hash the password
        hashed_password = generate_password_hash(password)

        # 3. Insert user record
        insert_response = supabase.table("users").insert({
            "name": name,
            "email": email,
            "password": hashed_password,
            "role": role
        }).execute()

        if not insert_response.data:
            return {"success": False, "message": "Failed to create user record"}, 500

        new_user = insert_response.data[0]

        # 4. Generate JWT Token
        token = generate_jwt_token(str(new_user["id"]), new_user["role"])

        return {
            "success": True,
            "message": "User registered successfully",
            "token": token,
            "user": {
                "id": str(new_user["id"]),
                "name": new_user["name"],
                "email": new_user["email"],
                "role": new_user["role"],
                "created_at": new_user.get("created_at")
            }
        }, 201

    except Exception as e:
        print("\n" + "=" * 50)
        print("[REGISTER EXCEPTION]:")
        traceback.print_exc()
        print("=" * 50 + "\n")
        return {"success": False, "message": str(e)}, 500


def login(email: str, password: str):
    try:
        # 1. Fetch user by email
        response = supabase.table("users").select("*").eq("email", email).execute()
        
        if not response.data:
            return {"success": False, "message": "Invalid email or password"}, 401

        user = response.data[0]

        # 2. Verify password hash
        if not check_password_hash(user["password"], password):
            return {"success": False, "message": "Invalid email or password"}, 401

        # 3. Generate JWT Token
        token = generate_jwt_token(str(user["id"]), user["role"])

        return {
            "success": True,
            "message": "Login successful",
            "token": token,
            "user": {
                "id": str(user["id"]),
                "name": user["name"],
                "email": user["email"],
                "role": user["role"]
            }
        }, 200

    except Exception as e:
        print("\n" + "=" * 50)
        print("[DIRECT LOGIN ERROR]:")
        traceback.print_exc()
        print("=" * 50 + "\n")
        return {"success": False, "message": str(e)}, 500


def get_user_by_token(token: str):
    """
    Decodes the JWT token sent in Bearer Auth header during /api/auth/me requests.
    """
    try:
        # 1. Decode token
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("sub")

        # 2. Fetch fresh user data from Supabase
        response = supabase.table("users").select("id, name, email, role, created_at").eq("id", user_id).execute()

        if not response.data:
            return None, 404

        user = response.data[0]
        user["id"] = str(user["id"])

        return user, 200

    except jwt.ExpiredSignatureError:
        return None, 401
    except jwt.InvalidTokenError:
        return None, 401
    except Exception as e:
        print("[GET USER BY TOKEN ERROR]:", str(e))
        return None, 500