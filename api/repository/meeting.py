from services.gmeet import create_google_meet_space

def create_meeting():
    try:
        response = create_google_meet_space()
        return response.meeting_uri
    except Exception as error:
        # TODO(developer) - Handle errors from Meet API.
        print(f'An error occurred: {error}')