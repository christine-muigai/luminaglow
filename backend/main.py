from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Product(BaseModel):
    id: int
    name: str
    brand: str
    price: float
    image_url: str
    rating: Optional[float] = None
    skin_type: str
    is_cruelty_free: bool
    is_vegan: bool
    description: Optional[str] = None

class Review(BaseModel):
    id: str
    product_id: int
    rating: int
    comment: str
    created_at: str

products_db = [
    {
        "id": 1,
        "name": "Hydrating Facial Moisturizer",
        "brand": "GlowLab",
        "price": 24.99,
        "image_url": "https://i.pinimg.com/736x/94/07/21/94072195d53f07b62f68e81d0d04d817.jpg",
        "rating": 4.5,
        "skin_type": "dry",
        "is_cruelty_free": True,
        "is_vegan": True,
        "description": "Deeply hydrating moisturizer with natural ingredients for dry skin types"
    },
    {
        "id": 2,
        "name": "Charcoal Cleansing Bar",
        "brand": "PureSkin",
        "price": 18.50,
        "image_url": "https://i.pinimg.com/736x/cd/4e/81/cd4e818113c31852ea1410771a2b7a77.jpg",
        "rating": 4.2,
        "skin_type": "oily",
        "is_cruelty_free": True,
        "is_vegan": False,
        "description": "Purifying charcoal cleanser that removes excess oil without stripping moisture"
    }
]

reviews_db = [
    {
        "id": str(uuid.uuid4()),
        "product_id": 1, 
        "rating": 5,
        "comment": "This moisturizer saved my dry skin! Absorbs quickly and doesn't feel greasy.",
        "created_at": "2023-10-15T09:30:00"
    },
    {
        "id": str(uuid.uuid4()),
        "product_id": 1,
        "rating": 4,
        "comment": "Really good moisturizer, though I wish the scent was a bit lighter.",
        "created_at": "2023-11-02T14:45:00"
    },
    {
        "id": str(uuid.uuid4()),
        "product_id": 1,
        "rating": 3,
        "comment": "It's okay, but didn't work as well for my sensitive skin as I hoped.",
        "created_at": "2023-11-20T18:15:00"
    },
    {
        "id": str(uuid.uuid4()),
        "product_id": 2,  
        "rating": 5,
        "comment": "Fantastic cleanser! My oily skin has never felt cleaner without being stripped.",
        "created_at": "2023-09-28T10:20:00"
    },
    {
        "id": str(uuid.uuid4()),
        "product_id": 2,
        "rating": 2,
        "comment": "Dried out my skin too much. Might work better for very oily skin types.",
        "created_at": "2023-10-10T16:30:00"
    },
    {
        "id": str(uuid.uuid4()),
        "product_id": 2,
        "rating": 4,
        "comment": "Great for deep cleaning. Lasts a long time too!",
        "created_at": "2023-11-15T12:10:00"
    }
]

def update_product_rating(product_id: int):
    product_reviews = [r for r in reviews_db if r["product_id"] == product_id]
    if product_reviews:
        avg_rating = sum(r["rating"] for r in product_reviews) / len(product_reviews)
        for product in products_db:
            if product["id"] == product_id:
                product["rating"] = round(avg_rating, 1)


@app.get("/products", response_model=List[Product])
async def get_products(
    skin_type: Optional[str] = None,
    max_price: Optional[float] = None,
    cruelty_free: Optional[bool] = None,
    vegan: Optional[bool] = None
):
    filtered_products = products_db.copy()
    
    if skin_type:
        filtered_products = [p for p in filtered_products if p["skin_type"] == skin_type]
    if max_price:
        filtered_products = [p for p in filtered_products if p["price"] <= max_price]
    if cruelty_free:
        filtered_products = [p for p in filtered_products if p["is_cruelty_free"] == cruelty_free]
    if vegan:
        filtered_products = [p for p in filtered_products if p["is_vegan"] == vegan]
    
    return filtered_products

@app.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: int):
    product = next((p for p in products_db if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.post("/products/{product_id}/reviews", status_code=status.HTTP_201_CREATED, response_model=Review)
async def create_review(product_id: int, rating: int, comment: str):
    if not any(p["id"] == product_id for p in products_db):
        raise HTTPException(status_code=404, detail="Product not found")
    
    if rating < 1 or rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1-5")
    
    review = {
        "id": str(uuid.uuid4()),
        "product_id": product_id,
        "rating": rating,
        "comment": comment,
        "created_at": datetime.now().isoformat()
    }
    reviews_db.append(review)
    update_product_rating(product_id)
    return review

@app.get("/products/{product_id}/reviews", response_model=List[Review])
async def get_product_reviews(product_id: int):
    return [r for r in reviews_db if r["product_id"] == product_id]