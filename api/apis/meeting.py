from flask_restx import Namespace, Resource, fields
from repository.meeting import create_meeting
from integrations.resend import send_email

api = Namespace('meetings', description='Meetings related operations')

create_meeting_model = api.model('Create a meeting', {
    'meetingProvider': fields.String(required=True, description='Meeting Provider like Zoom or Google Meet'),
})

@api.route('/')
class MeetingOperations(Resource):
    @api.expect(create_meeting_model)
    def post(self):
        meeting_uri = create_meeting()
        send_email(meeting_uri)
        return {"results": "Success!"}