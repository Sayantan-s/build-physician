from peewee import CharField,UUIDField, TextField, DateTimeField, ForeignKeyField
from . import BaseModel
from datetime import datetime
import uuid


class User(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    first_name = TextField(column_name='first_name')
    last_name = TextField(column_name='last_name')
    email = CharField(column_name='email')
    created_at = DateTimeField(default=datetime.utcnow, column_name='created_at')
    updated_at = DateTimeField(default=datetime.utcnow, column_name='updated_at')

    class Meta:
        table_name = "user_dtl"