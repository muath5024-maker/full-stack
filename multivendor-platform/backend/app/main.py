from fastapi import FastAPI, WebSocket
from app.api import auth
import os
try:
    import docker
except Exception:
    docker = None

try:
    from groq import Groq
except Exception:
    Groq = None

app = FastAPI()

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
from app.api.ai_proxy import router as ai_proxy_router
app.include_router(ai_proxy_router, prefix="/api/ai", tags=["ai"])
from app.api.projects import router as projects_router
app.include_router(projects_router, prefix="/api/projects", tags=["projects"])

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Initialize Groq and Docker client if available
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
groq_client = Groq(api_key=GROQ_API_KEY) if Groq and GROQ_API_KEY else None
docker_client = docker.from_env() if docker else None


@app.websocket("/ws/chat")
async def chat_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        if groq_client:
            response = groq_client.query(data)
        else:
            response = "(groq not configured)"
        await websocket.send_text(f"Response: {response}")