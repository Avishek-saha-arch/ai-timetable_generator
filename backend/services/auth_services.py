from database.supabase import supabase

def register_user(name: str, email: str, password: str, role: str):
    try:
        # Pass user metadata into sign_up options so the DB trigger can read it
        auth_response = supabase.auth.sign_up({
            "email": email,
            "password": password,
            "options": {
                "data": {
                    "display_name": name,
                    "role": role
                }
            }
        })

        if not auth_response.user:
            return {"success": False, "message": "Failed to create user in Auth"}

        return {
            "success": True,
            "message": "User registered successfully",
            "user": {
                "id": auth_response.user.id,
                "email": email,
                "role": role
            }
        }

    except Exception as e:
        return {"success": False, "message": str(e)}


def login(email: str, password: str):
    try:
        # Authenticate user with Supabase
        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })

        # Return session tokens back to client or route handler
        return {
            "success": True,
            "access_token": auth_response.session.access_token,
            "refresh_token": auth_response.session.refresh_token,
            "user": {
                "id": auth_response.user.id,
                "email": auth_response.user.email
            }
        }, 200

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }, 401