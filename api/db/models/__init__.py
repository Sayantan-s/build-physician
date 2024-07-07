from peewee import Model
from db import db


class BaseModel(Model):
    class Meta:
        database = db