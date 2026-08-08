import traceback
from werkzeug.security import generate_password_hash,check_password_hash
from database.supabase import supabase


def register_user(name: str, email: str, password: str, role: str):
    try:
        # 1. Check if email already exists
        existing_user = supabase.table("users").select("id").eq("email", email).execute()
        if existing_user.data:
            return {"success": False, "message": "Email already registered"}, 400

        # 2. Hash the password
        hashed_password = generate_password_hash(password)

        # 3. Insert user record (id and created_at will be set automatically by Postgres)
        insert_response = supabase.table("users").insert({
            "name": name,
            "email": email,
            "password": hashed_password,
            "role": role
        }).execute()

        if not insert_response.data:
            return {"success": False, "message": "Failed to create user record"}, 500

        new_user = insert_response.data[0]

        return {
            "success": True,
            "message": "User registered successfully",
            "user": {
                "id": new_user["id"],
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

        return {
            "success": True,
            "message": "Login successful",
            "user": {
                "id": user["id"],
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