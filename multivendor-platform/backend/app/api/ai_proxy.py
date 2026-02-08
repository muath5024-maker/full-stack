from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
import os
import httpx

router = APIRouter()


class GenerateRequest(BaseModel):
    prompt: str
    options: dict = {}


def get_worker_url():
    # Use docker service name in docker-compose or env override
    return os.getenv("WORKER_AI_URL", "http://worker-ai:9001")


@router.post("/generate")
async def generate(req: GenerateRequest):
    worker_url = get_worker_url()
    url = f"{worker_url}/internal/ai/generate"
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            headers = {}
            internal_key = os.getenv('WORKER_INTERNAL_KEY')
            if internal_key:
                headers['X-Internal-API-Key'] = internal_key
            resp = await client.post(url, json=req.dict(), headers=headers)
            resp.raise_for_status()
            return resp.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"Worker error: {str(e)}")
