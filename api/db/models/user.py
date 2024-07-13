from peewee import CharField,TextField, DateTimeField
from . import BaseModel
from datetime import datetime
class User(BaseModel):
    id = CharField(primary_key=True)
    name = TextField(column_name='name')
    email = CharField(column_name='email')
    picture = TextField(column_name='profile_pic')
    new_user = TextField(column_name='new_user')
    provider = CharField(column_name='provider')
    created_at = DateTimeField(default=datetime.utcnow, column_name='created_at')
    updated_at = DateTimeField(default=datetime.utcnow, column_name='updated_at')

    class Meta:
        table_name = "user_dtl"