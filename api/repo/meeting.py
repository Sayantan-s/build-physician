import random
import string
from integrations.mq.emails import email_queue
from integrations.mq.emails.task import SEND_INTERVIEW_INVITE_INTERVIEWEE, SEND_INTERVIEW_INVITE_INTERVIEWER


class Meeting:
    @staticmethod
    def generate_meeting_code():
        def random_segment():
            return ''.join(random.choices(string.ascii_lowercase, k=3))

        return f"{random_segment()}-{random_segment()}-{random_segment()}"

    @staticmethod
    def notify_pocs(pocs):

        # Send interviewer email!
        payload = {
            'interviewer_name': pocs['interviewer_name'],
            'interviewer_email': pocs['interviewer_email'],
            'meeting_code': pocs['meeting_code']
        }
        email_queue.publish({
            "task": SEND_INTERVIEW_INVITE_INTERVIEWER,
            "payload": payload
        })

        # Send interviewee email!
        payload = {
            'interviewee_name': pocs['interviewee_name'],
            'interviewee_email': pocs['interviewee_email'],
            'meeting_code': pocs['meeting_code']
        }
        email_queue.publish({
            "task": SEND_INTERVIEW_INVITE_INTERVIEWEE,
            "payload": payload
        })
