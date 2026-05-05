from fastapi import APIRouter, UploadFile, File

from src.services.session_service import create_session,delete_all_sessions
from src.services.ingestion_service import process_pdf

router=APIRouter()
@router.post("/upload")
async def upload_pdf(file: UploadFile=File(...)):
     #delete all previous sessions
    delete_all_sessions()
    session_id=create_session()
    content=await file.read()
    chunks=process_pdf(content,session_id)
    return {
        "session_id":session_id,
        "chunk_indexed":chunks
    }