from fastapi import APIRouter
from src.services.retrieval import search_document
from src.services.llmservice import generate_answers


router=APIRouter()
@router.get("/query")
def query(session_id:str,q:str):
    docs=search_document(session_id,q)
    answer=generate_answers(q,docs)
    return {
        "answer":answer
    }