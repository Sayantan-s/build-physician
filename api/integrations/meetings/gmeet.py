from models.meeting import CreateMeetingModel
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.apps import meet_v2

class GmeetMeeting:
    SCOPES = ['https://www.googleapis.com/auth/meetings.space.created']
    CREDENTIAL = "client_secret_735258533581-totb5tqppc6sknottk4djqq8mmr5g810.apps.googleusercontent.com.json"
    def __init__(self, meeting: CreateMeetingModel = None) -> None:
        if meeting is not None:
            self.meeting = meeting

    def get_access_token():
        creds = None
        if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file('token.json', GmeetMeeting.SCOPES)
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(GmeetMeeting.CREDENTIAL, GmeetMeeting.SCOPES)
                creds = flow.run_local_server(port=0)
            with open('token.json', 'w') as token:
                token.write(creds.to_json())
        return creds

    def create(self):
        creds = self.get_access_token()
        client = meet_v2.SpacesServiceClient(credentials=creds)
        request = meet_v2.CreateSpaceRequest()
        response = client.create_space(request=request)
        if self.meeting.invitees and len(self.meeting.invitees):
            self.add_participant()
        return response
    
    def add_participant(self):
        print('Zoom participant added')