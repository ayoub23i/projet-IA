
import os
import openai
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

class ChatService:
    def __init__(self, user):
        self.user = user

    def handle_quiz(self, subject, message, history):
        system_prompt = f"You are a QuizGPT for {subject}. Ask one question at a time with 3 options: A, B, C."
        return self._ask_gpt(system_prompt, message, history)

    def handle_resume(self, message, history):
        system_prompt = "You are ResumeGPT. Help with resumes and review them."
        return self._ask_gpt(system_prompt, message, history)

    def handle_interview(self, message, history):
        system_prompt = "You are InterviewGPT. Conduct mock job interviews."
        return self._ask_gpt(system_prompt, message, history)

    def _ask_gpt(self, system_prompt, message, history):
        messages = [{"role": "system", "content": system_prompt}] + history
        messages.append({"role": "user", "content": message})

        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages,
                temperature=0.7
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            return f"❌ Error: {e}"