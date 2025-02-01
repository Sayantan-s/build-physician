from db.models.interview import Interview as DB_Interview


class Interview:
    @staticmethod
    def create(payload: dict):
        if "updated_by" not in payload:
            payload["updated_by"] = payload['created_by']
        interview = DB_Interview.insert(**payload).execute()
        return str(interview)
