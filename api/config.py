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