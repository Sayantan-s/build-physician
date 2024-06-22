import requests
import json

CLIENT_ID = 'hW_qwTCaRcW4iZr4LxGZtw'
CLIENT_SECRET = 'pOwRL7RPVK7KQLeK76WaH3GfsvDlqYP5'
ACCOUNT_ID = 'mfAa0TfFR8mPdfdsrok9mQ'

def get_access_token():
    url = "https://zoom.us/oauth/token"
    payload = {
        "grant_type": "account_credentials",
        "account_id": ACCOUNT_ID,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }
    response = requests.post(url,data=payload)
    return response.json()

def create_meeting():
    access_token = get_access_token()['access_token']
    url = "https://api.zoom.us/v2/users/me/meetings"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "topic": "Hello World",
        "type": 2,  # Scheduled meeting
        "start_time": "2023-07-01T12:00:00Z",
        "duration": 30,
        "timezone": "UTC",
        "agenda": "Test Meeting"
    }
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    return response.json()