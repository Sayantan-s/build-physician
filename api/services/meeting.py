from models.meeting import CreateMeetingModel
from integrations.meetings.gmeet import GmeetMeeting
from integrations.meetings.zoom import ZoomMeeting
from typing import Dict, Union
from db.models.meeting import Meeting
import flask


class MeetingService:
    __meeting_provider_instance: Dict[str, Union[ZoomMeeting, GmeetMeeting]] = {
        "zoom": ZoomMeeting,
        "gmeet": GmeetMeeting
    }

    @staticmethod
    def create(meeting_input: CreateMeetingModel):
        user = flask.session.get('user', None)
        meeting_construct = MeetingService.__meeting_provider_instance[meeting_input.meetingProvider]
        meeting: Union[ZoomMeeting, GmeetMeeting] = meeting_construct(meeting_input)
        meeting_metadata = meeting.create()
        meeting_start_time = meeting_metadata['start_time']
        meeting_end_time = meeting_metadata['end_time']
        hangoutLink = meeting_metadata["hangoutLink"]
        meeting_id = meeting_metadata['id']
        user_id = user['user_id']
        res = Meeting.create(
            provider=meeting_input.meetingProvider,
            meeting_id=meeting_id,
            topic=meeting_input.config.topic,
            agenda=meeting_input.config.agenda,
            duration=meeting_input.config.duration,
            organizer=meeting_input.scheduler,
            attendees=meeting_input.invitees,
            meeting_link=hangoutLink,
            meeting_start_time=meeting_start_time,
            meeting_end_time=meeting_end_time,
            created_by=user_id,
            updated_by=user_id,
            user=user_id
        )
        print(user_id, 'Meeting created!!')
        return {"meeting_link": hangoutLink, "gmeet_id": meeting_id, "meeting_id": str(res.id)}
