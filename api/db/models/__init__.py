from peewee import Model, PostgresqlDatabase
from config import DB_URI
from bson import ObjectId

db = PostgresqlDatabase(DB_URI)


class BaseModel(Model):
    class Meta:
        database = db


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid ObjectId')
        return ObjectId(v)
