import uuid
from flask import jsonify, request, session
from firebase_admin import auth


class Response:
    def __init__(self, status: int, data) -> None:
        self.status = status
        self.data = data
    
    def success(self):
        return jsonify({
            "requestId":uuid.uuid4(),
            "status": self.status,
            "data": self.data,
            "success": True
        })
    
    def error(self):
        return jsonify({
            "requestId":uuid.uuid4(),
            "status": self.status,
            "error": self.data,
            "success": False
        })
    
    def before_request():
        if 'Authorization' not in request.headers:
            response = Response(status=401, data="Unauthorized access!")
            return response.error(), response.status
        token = request.headers.get('Authorization').split('Bearer ')[1]
        decoded_token = auth.verify_id_token(token)
        user_details = {key: decoded_token[key] for key in ["name", "picture", "user_id", "email"] if key in decoded_token}
