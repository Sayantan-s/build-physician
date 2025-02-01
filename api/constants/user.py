from enum import Enum

class UserType(str, Enum):
    ADMIN = 'ADMIN'
    INTERVIEWER = 'INTERVIEWER'
    INTERVIEWEE = 'INTERVIEWEE'
