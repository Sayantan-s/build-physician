from models.meeting import CreateMeetingModel
from integrations.meetings.gmeet import GmeetMeeting
from integrations.meetings.zoom import ZoomMeeting
from typing import Dict, Union
from db.models.meeting import Meeting
class MeetingService:
    __meeting_provider_instance: Dict[str, Union[ZoomMeeting, GmeetMeeting]] = {
        "zoom": ZoomMeeting,
        "gmeet": GmeetMeeting
    }
    def create(meeting_input: CreateMeetingModel):
        meeting_construct = MeetingService.__meeting_provider_instance[meeting_input.meetingProvider]
        meeting: Union[ZoomMeeting, GmeetMeeting] = meeting_construct(meeting_input)
        meeting_metadata = meeting.create()
        meeting_start_time = meeting_metadata['start_time']
        meeting_end_time = meeting_metadata['end_time']
        hangoutLink= meeting_metadata["hangoutLink"]
        meeting_id = meeting_metadata['id']
        res = Meeting.create(
            provider = meeting_input.meetingProvider,
            meeting_id = meeting_id,
            topic=meeting_input.config.topic,
            agenda=meeting_input.config.agenda,
            duration=meeting_input.config.duration,
            organizer=meeting_input.scheduler,
            attendees=meeting_input.invitees,
            meeting_link=hangoutLink,
            meeting_start_time=meeting_start_time,
            meeting_end_time=meeting_end_time,
            created_by="5eb0056e-b35b-444c-bbf1-04592188a37f",
            updated_by="5eb0056e-b35b-444c-bbf1-04592188a37f",
            user_id="5eb0056e-b35b-444c-bbf1-04592188a37f"
        )
        return { "meeting_link": hangoutLink, "gmeet_id": meeting_id, "meeting_id": str(res.id) }


