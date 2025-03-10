from services.builds import create_build, find_build_by_id


def add_build_and_gen_insights(payload):
    build_id = create_build(payload)
    return build_id

def find_build(build_id: str):
    return find_build_by_id(build_id)