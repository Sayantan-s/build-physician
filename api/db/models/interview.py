from peewee import CharField, UUIDField, TextField, DateTimeField
from . import BaseModel
from datetime import datetime
from constants.language import Language
import uuid


class Interview(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)

    language = TextField(default=Language.JAVASCRIPT.value, column_name='lang')

    interviewee_name = TextField(column_name='interviewee_name')
    interviewee_email = TextField(column_name='interviewee_email')

    interviewer_name = TextField(column_name='interviewer_name')
    interviewer_email = TextField(column_name='interviewer_email')

    meeting_code = CharField(column_name='meeting_code')

    created_at = DateTimeField(default=datetime.utcnow, column_name='created_at')
    updated_at = DateTimeField(default=datetime.utcnow, column_name='updated_at')
    created_by = CharField(default='system', column_name='created_by')
    updated_by = CharField(default='system', column_name='updated_by')

    class Meta:
        table_name = "interview_dtl"
