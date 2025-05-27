from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
import uuid

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class Product(BaseModel):
    id: int
    name: str
    price: float
    image_url: str
    description: str

class Review(BaseModel):
    id: str
    product_id: int
    rating: int
    comment: str
    created_at: str

# Database Mock
products_db = [
    {
        "id": 1,
        "name": "Hydrating Facial Moisturizer",
        "price": 24.99,
        "image_url": "https://i.pinimg.com/736x/88/51/be/8851bed856cbf253f2046a9d0b67cdc9.jpg",
        "description": "Deeply hydrating moisturizer for all skin types"
    },
    {
        "id": 2,
        "name": "Foundation",
        "price": 18.50,
        "image_url": "https://via.placeholder.com/300?text=Cleanser",
        "description": "Purifying charcoal cleanser for oily skin"
    },
     {
        "id": 3,
        "name": "Charcoal cleansing bar",
        "price": 30.00,
        "image_url": "https://i.pinimg.com/736x/85/a3/92/85a392147d0faf6794ba042c05f15122.jpg",
        "description": "Deeply hydrating moisturizer for all skin types"
    },
     {
        "id": 4,
        "name": "Toner",
        "price": 24.99,
        "image_url": "https://i.pinimg.com/736x/98/85/7a/98857a057b32c479372818cf20994860.jpg",
        "description": "Balances pH and preps skin for moisture"
    },
     {
        "id": 5,
        "name": "Hydrating Facial Moisturizer",
        "price": 24.99,
        "image_url": "https://via.placeholder.com/300?text=Moisturizer",
        "description": "Deeply hydrating moisturizer for all skin types"
    },
     {
        "id": 6,
        "name": "Hydrating Facial Moisturizer",
        "price": 24.99,
        "image_url": "https://via.placeholder.com/300?text=Moisturizer",
        "description": "Deeply hydrating moisturizer for all skin types"
    },
     {
        "id": 7,
        "name": "Hydrating Facial Moisturizer",
        "price": 24.99,
        "image_url": "https://via.placeholder.com/300?text=Moisturizer",
        "description": "Deeply hydrating moisturizer for all skin types"
    },
     {
        "id": 8,
        "name": "Hydrating Facial Moisturizer",
        "price": 24.99,
        "image_url": "https://via.placeholder.com/300?text=Moisturizer",
        "description": "Deeply hydrating moisturizer for all skin types"
    }
]

reviews_db = []

# API Endpoints
@app.get("/products", response_model=List[Product])
async def get_products():
    return products_db

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
    return review

@app.get("/products/{product_id}/reviews", response_model=List[Review])
async def get_product_reviews(product_id: int):
    return [r for r in reviews_db if r["product_id"] == product_id]