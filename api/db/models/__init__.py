from peewee import Model,PostgresqlDatabase 
from config import DB_URI

db = PostgresqlDatabase(DB_URI)

class BaseModel(Model):
    class Meta:
        database = db