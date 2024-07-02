from config import ZOOM_ACCOUNT_ID, ZOOM_CLIENT_SECRET, ZOOM_CLIENT_ID
import requests
import json
from models.meeting import CreateMeetingModel
    
class ZoomMeeting:
    def __init__(self, meeting: CreateMeetingModel = None) -> None:
        self.account_id = ZOOM_ACCOUNT_ID
        self.client_id = ZOOM_CLIENT_ID
        self.client_secret = ZOOM_CLIENT_SECRET
        if meeting is not None:
            self.meeting = meeting

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

    def create(self):
        access_token = self.get_access_token()
        url = "https://api.zoom.us/v2/users/me/meetings"
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        payload = {
            "topic": self.meeting.config.topic,
            "type": 2,  # Scheduled meeting
            "start_time": "2023-07-01T12:00:00Z",
            "duration": self.meeting.config.duration,
            "timezone": "UTC",
            "agenda": self.meeting.config.agenda
        }
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        res_data = response.json()
        
        if self.meeting.invitees and len(self.meeting.invitees):
            self.add_participant()
            
        return res_data
    
    def add_participant(self):
        print('Zoom participant added')