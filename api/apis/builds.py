from flask_restx import Namespace, Resource
from flask import request

from repo.builds import add_build_and_gen_insights
from utils.response import Response

api = Namespace('builds', description='Build related operations')


@api.route('/')
class BuildOperations(Resource):
    def post(self):
        payload = request.json
        build_id = add_build_and_gen_insights(payload)
        response = Response(status=201, data=build_id)
        return response.success(), response.status

