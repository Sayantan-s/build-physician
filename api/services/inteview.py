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
    create_interview_contract = {
        "language": contract.language,
        "interviewee_name": contract.interviewee.name,
        "interviewee_email": contract.interviewee.email,
        "interviewer_name": contract.interviewer.name,
        "interviewer_email": contract.interviewer.email,
        "meeting_code": meeting_code,
        "created_by": user_id
    }
    interview = Repo.interview.create()

    # send emails to interviewer and interviewee
    email_queue.publish({ "meeting_code": meeting_code })
    print(user_id, 'Meeting created!!')
    return {"message": "Successfully sent invites!"}
