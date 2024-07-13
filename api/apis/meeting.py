from flask_restx import Resource
from models.meeting import api as meeting_api, create_meeting_model, CreateMeetingModel
from services.meeting import MeetingService
from flask import request
from pydantic import ValidationError
from utils.response import Response


@meeting_api.route('/')
class MeetingOperations(Resource):
    @meeting_api.expect(create_meeting_model)
    def post(self):
        req_body = request.get_json()
        try:
            data = CreateMeetingModel(**req_body)
            meeting_meta_data = MeetingService.create(data)
            res_payload = Response(status=201, data=meeting_meta_data)       
            # print(create_meeting_schema.invitees)
             # res = create_zoom_meeting()
            # meeting_url = res['join_url']
            # meeting_uri = create_meeting()
            # send_email(meeting_uri)
            # email_queue.publish({ "name": "1" })
            return res_payload.success(), res_payload.status
        except ValidationError as err:
            return err.errors(), 422