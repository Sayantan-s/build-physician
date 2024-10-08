from flask_restx import Namespace, fields
from pydantic import BaseModel, Field, EmailStr
from typing import List

# Create Meeting Api Request Schema

api = Namespace('roadmaps', description='Roadmaps related operations')

create_roadmap_model = api.model('Create a roadmap', {
    'meetingProvider': fields.String(required=True, description='Meeting Provider like Zoom or Google Meet'),
    'scheduler': fields.String(required=True),
    'invitees': fields.List(fields.String(required=True, description="List of participant emails")),
})
class CreateMeetingModel(BaseModel):
    meetingProvider: str = Field(description='Meeting Provider like Zoom or Google Meet', pattern="^(zoom|gmeet)$")
    scheduler: EmailStr = Field(description="Scheduler's email")
    invitees: List[EmailStr] = Field(description="List of participant emails", min_items=1)
