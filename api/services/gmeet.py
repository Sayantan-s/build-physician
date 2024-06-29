from google.apps import meet_v2
from integrations import gmeet_auth

def create_google_meet_space():
    creds = gmeet_auth.get_token()
    client = meet_v2.SpacesServiceClient(credentials=creds)
    request = meet_v2.CreateSpaceRequest()
    response = client.create_space(request=request)
    return response