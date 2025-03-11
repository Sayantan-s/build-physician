from flask_restx import Namespace, Resource

from repo.projects import add_project, find_builds_by_prj_id
from utils.response import Response

api = Namespace('projects', description='Project related operations')


@api.route('/')
class ProjectOperations(Resource):
    def post(self):
        project_id = add_project()
        response = Response(status=201, data=project_id)
        return response.success(), response.status

@api.route('/<projectId>/builds')
class ProjectOperationsById(Resource):

    def get(self, projectId):
        print(projectId)
        build = find_builds_by_prj_id(project_id=projectId)
        response = Response(status=200, data=build)
        return response.success(), response.status
