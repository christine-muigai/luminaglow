from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Review

router = APIRouter(prefix="/admin",tags=["admin"])

@router.get("reviews")
def get_all_reviews(db: Session = Depends(get_db)):
    reviews = db.query(Review).all()
    return reviews