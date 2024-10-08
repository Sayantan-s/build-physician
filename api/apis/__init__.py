from .meeting import meeting_api as api_meeting
from .auth import api as api_auth
from constants.uri import MEETING_ENDPOINT, AUTH_ENDPOINT
from flask_restx import Api


class Namespaces:
    def __init__(self, api: Api) -> None:
        api.add_namespace(api_meeting, path=MEETING_ENDPOINT)
        api.add_namespace(api_auth, path=AUTH_ENDPOINT)
