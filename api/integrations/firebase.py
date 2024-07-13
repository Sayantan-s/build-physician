from firebase_admin import credentials, initialize_app

class Firebase:
    def __init__(self) -> None:
        cred = credentials.Certificate("firebase-adminsdk-o3fku-a740a9dc1d.json")
        initialize_app(cred)