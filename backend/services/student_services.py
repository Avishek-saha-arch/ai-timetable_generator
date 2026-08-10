import traceback
from database.supabase import supabase

def get_students():
    try:
        # Fetch all columns for users where role is 'student'
        response = supabase.table("users") \
            .select("id, name, email, role, created_at") \
            .eq("role", "student") \
            .execute()

        return {
            "success": True,
            "count": len(response.data),
            "students": response.data
        }, 200

    except Exception as e:
        print("\n" + "=" * 50)
        print("[GET STUDENTS ERROR]:")
        traceback.print_exc()
        print("=" * 50 + "\n")
        return {"success": False, "message": str(e)}, 500