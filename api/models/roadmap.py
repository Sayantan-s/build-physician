from flask_restx import Namespace, fields
from pydantic import BaseModel, Field, EmailStr

# Create Roadmap Api Request Schema

api = Namespace('roadmaps', description='Roadmaps related operations')

create_roadmap_model = api.model('Create a roadmap', {
    'name': fields.String(required=True, description='Roadmap name'),
    'description': fields.String(required=True, description='Roadmap description'),
})


class CreateRoadmapModel(BaseModel):
    name: str = Field(description='Roadmap name', max_length=180)
    description: str = Field(description="Roadmap description", max_length=300)
