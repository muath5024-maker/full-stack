from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

router = APIRouter()

class UserLogin(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(user: UserLogin):
    if user.username == "admin" and user.password == "password":
        return {"token": "fake-token"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/me")
def get_current_user():
    return {"user": "admin"}
