from qdrant_client import QdrantClient
from src.core.config import QDRANT_API_KEY,QDRANT_URL

qdrant_client_var=QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY
)


