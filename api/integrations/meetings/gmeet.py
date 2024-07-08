from models.meeting import CreateMeetingModel
import os.path
import datetime

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


class GmeetMeeting:
    SCOPES = ['https://www.googleapis.com/auth/calendar']
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
        creds: Credentials = GmeetMeeting.get_access_token()
        try:
            service = build("calendar", "v3", credentials=creds)

            start = datetime.datetime.utcnow().isoformat() + "Z"
            now = datetime.datetime.fromisoformat(start[:-1])
            later = now + datetime.timedelta(minutes=30)
            end = later.isoformat() + "Z"
                        
            event = {
                "start": {"dateTime": start},
                "end": {"dateTime": end},
                "attendees": [{"email": "sssamanta789@gmail.com"}],
                "conferenceData": {
                    "createRequest": {
                        "requestId": "sample123", 
                        "conferenceSolutionKey": {"type": "hangoutsMeet"}
                    }
                },
                "summary": "Testing < > Summary",
                "description": "Testing < > Description"
            }
            events_result = (
                service.events()
                .insert(calendarId="primary", sendNotifications=False, body=event, conferenceDataVersion=1)
                .execute()
            )
            
            return events_result

        except HttpError as error:
            print(f"An error occurred: {error}")
    
    def add_participant(self):
        print('Zoom participant added')