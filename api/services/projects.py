import datetime

from db import mongo
from utils.key_gen import generate_unique_key

def create_project():
    project_id = generate_unique_key(prefix='prj')
    now = datetime.datetime.now()
    contract ={
        "projectId": project_id,
        "createdAt": now,
        "updatedAt": now
    }
    mongo.projects.insert_one(contract)
    return project_id

def find_project_by_id(project_id: str):
    return mongo.projects.find_one({ "projectId": project_id })

def find_builds_by_project_id(project_id: str):
    return mongo.builds.find_one({ "projectId": project_id })