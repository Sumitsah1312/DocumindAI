from langchain_qdrant import QdrantVectorStore
from src.db.qdrant_client import qdrant_client_var
from src.core.embedding import embedding_model
from src.core.config import QDRANT_URL, QDRANT_API_KEY
def search_document(session_id:str, query:str):
    # convert query 
    # query_vector=embedding_model.embed_query(query)

    # Search 
    # results = client.search(
    #     collection_name=session_id,
    #     query_vector=query_vector,
    #     limit=3
    # )

    vector_store = QdrantVectorStore.from_existing_collection(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY,
    collection_name=session_id,
    embedding=embedding_model
    )
    results=vector_store.similarity_search(
        query,3
    )
    return results
