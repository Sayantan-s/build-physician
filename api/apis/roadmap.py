from flask_restx import Resource
from models.roadmap import api as roadmap_api, create_roadmap_model, CreateRoadmapModel
from services.roadmap import RoadmapService
from flask import request
from pydantic import ValidationError
from utils.response import Response


@roadmap_api.route('/')
class RoadmapOperations(Resource):
    @roadmap_api.expect(create_roadmap_model)
    def post(self):
        req_body = request.get_json()
        try:
            data = CreateRoadmapModel(**req_body)
            roadmap_id = RoadmapService.create(data)
            res_payload = Response(status=201, data=roadmap_id)
            return res_payload.success(), res_payload.status
        except ValidationError as err:
            return err.errors(), 422
