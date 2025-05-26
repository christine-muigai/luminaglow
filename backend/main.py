from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Product Model
class Product(BaseModel):
    id: str
    name: str
    brand: str
    price: float
    image_url: Optional[str] = None
    rating: Optional[float] = None
    skin_type: Optional[str] = None
    is_cruelty_free: Optional[bool] = False
    is_vegan: Optional[bool] = False

# Sample Data
sample_products = [
    Product(
        id=str(uuid.uuid4()),
        name="Hydrating Facial Moisturizer",
        brand="GlowLab",
        price=24.99,
        image_url="https://i.pinimg.com/736x/94/07/21/94072195d53f07b62f68e81d0d04d817.jpg",
        rating=4.5,
        skin_type="dry",
        is_cruelty_free=True,
        is_vegan=True
    ),
    Product(
        id=str(uuid.uuid4()),
        name="Charcoal Cleansing Bar",
        brand="PureSkin",
        price=18.50,
        image_url="https://i.pinimg.com/736x/cd/4e/81/cd4e818113c31852ea1410771a2b7a77.jpg",
        rating=4.2,
        skin_type="oily",
        is_cruelty_free=True
    ),
    Product(
        id=str(uuid.uuid4()),
        name="Anti-Aging Night Cream",
        brand="DermaCare",
        price=42.75,
        image_url="https://i.pinimg.com/736x/8e/20/fc/8e20fc2aa3d12f2cf165a170ccd1d12f.jpg",
        rating=4.8,
        skin_type="mature"
    ),
    Product(
        id=str(uuid.uuid4()),
        name="SPF 50 Sunscreen",
        brand="SunSafe",
        price=29.99,
        image_url="https://i.pinimg.com/736x/18/ad/72/18ad724b3ffa4ce388e3e84391708f55.jpg",
        rating=4.6,
        skin_type="sensitive",
        is_vegan=True
    )
]

# API Endpoints
@app.get("/products", response_model=List[Product])
async def get_products():
    return sample_products

@app.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = next((p for p in sample_products if p.id == product_id), None)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product