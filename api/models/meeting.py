from flask_restx import Namespace, fields
from pydantic import BaseModel, Field, EmailStr
from typing import List

# Create Meeting Api Request Schema

api = Namespace('meetings', description='Meetings related operations')

create_meeting_config = api.model('Create a meeting > Config', {
    "epoch": fields.Integer(required=True),
    "duration": fields.Integer(required=True),
    "topic": fields.String(required=True),
    "agenda": fields.String(required=True)
})

create_meeting_model = api.model('Create a meeting', {
    'meetingProvider': fields.String(required=True, description='Meeting Provider like Zoom or Google Meet'),
    'scheduler': fields.String(required=True),
    'invitees': fields.List(fields.String(required=True, description="List of participant emails")),
    "config": fields.Nested(create_meeting_config, required=True)
})

class ConfigModel(BaseModel):
    epoch: int = Field(description="Epoch of the meeting")
    duration: int = Field(required=True, description="Duration of the meeting")
    topic: str = Field(required=True, description="Topic of the meeting")
    agenda: str = Field(required=True, description="Agenda of the meeting")

class CreateMeetingModel(BaseModel):
    meetingProvider: str = Field(description='Meeting Provider like Zoom or Google Meet', pattern="^(zoom|gmeet)$")
    scheduler: EmailStr = Field(description="Scheduler's email")
    invitees: List[EmailStr] = Field(description="List of participant emails", min_items=1)
    config: ConfigModel = Field(description="Configuration for the meeting")