import flask
from flask_restx import Namespace,Resource

api = Namespace('auth', description='Auth related operations')

@api.route('/')
class AuthOperations(Resource):
    def get(self):
        print(flask.request.headers)
        print(flask.request.args.get('code'))
        return {"results": "Success!"}