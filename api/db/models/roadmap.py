import json

from peewee import CharField, UUIDField, TextField, DateTimeField, ForeignKeyField
from playhouse.postgres_ext import JSONField
from . import BaseModel
from datetime import datetime
from .user import User
import uuid

DEFAULT_SCHEMA_STATE = {
    "nodes": [],
    "edges": []
}


class Roadmap(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    name = TextField(column_name='name')
    description = TextField(column_name='description')
    schema = JSONField(column_name='schema', default=json.dumps(DEFAULT_SCHEMA_STATE))
    created_at = DateTimeField(default=datetime.utcnow, column_name='created_at')
    updated_at = DateTimeField(default=datetime.utcnow, column_name='updated_at')
    created_by = CharField(default='system', column_name='created_by')
    updated_by = CharField(default='system', column_name='updated_by')

    user = ForeignKeyField(User, backref='roadmaps', on_delete='CASCADE', column_name='user_id')

    class Meta:
        table_name = "roadmap_dtl"