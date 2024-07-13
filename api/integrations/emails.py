import resend
from config import RESEND_API_KEY
from flask import jsonify

resend.api_key = RESEND_API_KEY

def send_email(meeting_uri: str):
    params: resend.Emails.SendParams = {
        "from": "Acme <onboarding@resend.dev>",
        "to": ["sssamanta789@gmail.com"],
        "subject": "hello world",
        "html": f"<strong>{meeting_uri}</strong>",
    }
    r = resend.Emails.send(params)
    return jsonify(r)
