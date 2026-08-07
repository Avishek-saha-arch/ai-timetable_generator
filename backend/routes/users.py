from flask import Blueprint, jsonify
from services.user_services import get_all_users

user_bp = Blueprint("users", __name__)


@user_bp.route("/")
def users():
    users = get_all_users()
    return jsonify(users)


@user_bp.route("/<int:user_id>", methods=["GET"])
def get_user(user_id):
    return jsonify({
        "id": user_id,
        "name": "Rajib"
    })