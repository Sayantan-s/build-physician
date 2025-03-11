def uri_formatter(endpoint: str):
    return f"/api/v1/{endpoint}"

AUTH_ENDPOINT = uri_formatter('auth')
BUILDS_ENDPOINT=uri_formatter('builds')
PROJECTS_ENDPOINT=uri_formatter('projects')
