import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import redis.asyncio as aioredis
import docker
try:
    from groq import Groq
except Exception:
    Groq = None

from app.api import auth, sellers, buyers, products, orders
from app.websockets import notifications
from app.services.supabase import get_supabase


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize redis and supabase clients from environment
    redis_url = os.getenv("REDIS_URL", "redis://redis:6379")
    app.state.redis = aioredis.from_url(redis_url)
    app.state.supabase = get_supabase()
    yield
    # Shutdown
    await app.state.redis.close()


app = FastAPI(lifespan=lifespan)

# CORS (adjust origins for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(sellers.router, prefix="/api/sellers", tags=["sellers"])
app.include_router(buyers.router, prefix="/api/buyers", tags=["buyers"])
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])
app.include_router(notifications.router)
from app.api.ai_proxy import router as ai_proxy_router
app.include_router(ai_proxy_router, prefix="/api/ai", tags=["ai"])


@app.get("/")
async def root():
    return {"message": "Multi-Vendor Platform API"}


# Initialize Groq and Docker client; read API key from environment
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
groq_client = None
if Groq and GROQ_API_KEY:
    groq_client = Groq(api_key=GROQ_API_KEY)
docker_client = docker.from_env()


@app.websocket("/ws/chat")
async def chat_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            if groq_client:
                response = groq_client.query(data)
            else:
                response = "(missing GROQ_API_KEY)"
            await websocket.send_text(f"Response: {response}")
    except Exception:
        await websocket.close()
