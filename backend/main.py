import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(
    title="Student Question API",
    description="A simple FastAPI backend for a React application",
    version="1.0.0",
)


# React runs on port 5173 locally, or on a Render domain in production.
# Allow all origins so your deployed frontend can communicate with the backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionRequest(BaseModel):
    question: str


class QuestionResponse(BaseModel):
    question: str
    answer: str


@app.get("/")
def home():
    return {
        "message": "FastAPI backend is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.post("/ask", response_model=QuestionResponse)
def ask_question(request: QuestionRequest):
    cleaned_question = request.question.strip()

    if not cleaned_question:
        return QuestionResponse(
            question="",
            answer="Please enter a question.",
        )

    return QuestionResponse(
        question=cleaned_question,
        answer=f'Your question "{cleaned_question}" was received successfully.',
    )


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

