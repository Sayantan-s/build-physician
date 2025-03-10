import datetime

from db import mongo
from utils.key_gen import generate_unique_key


def create_build(payload):
    build_id = generate_unique_key(prefix='build')
    now = datetime.datetime.now()
    contract ={
        **payload,
        "buildId": build_id,
        "createdAt": now,
        "updatedAt": now
    }
    mongo.builds.insert_one(contract)
    return build_id