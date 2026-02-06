from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_sellers():
    return {"message": "List of sellers"}
