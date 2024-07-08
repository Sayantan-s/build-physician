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
        # Meeting.create(meeting_name="Hello world!")
        return meeting_metadata


