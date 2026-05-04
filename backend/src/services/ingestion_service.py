import tempfile
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_qdrant import QdrantVectorStore

from src.core.config import QDRANT_API_KEY,QDRANT_URL
from src.core.embedding import embedding_model

def process_pdf(file_bytes:bytes,session_id:str):
    # Create file
    with tempfile.NamedTemporaryFile(delete=False,suffix=".pdf") as tmp:
        tmp.write(file_bytes)
        tmp_path=tmp.name
    
    # Load pdf
    loader=PyPDFLoader(tmp_path)
    docs=loader.load()

    # Splitting in chunks
    splitter=RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    chunks=splitter.split_documents(docs)

    # Store in Qdrant
    QdrantVectorStore.from_documents(
        documents=chunks,
        embedding=embedding_model,
        url=QDRANT_URL,
        api_key=QDRANT_API_KEY,
        collection_name=session_id
    )
    return len(chunks)