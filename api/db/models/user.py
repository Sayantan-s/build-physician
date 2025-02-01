from peewee import CharField,TextField, DateTimeField, BooleanField
from . import BaseModel
from datetime import datetime
from constants.user import UserType
class User(BaseModel):
    id = CharField(primary_key=True)
    name = TextField(column_name='name')
    email = CharField(column_name='email')
    picture = TextField(column_name='profile_pic')
    new_user = BooleanField(column_name='new_user')
    provider = CharField(column_name='provider')
    created_at = DateTimeField(default=datetime.utcnow, column_name='created_at')
    updated_at = DateTimeField(default=datetime.utcnow, column_name='updated_at')
    user_type=TextField(column_name='type',default=UserType.ADMIN.value)

    class Meta:
        table_name = "user_dtl"