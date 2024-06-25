from flask_restx import Namespace, Resource, fields
from repository.meeting import create_meeting
from integrations.resend import send_email
from services.zoom import get_access_token, create_meeting as create_zoom_meeting
from integrations.mq import Producer

api = Namespace('meetings', description='Meetings related operations')

create_meeting_model = api.model('Create a meeting', {
    'meetingProvider': fields.String(required=True, description='Meeting Provider like Zoom or Google Meet'),
})

@api.route('/')
class MeetingOperations(Resource):
    @api.expect(create_meeting_model)
    def post(self):
        # res = create_zoom_meeting()
        # meeting_url = res['join_url']
        # meeting_uri = create_meeting()
        # send_email(meeting_uri)
        Producer.publish()
        return {"results": f"Success"}