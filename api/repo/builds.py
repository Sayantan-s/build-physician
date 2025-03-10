from services.builds import create_build


def add_build_and_gen_insights(payload):
    build_id = create_build(payload)
    return build_id