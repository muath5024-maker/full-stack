from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_buyers():
    return {"message": "List of buyers"}
