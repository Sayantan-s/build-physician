import threading

from flask import Flask
from flask_restx import Api
from apis import meeting_api,auth_api
from constants.uri import MEETING_ENDPOINT,AUTH_ENDPOINT
from integrations.mq.emails import email_queue

app = Flask(__name__)
api = Api(app, version='1.0', title='My API', description='A simple demonstration API')

api.add_namespace(meeting_api, path=MEETING_ENDPOINT)
api.add_namespace(auth_api, path=AUTH_ENDPOINT)

if __name__ == '__main__':
    app.run(port=8080, debug=True, host='localhost')
    threading.Thread(target=email_queue.consume).start()