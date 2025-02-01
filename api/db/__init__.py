from db.models.user import User
from db.models.interview import Interview
from db.models import db


class Database:
    @staticmethod
    def init():
        db.connect()
        db.create_tables([User, Interview], safe=True)

