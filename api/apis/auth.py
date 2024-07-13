import flask
from flask_restx import Namespace,Resource
from db.models.user import User
from utils.response import Response

api = Namespace('auth', description='Auth related operations')

@api.route('/signin')
class AuthOperations(Resource):
    def get(self):
        payload = flask.session.get('user', None)
        if payload is not None:
            email = payload['email']
            user_exists = User.select().where(User.email == email).count()
            if user_exists:
                response = Response(status=200, data="User logged in successfully!")
                return response.success(), response.status
            else:
                user = User(
                    id=payload.get('user_id'),
                    name=payload.get('name'),
                    email=payload.get('email'),
                    profile_pic=payload.get('picture'),
                    provider=payload.get('provider'),
                    new_user=True
                )
                user.save()
                response = Response(status=201, data=str(user.id))
                return response.success(), response.status
        response = Response(status=400, data="Please try to send correct user!")
        return response.error(), response.status