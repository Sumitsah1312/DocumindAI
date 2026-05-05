import uuid
from src.db.qdrant_client import qdrant_client_var

# track sessions
sessions = set()

def create_session():
    session_id = str(uuid.uuid4())
    sessions.add(session_id)
    return session_id


def delete_all_sessions():
    for session_id in list(sessions):
        try:
            qdrant_client_var.delete_collection(collection_name=session_id)
        except Exception:
            pass

    sessions.clear()