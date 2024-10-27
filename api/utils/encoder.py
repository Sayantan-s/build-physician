from json import JSONEncoder
from datetime import datetime
from flask import Flask


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)


class Encoder:
    def __init__(self, app: Flask) -> None:
        app.json_encoder = CustomJSONEncoder
