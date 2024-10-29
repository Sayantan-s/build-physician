import flask
from flask_restx import Namespace, Resource
from db.models.user import User
from utils.response import Response
from utils.encoder import CustomJSONEncoder
import json

api = Namespace('auth', description='Auth related operations')


@api.route('/signin')
class AuthSignIn(Resource):
    def get(self):
        payload = flask.session.get('user', None)
        if payload is not None:
            user, created = User.get_or_create(
                id=payload.get('user_id'),
                defaults={
                    'name': payload.get('name'),
                    'email': payload.get('email'),
                    'picture': payload.get('picture'),
                    'provider': payload.get('provider'),
                    "new_user": True
                }
            )
            # payload = json.dumps(user.__dict__['__data__'], cls=CustomJSONEncoder, indent=4)
            response = Response(status=200, data=user.__dict__['__data__'])
            if created:
                response.status = 201
                return response.success(), response.status
            else:
                return response.success(), response.status

        response = Response(status=400, data="Please try to send correct user!")
        return response.error(), response.status


@api.route('/user')
class AuthUser(Resource):
    def get(self):
        payload = flask.session.get('user', None)
        if payload is not None:
            user = User.get_by_id(payload.get('user_id'))
            # payload = json.dumps(user.__dict__['__data__'], cls=CustomJSONEncoder, indent=4)
            response = Response(status=200, data=user.__dict__['__data__'])
            return response.success(), response.status
        raise ValueError('Please send correct user')
