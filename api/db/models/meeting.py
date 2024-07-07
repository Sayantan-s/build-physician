from peewee import CharField,UUIDField, TextField, DateTimeField, ForeignKeyField
from . import BaseModel
from datetime import datetime
from .user import User
from .roadmap import Roadmap
import uuid


class Meeting(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    meeting_name = TextField(column_name='meeting_name')
    created_at = DateTimeField(default=datetime.utcnow, column_name='created_at')
    updated_at = DateTimeField(default=datetime.utcnow, column_name='updated_at')
    created_by = CharField(default='system', column_name='created_by')
    updated_by = CharField(default='system', column_name='updated_by')

    user = ForeignKeyField(User, backref='roadmaps', on_delete='CASCADE')
    roadmap = ForeignKeyField(Roadmap, backref='meetings', null=True, on_delete='CASCADE')
    class Meta:
        table_name = "meeting_dtl"