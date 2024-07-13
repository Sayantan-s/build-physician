from flask import Flask
from config import SESSION_SECRET
from integrations.redis import redis
from flask_session import Session as FlaskSession


class Session:
    def __init__(self, app: Flask) -> None:
        app.secret_key = SESSION_SECRET
        app.config['SESSION_TYPE'] = 'redis'
        app.config['SESSION_PERMANENT'] = False
        app.config['SESSION_REDIS'] = redis
        FlaskSession(app)