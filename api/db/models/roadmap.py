from peewee import CharField,UUIDField, TextField, DateTimeField, ForeignKeyField
from . import BaseModel
from datetime import datetime
from .user import User
import uuid


class Roadmap(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    roadmap_name = TextField(column_name='roadmap_name')
    created_at = DateTimeField(default=datetime.utcnow, column_name='created_at')
    updated_at = DateTimeField(default=datetime.utcnow, column_name='updated_at')
    created_by = CharField(default='system', column_name='created_by')
    updated_by = CharField(default='system', column_name='updated_by')

    user = ForeignKeyField(User, backref='roadmaps', on_delete='CASCADE')
    class Meta:
        table_name = "roadmap_dtl"