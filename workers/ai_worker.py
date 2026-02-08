"""
AI Worker scaffold - handles LLM generation tasks.
Listens on port 9001.
"""
import os
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from dotenv import load_dotenv
import httpx

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

app = FastAPI(title="AI Worker")

# Environment keys
CREWAI_API_KEY = os.getenv('CREWAI_API_KEY')
CREWAI_API_URL = os.getenv('CREWAI_API_URL')
GROQ_API_KEY = os.getenv('GROQ_API_KEY')
GROQ_PROJECT = os.getenv('GROQ_PROJECT_ID')
GROQ_DATASET = os.getenv('GROQ_DATASET')
WORKER_INTERNAL_KEY = os.getenv('WORKER_INTERNAL_KEY')

# Try to import optional SDKs
try:
    import crewai
except Exception:
    crewai = None

try:
    from groq import Groq
except Exception:
    Groq = None

# Initialize clients if possible
groq_client = Groq(api_key=GROQ_API_KEY) if Groq and GROQ_API_KEY else None


class AIRequest(BaseModel):
    prompt: str
    options: dict = {}
    groq_query: str | None = None


@app.get('/health')
def health():
    return {'status': 'ok', 'worker': 'ai'}


async def call_crewai_via_http(prompt: str, options: dict):
    if not CREWAI_API_URL or not CREWAI_API_KEY:
        raise RuntimeError('CREWAI API not configured')
    payload = {'prompt': prompt, 'options': options}
    headers = {'Authorization': f'Bearer {CREWAI_API_KEY}'}
    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.post(CREWAI_API_URL, json=payload, headers=headers)
        resp.raise_for_status()
        return resp.json()


async def generate_with_crewai(prompt: str, options: dict):
    # Prefer SDK if available
    if crewai:
        try:
            # Try common client patterns for SDKs
            if hasattr(crewai, 'Client'):
                client = crewai.Client(api_key=CREWAI_API_KEY)
                if hasattr(client, 'generate'):
                    return client.generate(prompt=prompt, **(options or {}))
            if hasattr(crewai, 'generate'):
                return crewai.generate(prompt, api_key=CREWAI_API_KEY, **(options or {}))
        except Exception:
            # fallthrough to HTTP
            pass

    # Fallback to HTTP endpoint
    return await call_crewai_via_http(prompt, options)


@app.post('/internal/ai/generate')
async def generate(req: AIRequest, request: Request):
    # internal auth: gateway should send X-Internal-API-Key header
    if WORKER_INTERNAL_KEY:
        provided = request.headers.get('x-internal-api-key') or request.headers.get('X-Internal-API-Key')
        if not provided or provided != WORKER_INTERNAL_KEY:
            raise HTTPException(status_code=401, detail='Unauthorized')
    # Optionally fetch context from Groq
    context_text = ''
    if req.groq_query:
        if not groq_client:
            raise HTTPException(status_code=503, detail='Groq client not configured')
        try:
            # Use groq_client.query if SDK present
            if hasattr(groq_client, 'query'):
                data = groq_client.query(req.groq_query)
            else:
                # Very small fallback: perform HTTP query against Sanity if project/dataset set
                if GROQ_PROJECT and GROQ_DATASET and GROQ_API_KEY:
                    url = f'https://{GROQ_PROJECT}.api.sanity.io/v1/data/query/{GROQ_DATASET}?query={httpx.utils.quote(req.groq_query)}'
                    headers = {'Authorization': f'Bearer {GROQ_API_KEY}'}
                    async with httpx.AsyncClient(timeout=30.0) as client:
                        resp = await client.get(url, headers=headers)
                        resp.raise_for_status()
                        data = resp.json()
                else:
                    raise HTTPException(status_code=503, detail='Insufficient GROQ configuration')
            context_text = str(data)
        except httpx.HTTPError as e:
            raise HTTPException(status_code=502, detail=f'Groq query failed: {str(e)}')

    # Build a combined prompt
    combined_prompt = req.prompt
    if context_text:
        combined_prompt = f"{req.prompt}\n\nContext:\n{context_text}"

    # Call CrewAI (SDK or HTTP)
    if not (crewai or (CREWAI_API_URL and CREWAI_API_KEY)):
        # No crewai configured, return mock
        return {'prompt': req.prompt, 'context': context_text, 'result': f'mock-generated for: {req.prompt}'}

    try:
        result = await generate_with_crewai(combined_prompt, req.options or {})
        return {'prompt': req.prompt, 'context': context_text, 'result': result}
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f'CrewAI HTTP error: {str(e)}')
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'CrewAI error: {str(e)}')


if __name__ == '__main__':
    import uvicorn
    uvicorn.run('workers.ai_worker:app', host='0.0.0.0', port=9001, reload=True)
