import resend
from config import RESEND_API_KEY
from flask import jsonify

resend.api_key = RESEND_API_KEY


def send_email(sendTo: list[str], html: str, subject: str):
    payload = {
        "from": "sssamanta789@gmail.com",
        'to': sendTo,
        "subject": subject,
        'html': html
    }
    r = resend.Emails.send(payload)
    return jsonify(r)
