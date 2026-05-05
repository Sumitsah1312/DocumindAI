from fastapi import FastAPI
from src.api import upload,query
from fastapi.middleware.cors import CORSMiddleware
app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(upload.router)
app.include_router(query.router)