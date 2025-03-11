import threading

from flask import Flask
from flask_restx import Api
from apis import Namespaces
from integrations.firebase import Firebase
from config import PORT
from db import Database, Mongo
from utils.response import Response
from flask_cors import CORS
from integrations.session import Session

app = Flask(__name__)
CORS(app)

Firebase()
api = Api(app, version='1.0', title='Slotin REST API', description='Logic to schedule meetings and create roadmaps.')

Session(app)
Namespaces(api)

port = int(PORT) or 8080



@app.route('/')
def home():
    return "Hello, Koyeb!"
#
# @app.before_request
# def before_request():
#     return Response.before_request()


if __name__ == '__main__':
    app.run(port=port, debug=True, host='0.0.0.0')
    Database.init()
