from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    full_name: str

@router.post("/login")
async def login(data: LoginRequest):
    # TODO: Implement actual Supabase Auth integration
    return {"message": "Login endpoint", "email": data.email}

@router.post("/register")
async def register(data: RegisterRequest):
    # TODO: Implement actual Supabase Auth support
    return {"message": "Register endpoint", "email": data.email}
