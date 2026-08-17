import traceback
from database.supabase import supabase
import numpy as np

def get_students():
    try:
        response = (
            supabase
            .table("students")
            .select("*")
            .order("id")
            .execute()
        )

        students = response.data or []

        return {
            "success": True,
            "students": students
        }, 200

    except Exception as e:
        print("GET STUDENTS ERROR:", e)

        return {
            "success": False,
            "message": str(e)
        }, 500

    
def get_total_students():
    try:
        response = supabase.table("students") \
            .select("id", count="exact") \
            .execute()

        student_count = response.count or 0

        return {
            "success": True,
            "student_count": student_count
        }, 200

    except Exception as e:
        print("GET STUDENT COUNT ERROR:", e)    
        return {
            "success": False,
            "message": str(e)
        }, 500


def get_average_attendance():
    try:
        response = (
            supabase.table("students")
            .select("attendance")
            .execute()
        )

        students = response.data or []

        attendance_values = [
            float(student["attendance"])
            for student in students
            if student.get("attendance") is not None
        ]

        if not attendance_values:
            average = 0
        else:
            average = np.mean(attendance_values)

        return {
            "success": True,
            "average_attendance": round(float(average), 2)
        }, 200

    except Exception as e:
        print("GET AVERAGE ATTENDANCE ERROR:", e)

        return {
            "success": False,
            "message": str(e)
        }, 500