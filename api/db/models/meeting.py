from peewee import CharField,UUIDField, TextField, DateTimeField, ForeignKeyField, IntegerField
from playhouse.postgres_ext import ArrayField
from . import BaseModel
from datetime import datetime
from .user import User
from .roadmap import Roadmap
import uuid


class Meeting(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    
    provider = CharField(column_name='provider')
    meeting_id = TextField(column_name='meeting_id')
    topic = TextField(column_name='topic')
    agenda = TextField(column_name='agenda')
    duration = IntegerField(column_name='duration')
    organizer = TextField(column_name='organizer')
    attendees = ArrayField(CharField, column_name='attendees')

    meeting_link = TextField(column_name='meeting_link')
    meeting_start_time = DateTimeField(column_name='meeting_start_time')
    meeting_end_time = DateTimeField(column_name='meeting_end_time')

    created_at = DateTimeField(default=datetime.utcnow, column_name='created_at')
    updated_at = DateTimeField(default=datetime.utcnow, column_name='updated_at')
    created_by = CharField(default='system', column_name='created_by')
    updated_by = CharField(default='system', column_name='updated_by')

    user = ForeignKeyField(User, backref='roadmaps', on_delete='CASCADE')
    roadmap = ForeignKeyField(Roadmap, backref='meetings', null=True, on_delete='CASCADE')
    class Meta:
        table_name = "meeting_dtl"