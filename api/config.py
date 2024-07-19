import os
from dotenv import load_dotenv

load_dotenv()

ZOOM_CLIENT_ID = os.getenv('ZOOM_CLIENT_ID')
ZOOM_CLIENT_SECRET =  os.getenv('ZOOM_CLIENT_SECRET')
ZOOM_ACCOUNT_ID = os.getenv('ZOOM_ACCOUNT_ID')
RESEND_API_KEY = os.getenv('RESEND_API_KEY')
RABBIT_MQ_URI= os.getenv('RABBIT_MQ_URI')
PORT = os.getenv('PORT')
DB_URI= os.getenv('DB_URI')
REDIS_HOST=os.getenv('REDIS_HOST')
REDIS_PASSWORD=os.getenv('REDIS_PASSWORD')
REDIS_PORT=os.getenv('REDIS_PORT')
SESSION_SECRET=os.getenv('SESSION_SECRET')
API_KEY=os.getenv('API_KEY')
ORIGIN= os.getenv('ORIGIN')