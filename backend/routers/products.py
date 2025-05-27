from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=List[schemas.Product])
def get_filtered_products(
    category: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    skin_type: Optional[str] = Query(None),
    cruelty_free: Optional[bool] = Query(None),
    vegan: Optional[bool] = Query(None),
    rating: Optional[float] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Product)

    if category:
        query = query.filter(models.Product.category == category)
    if min_price:
        query = query.filter(models.Product.price >= min_price)
    if max_price:
        query = query.filter(models.Product.price <= max_price)
    if skin_type:
        query = query.filter(models.Product.skin_type == skin_type)
    if cruelty_free is not None:
        query = query.filter(models.Product.is_cruelty_free == cruelty_free)
    if vegan is not None:
        query = query.filter(models.Product.is_vegan == vegan)
    if rating:
        query = query.filter(models.Product.rating >= rating)
    
    return query.all()