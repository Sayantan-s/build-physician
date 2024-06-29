from models.meeting import CreateMeetingModel
from integrations.gmeet import GmeetMeeting
from integrations.zoom import ZoomMeeting

class MeetingService:
    __meeting_provider_instance = {
        "zoom": ZoomMeeting,
        "gmeet": GmeetMeeting
    }
    def create(meeting: CreateMeetingModel):
        meeting_instance = MeetingService.__meeting_provider_instance[meeting.meetingProvider].create()