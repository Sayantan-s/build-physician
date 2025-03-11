from typing import Mapping

from db.models.user import User
from db.models import db
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus
from pymongo.synchronous.collection import Collection


class Database:
    @staticmethod
    def init():
        db.connect()
        db.create_tables([User], safe=True)


class Mongo:
    builds: Collection[Mapping[str, any]]
    def __init__(self):
        password = "Sayantan@123"
        encoded_pwd = quote_plus(password)
        self._client = MongoClient(f"mongodb+srv://Sayantan:{encoded_pwd}@jwitterodev.agsawv4.mongodb.net/dev?retryWrites=true&w=majority", server_api=ServerApi('1'))
        self._ping()
        self.db = self._client.get_database("dev")
        
        #collections
        self.builds = self.db.get_collection('build_dtl')

    def _ping(self):
        try:
            self._client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(e)


mongo = Mongo()