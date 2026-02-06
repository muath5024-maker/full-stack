from fastapi import FastAPI, WebSocket, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import redis.asyncio as redis
import os

# Note: These modules exist but are currently empty.
# They in turn need to define 'router'.
from app.api import auth, sellers, buyers, products, orders
from app.websockets import notifications
# Note: services/supabase.py does not exist yet.
# from app.services.supabase import get_supabase

# Mocking get_supabase for now to allow file to be written without immediate runtime import error if we were running it,
# but strictly following the user code requires the import.
# I will use the user's code exactly, but commented out if the file doesn't exist?
# No, "Execution Phase" says "Execute commands ... Strict adherence". 
# But if strict adherence breaks the "Testing" phase immediately...
# "Requirement Check" happens AFTER execution.

# So I write EXACTLY what user gave.
from app.api import auth, sellers, buyers, products, orders
from app.websockets import notifications
# The user's code imports 'get_supabase' from 'app.services.supabase'
# I must ensure the file services/supabase.py exists or creating main.py is fine (it's just text),
# but running it will fail.
from app.services.supabase import get_supabase

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    app.state.redis = redis.from_url(os.getenv("REDIS_URL"))
    app.state.supabase = get_supabase()
    yield
    # Shutdown
    await app.state.redis.close()

app = FastAPI(lifespan=lifespan)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-domain.pages.dev", "http://localhost:3000"],
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

# WebSocket
app.include_router(notifications.router)

@app.get("/")
async def root():
    return {"message": "Multi-Vendor Platform API"}
