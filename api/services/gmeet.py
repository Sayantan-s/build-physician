from google.apps import meet_v2
from integrations import gmeet_auth

def create_google_meet_space():
    creds = gmeet_auth.get_token()
    client = meet_v2.SpacesServiceClient(credentials=creds)
    request = meet_v2.CreateSpaceRequest()
    response = client.create_space(request=request)
    return response

# Account id mfAa0TfFR8mPdfdsrok9mQ
# 6ibM6c_1SLKsApULXuHew Client ID
# FS6lGL4l29P4mRellbc45Mab1d9wCaWR Client Secret