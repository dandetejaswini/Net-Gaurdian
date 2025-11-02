from fastapi import APIRouter
import os
import openai

router = APIRouter(prefix="/ai", tags=["OpenAI"])

openai.api_key = os.getenv("YOUR API KEY")

@router.post("/summary")
def generate_summary(text: str):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user","content": f"Summarize this text: {text}"}],
        max_tokens=150
    )
    summary = response['choices'][0]['message']['content']
    return {"summary": summary}
