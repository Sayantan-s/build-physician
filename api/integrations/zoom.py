from config import ZOOM_ACCOUNT_ID, ZOOM_CLIENT_SECRET, ZOOM_CLIENT_ID
import requests

class Zoom:
    account_id=ZOOM_ACCOUNT_ID
    client_id=ZOOM_CLIENT_ID
    client_secret=ZOOM_CLIENT_SECRET

    def __init__(self, account_id: str, client_id: str, client_secret: str) -> None:
        self.account_id = account_id
        self.client_id = client_id
        self.client_secret = client_secret
        self.access_token = self.get_access_token()

    def get_access_token(self):
        url = "https://zoom.us/oauth/token"
        payload = {
            "grant_type": "account_credentials",
            "account_id": self.account_id,
            "client_id": self.client_id,
            "client_secret": self.client_secret
        }
        response = requests.post(url,data=payload)
        access_token = response.json()['access_token']
        return access_token
    
class ZoomMeeting:
    def create():
        print('Zoom meeting created...')