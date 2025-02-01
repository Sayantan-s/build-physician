from flask_restx import Namespace, fields
from pydantic import BaseModel, Field

# Interview Invite Api Request Schema

api = Namespace('interview', description='Interview related operations')

participant_detail = api.model('Participant Details', {
    "name": fields.String(required=True),
    "email": fields.String(required=True)
})

send_interview_invites = api.model('Send Interview Invites', {
    "interviewee": fields.Nested(participant_detail, required=True),
    "interviewer": fields.Nested(participant_detail, required=True),
    "language": fields.String(required=True)
})


class ParticipantDetail(BaseModel):
    name: str = Field(required=True, description="Participant Name")
    email: str = Field(required=True, description="participant Email")


class SendInviteModel(BaseModel):
    interviewee: ParticipantDetail = Field(description="Participant details of interviewee")
    interviewer: ParticipantDetail = Field(description="Participant details of interviewer")
    language: str = Field(description='Programming Language of the interview')
