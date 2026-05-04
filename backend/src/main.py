from fastapi import FastAPI
from src.api import upload

app=FastAPI()

app.include_router(upload.router)
