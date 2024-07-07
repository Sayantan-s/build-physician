from db.models.roadmap import Roadmap
from db.models.meeting import Meeting
from db.models.user import User
from .connection import db

class Database:
    def init():
        db.connect()
        db.create_tables([User,Roadmap,Meeting], safe=True)