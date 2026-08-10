from flask import Flask
from flask_cors import CORS

from routes.auth import auth_bp
from routes.users import user_bp
# from routes.attendance import attendance_bp
from routes.timetable import timetable_bp

app = Flask(__name__)

app.config["SECRET_KEY"] = "your-secret-key"

CORS(app,origins=["http://localhost:5173"], supports_credentials=True)

# #? Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(user_bp, url_prefix="/api/users")
# # app.register_blueprint(attendance_bp, url_prefix="/api/attendance")
app.register_blueprint(timetable_bp, url_prefix="/api/timetable")


@app.route("/")
def home():
    return {"message": "ERP Backend Running"}


if __name__ == "__main__":
    app.run(debug=True, port=5000,host="127.0.0.1")