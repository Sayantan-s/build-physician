from json import JSONEncoder
from datetime import datetime
from flask import Flask
import uuid


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, uuid.UUID):
            return str(obj)


class Encoder:
    def __init__(self, app: Flask) -> None:
        app.json_encoder = CustomJSONEncoder
