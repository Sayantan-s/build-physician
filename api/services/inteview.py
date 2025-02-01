from models.interview import SendInviteModel
from repo import Repo
from integrations.mq.emails import email_queue
import flask


def send_invites(contract: SendInviteModel):
    user = flask.session.get('user', None)
    user_id = user['user_id']

    # create meeting code
    meeting_code = Repo.meeting.generate_meeting_code()

    # create a interview
    pocs = {
        "interviewee_name": contract.interviewee.name,
        "interviewee_email": contract.interviewee.email,
        "interviewer_name": contract.interviewer.name,
        "interviewer_email": contract.interviewer.email,
    }
    meeting_info = {
        "meeting_code": meeting_code,
    }
    create_interview_contract = {
        "language": contract.language,
        "created_by": user_id,
        **pocs,**meeting_info
    }
    Repo.interview.create(create_interview_contract)

    # send emails to interviewer and interviewee
    Repo.meeting.notify_pocs({**pocs, **meeting_info})

    return {"message": "Successfully sent invites!"}
