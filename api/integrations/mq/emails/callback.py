from .task import SEND_INTERVIEW_INVITE_INTERVIEWER, SEND_INTERVIEW_INVITE_INTERVIEWEE
from integrations.emails import send_email


def send_invite_interviewer(payload: dict):
    email = payload['interviewer_name']
    name = payload['interviewer_email']
    meeting_code = payload['meeting_code']
    send_email(sendTo=[email], subject="Interview Invite", html=f"<strong>{name} >> {meeting_code}</strong>")


def send_invite_interviewee(payload: dict):
    email = payload['interviewee_name']
    name = payload['interviewee_email']
    meeting_code = payload['meeting_code']
    send_email(sendTo=[email], subject="Interview Invite", html=f"<strong>{name} >> {meeting_code}</strong>")


exec_map = {
    f"{SEND_INTERVIEW_INVITE_INTERVIEWER}": send_invite_interviewer,
    f"{SEND_INTERVIEW_INVITE_INTERVIEWEE}": send_invite_interviewee
}


def exec_send_emails(email_metadata: dict):
    print(email_metadata)
    task = email_metadata['task']
    payload = email_metadata['payload']
    exec_map[task](payload)
