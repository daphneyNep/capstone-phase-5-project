from flask import request, session
from config import db, api
from flask_restful import Resource

class Signup(Resource):
    def post(self):
        if not session.get("member_id"):
            session["member_id"] = 1
        return {"message": f"sessopm member id is 1"}, 200

api.add_resource(Signup, "/api/signup")