from flask_restx import Namespace, fields
from pydantic import BaseModel, Field, EmailStr, validators
from typing import List

# Create Meeting Api Request Schema

api = Namespace('meetings', description='Meetings related operations')

create_meeting_config = api.model('Create a meeting > Config', {
    "time": fields.Integer(required=True)
})

create_meeting_model = api.model('Create a meeting', {
    'meetingProvider': fields.String(required=True, description='Meeting Provider like Zoom or Google Meet'),
    'scheduler': fields.String(required=True),
    'invitees': fields.List(fields.String(required=True, description="List of participant emails")),
    "config": fields.Nested(create_meeting_config, required=True)
})

class ConfigModel(BaseModel):
    time: int = Field(..., description="Time of the meeting in minutes")

class CreateMeetingModel(BaseModel):
    meetingProvider: str = Field(description='Meeting Provider like Zoom or Google Meet', pattern="^(zoom|gmeet)$")
    scheduler: EmailStr = Field(description="Scheduler's email")
    invitees: List[EmailStr] = Field(description="List of participant emails", min_items=1)
    config: ConfigModel = Field(description="Configuration for the meeting")