import random
import string

class Meeting:
    @staticmethod
    def generate_meeting_code():
        def random_segment():
            return ''.join(random.choices(string.ascii_lowercase, k=3))

        return f"{random_segment()}-{random_segment()}-{random_segment()}"
