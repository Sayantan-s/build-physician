from flask_restx import Namespace, fields
from pydantic import BaseModel, Field
from typing import Optional

# Create Roadmap Api Request Schema

api = Namespace('roadmaps', description='Roadmaps related operations')

create_roadmap_model = api.model('Create a roadmap', {
    'name': fields.String(required=True, description='Roadmap name'),
    'description': fields.String(required=True, description='Roadmap description'),
})

update_roadmap_model = api.model('Create a roadmap', {
    'name': fields.String(required=False, description='Roadmap name'),
    'description': fields.String(required=False, description='Roadmap description'),
    'contract': fields.String(required=False, description='Roadmap schema'),
    # Named this contract cause it was mutating a built in identfier in Pydantic
})


class CreateRoadmapModel(BaseModel):
    name: str = Field(description='Roadmap name', max_length=180)
    description: str = Field(description="Roadmap description", max_length=300)


class UpdateRoadmapModel(BaseModel):
    name: Optional[str] = Field(description='Roadmap name', max_length=180, default=None)
    description: Optional[str] = Field(description="Roadmap description", max_length=300, default=None)
    contract: Optional[str] = Field(description="Roadmap schema", default=None)
    # Named this contract cause it was mutating a built in identfier in Pydantic
