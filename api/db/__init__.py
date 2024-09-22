from db.models.roadmap import Roadmap
from db.models.meeting import Meeting
from db.models.user import UserModel
from db.models import db
from integrations.db.mongo import Mongo
class Database:
    @staticmethod
    def init():
        db.connect()
        Mongo.connect()
        # db.create_tables([User,Roadmap,Meeting], safe=True)
