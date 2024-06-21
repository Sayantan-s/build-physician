import resend
from flask import jsonify

resend.api_key = "re_J62p2TR7_BYPAMPRfQBeAN2ZLLBboWFNY"

def send_email(meeting_uri: str):
    params: resend.Emails.SendParams = {
        "from": "Acme <onboarding@resend.dev>",
        "to": ["sssamanta789@gmail.com"],
        "subject": "hello world",
        "html": f"<strong>{meeting_uri}</strong>",
    }
    r = resend.Emails.send(params)
    return jsonify(r)
