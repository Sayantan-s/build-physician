from .auth import api as api_auth
from .builds import api as api_builds
from .projects import api as api_projects
from constants.uri import AUTH_ENDPOINT,BUILDS_ENDPOINT,PROJECTS_ENDPOINT
from flask_restx import Api


class Namespaces:
    def __init__(self, api: Api) -> None:
        api.add_namespace(api_projects, path=PROJECTS_ENDPOINT)
        api.add_namespace(api_auth, path=AUTH_ENDPOINT)
        api.add_namespace(api_builds, path=BUILDS_ENDPOINT)