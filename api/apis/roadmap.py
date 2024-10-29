from flask import request
from flask_restx import Resource
from pydantic import ValidationError

from models.roadmap import api as roadmap_api, create_roadmap_model, update_roadmap_model, CreateRoadmapModel,\
    UpdateRoadmapModel
from services.roadmap import RoadmapService
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


@roadmap_api.route('/all')
class AllRoadmapsOperations(Resource):
    def get(self):
        try:
            roadmaps = RoadmapService.findAll()
            print(roadmaps)
            res_payload = Response(status=200, data=roadmaps)
            return res_payload.success(), res_payload.status
        except ValidationError as err:
            return err.errors(), 422


@roadmap_api.route('/<roadmap_id>')
class SingleRoadmapOperations(Resource):
    def get(self, roadmap_id):
        try:
            roadmap = RoadmapService.findOne(roadmap_id)
            res_payload = Response(status=200, data=roadmap)
            return res_payload.success(), res_payload.status
        except ValidationError as err:
            return err.errors(), 422

    @roadmap_api.expect(update_roadmap_model)
    def patch(self, roadmap_id):
        req_body = request.get_json()
        try:
            UpdateRoadmapModel(**req_body)
            RoadmapService.updateOne(roadmap_id, req_body)
            res_payload = Response(status=204, data=None)
            return res_payload.success(), res_payload.status
        except ValidationError as err:
            return err.errors(), 422
