from pymongo import MongoClient
from config import DB_URI


class Collection:
    user = None
    roadmap = None
    meeting = None


class Mongo:
    collection: Collection

    def __init__(self):
        self.instance = MongoClient(DB_URI)
        self.db = self.instance.dev
        self.set_collections()

    @staticmethod
    def connect():
        if not Mongo.collection:
            Mongo()
        return Mongo.collection

    def set_collections(self):
        Mongo.collection.user = self.db.user_dtl
        Mongo.collection.roadmap = self.db.roadmap_dtl
        Mongo.collection.meeting = self.db.meeting_dtl
