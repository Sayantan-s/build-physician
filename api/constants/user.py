from enum import Enum

class UserType(str, Enum):
    ADMIN = 'admin'
    SUPER_ADMIN = "super_admin"
    USER = "user"
