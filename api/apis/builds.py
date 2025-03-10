from flask_restx import Namespace, Resource
from flask import request

from repo.builds import add_build_and_gen_insights, find_build
from utils.response import Response

api = Namespace('builds', description='Build related operations')


@api.route('/')
class BuildOperations(Resource):

    def post(self):
        payload = request.json
        build_id = add_build_and_gen_insights(payload)
        response = Response(status=201, data=build_id)
        return response.success(), response.status

@api.route('/<buildId>')
class BuildOperations(Resource):

    def get(self, buildId):
        build = find_build(build_id=buildId)
        response = Response(status=200, data=build)
        return response.success(), response.status
