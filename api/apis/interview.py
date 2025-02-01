from flask_restx import Resource
from models.interview import api as interview_api, send_interview_invites, SendInviteModel
from services.inteview import send_invites
from flask import request
from pydantic import ValidationError
from utils.response import Response


@interview_api.route('/invite')
class InterviewOperations(Resource):
    @interview_api.expect(send_interview_invites)
    def post(self):
        req_body = request.get_json()
        try:
            data = SendInviteModel(**req_body)
            interview_invite_metadata = send_invites(data)
            res_payload = Response(status=201, data=interview_invite_metadata)       
            return res_payload.success(), res_payload.status
        except ValidationError as err:
            return err.errors(), 422