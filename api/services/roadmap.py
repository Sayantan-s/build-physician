import datetime

from models.roadmap import CreateRoadmapModel
from db.models.roadmap import Roadmap
import flask
from playhouse.shortcuts import model_to_dict

class RoadmapService:
    @staticmethod
    def create(payload: CreateRoadmapModel):
        user = flask.session.get('user', None)
        user_id = user['user_id']
        res = Roadmap.create(
            name=payload.name,
            description=payload.description,
            created_by=user_id,
            updated_by=user_id,
            user=user_id
        )
        print(user_id, 'Roadmap created!!')
        return str(res.id)

    @staticmethod
    def findAll():
        user = flask.session.get('user', None)
        user_id = user['user_id']
        query = Roadmap.select().where(Roadmap.user == user_id)
        roadmaps = [model_to_dict(roadmap, backrefs=False) for roadmap in query]
        return roadmaps

    @staticmethod
    def findOne(roadmap_id: str):
        user = flask.session.get('user', None)
        user_id = user['user_id']
        query = Roadmap.select().where(Roadmap.user == user_id, Roadmap.id == roadmap_id)
        roadmap = [model_to_dict(roadmap, backrefs=False) for roadmap in query][0]
        return roadmap

    @staticmethod
    def updateOne(roadmap_id: str, payload: dict):
        user = flask.session.get('user', None)
        user_id = user['user_id']
        update_payload = { **payload, "updated_at": datetime.datetime.utcnow(), "updated_by": user_id }
        query = Roadmap.update(**update_payload).where(Roadmap.user == user_id, Roadmap.id == roadmap_id)
        query.execute()
