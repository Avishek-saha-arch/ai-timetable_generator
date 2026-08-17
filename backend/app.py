from flask import Flask
from flask_cors import CORS

from routes.auth import auth_bp
from routes.users import user_bp
from routes.attendance import attendance_bp
from routes.timetable import timetable_bp
from routes.students import students_bp

app = Flask(__name__)

app.config["SECRET_KEY"] = "your-secret-key"

CORS(
    app,
    origins=[
        "http://localhost:5173",
        # Add your deployed frontend URL here later
    ],
    supports_credentials=True
)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(user_bp, url_prefix="/api/users")
app.register_blueprint(attendance_bp, url_prefix="/api/attendance")
app.register_blueprint(timetable_bp, url_prefix="/api/timetable")
app.register_blueprint(students_bp, url_prefix="/api/students")


@app.route("/")
def home():
    return {"message": "ERP Backend Running"}


# Render health check
@app.route("/healthz")
def healthz():
    return {"status": "ok"}, 200


if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
