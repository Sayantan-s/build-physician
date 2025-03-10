import random
import string

def generate_unique_key(prefix="build"):
    characters = string.ascii_letters + string.digits
    random_part = ''.join(random.choice(characters) for _ in range(9))
    unique_key = f"{prefix}_{random_part}"
    return unique_key