"""
Minimal worker FastAPI app.
Responsibilities:
- hold secrets (via workers/.env)
- expose internal endpoints for AI/media tasks
This is a simple scaffold for local development.
"""
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

app = FastAPI(title="Kimi Worker")

GEMINI_KEY = os.getenv('GEMINI_API_KEY')
GROQ_KEY = os.getenv('GROQ_API_KEY')


class GenerateRequest(BaseModel):
    task: str
    payload: dict


@app.get('/health')
def health():
    return {'status': 'ok'}


@app.post('/internal/generate')
async def generate(req: GenerateRequest):
    # Ensure keys exist
    if not (GEMINI_KEY or GROQ_KEY):
        raise HTTPException(status_code=503, detail='No AI keys configured in worker')

    # Placeholder logic: in real worker, dispatch to Gemini/Groq/CrewAI clients
    # For now return a mock response that includes received payload
    return {'task': req.task, 'result': 'mock-result', 'echo': req.payload}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run('workers.worker_app:app', host='0.0.0.0', port=9000, reload=True)
