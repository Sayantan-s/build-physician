import threading

from flask import Flask
from flask_restx import Api
from apis import Namespaces
from integrations.mq.emails import email_queue
from integrations.firebase import Firebase
from config import PORT,ORIGIN
from db import Database
from utils.response import Response
from flask_cors import CORS
from integrations.session import Session


app = Flask(__name__)
CORS(app, support_credentials=True, origins=[ORIGIN])
Firebase()
api = Api(app, version='1.0', title='Slotin REST API', description='Logic to schedule meetings and create roadmaps.')

Session(app)
Namespaces(api)

port = PORT or 8080

@app.before_request
def before_request():
    return Response.before_request()


if __name__ == '__main__':
    app.run(port=port, debug=True, host='localhost')
    Database.init()
    threading.Thread(target=email_queue.consume).start()