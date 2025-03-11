from services.projects import create_project, find_project_by_id, find_builds_by_project_id

def add_project():
    project_id = create_project()
    return project_id

def find_project(project_id: str):
    return find_project_by_id(project_id)

def find_builds_by_prj_id(project_id: str):
    return find_builds_by_project_id(project_id)