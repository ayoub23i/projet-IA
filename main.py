from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from services.backend import ChatService
from models.user import User
import os

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")



@app.get("/")
async def get_home():
    return FileResponse("static/index.html")


@app.get("/chat.html")
async def get_chat():
    return FileResponse("static/chat.html")


class ChatInput(BaseModel):
    message: str
    model: str
    subject: str = "Python"
    history: list

@app.post("/chat")
async def chat_endpoint(data: ChatInput):
    user = User(username="guest", email="guest@example.com")
    chat = ChatService(user)

    if data.model == "Quiz":
        reply = chat.handle_quiz(data.subject, data.message, data.history)
    elif data.model == "Resume":
        reply = chat.handle_resume(data.message, data.history)
    elif data.model == "Interview":
        reply = chat.handle_interview(data.message, data.history)
    else:
        reply = "❌ Invalid model."

    return JSONResponse(content={"reply": reply})