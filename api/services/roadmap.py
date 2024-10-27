from models.roadmap import CreateRoadmapModel
from db.models.roadmap import Roadmap
import flask


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
