from flask import Blueprint, jsonify

user_bp = Blueprint("users", __name__)


@user_bp.route("/", methods=["GET"])
def get_users():
    return jsonify([
        {
            "id": 1,
            "name": "Rajib"
        }
    ])


@user_bp.route("/<int:user_id>", methods=["GET"])
def get_user(user_id):
    return jsonify({
        "id": user_id,
        "name": "Rajib"
    })