from fastapi import APIRouter, Depends
from app.services.supabase import get_supabase

router = APIRouter()

@router.get("/")
async def get_products():
    supabase = get_supabase()
    # Example query
    # response = supabase.table("products").select("*").execute()
    # return response.data
    return {"message": "List of products (DB connection ready)"}
