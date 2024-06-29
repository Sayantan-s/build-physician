import uuid

class Response:
    def __init__(self, status: int, data) -> None:
        self.status = status
        self.data = data
    
    def success(self):
        return {
            "requestId":str(uuid.uuid4()),
            "status": self.status,
            "data": self.data,
            "success": True
        }
    
    def error(self):
        return {
            "requestId":str(uuid.uuid4()),
            "status": self.status,
            "error": self.data,
            "success": False
        }