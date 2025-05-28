from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
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

class ReviewCreate(BaseModel):
    rating: int = Field(..., ge=1, le=5)  
    comment: str = Field(..., min_length=10)


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
    },
    {
        "id": 3,
        "name": "Clarifying Foaming Cleanser",
        "brand": "PureSkin",
        "price": 18.50,
        "image_url": "https://i.pinimg.com/736x/5a/08/3d/5a083d482aaf727c7c6c0073544b5331.jpg",
        "rating": 4.3,
        "skin_type": "oily",
        "is_cruelty_free": True,
        "is_vegan": False,
        "description": "Foaming facial cleanser that removes excess oil and unclogs pores for clearer skin"
    },
    {
        "id": 4,
        "name": "Soothing Aloe Vera Gel",
        "brand": "NatureTouch",
        "price": 14.99,
        "image_url": "https://i.pinimg.com/736x/6a/5a/c0/6a5ac07e9606d5f4ef33535dacb489b6.jpg",
        "rating": 4.7,
        "skin_type": "sensitive",
        "is_cruelty_free": True,
        "is_vegan": True,
        "description": "Cooling gel with 99% aloe vera to calm irritated and inflamed skin"
    },
    {
        "id": 5,
        "name": "Revitalizing Vitamin C Serum",
        "brand": "BrightGlow",
        "price": 29.95,
        "image_url": "https://i.pinimg.com/736x/ca/53/62/ca536229eae3e4fec3b13b0377fbdd81.jpg",
        "rating": 4.8,
        "skin_type": "combination",
        "is_cruelty_free": True,
        "is_vegan": True,
        "description": "Antioxidant-rich serum that brightens skin tone and reduces dark spots"
    },
    {
        "id": 6,
        "name": "Oil-Free Matte Moisturizer",
        "brand": "SkinMate",
        "price": 21.00,
        "image_url": "https://i.pinimg.com/736x/53/fc/1d/53fc1d90dddd4157ae39f73a4764c71a.jpg",
        "rating": 4.2,
        "skin_type": "oily",
        "is_cruelty_free": False,
        "is_vegan": False,
        "description": "Lightweight moisturizer that hydrates while controlling excess shine"
    },
    {
        "id": 7,
        "name": "Nourishing Night Cream",
        "brand": "LunaSkin",
        "price": 27.99,
        "image_url": "https://i.pinimg.com/736x/78/7c/f9/787cf97fbfe2edf452c5a88007e325e6.jpg",
        "rating": 4.6,
        "skin_type": "dry",
        "is_cruelty_free": True,
        "is_vegan": True,
        "description": "Rich night cream that repairs and deeply nourishes while you sleep"
    },
    {
        "id": 8,
        "name": "Gentle Exfoliating Scrub",
        "brand": "GlowEssence",
        "price": 16.75,
        "image_url": "https://i.pinimg.com/736x/09/db/c9/09dbc999a3a1d435422aa536341b86f5.jpg",
        "rating": 4.4,
        "skin_type": "normal",
        "is_cruelty_free": True,
        "is_vegan": True,
        "description": "Soft exfoliating scrub with natural beads to remove dead skin cells"
    },
    {
        "id": 9,
        "name": "Balancing Toner",
        "brand": "EquiTone",
        "price": 17.49,
        "image_url": "https://i.pinimg.com/736x/bf/be/dc/bfbedc2c1d07d41d6f1ce251a04b6993.jpg",
        "rating": 4.1,
        "skin_type": "combination",
        "is_cruelty_free": True,
        "is_vegan": False,
        "description": "pH-balancing toner that refines pores and refreshes skin"
    },
    {
        "id": 10,
        "name": "Daily SPF 50 Sunscreen",
        "brand": "SunDefend",
        "price": 22.00,
        "image_url": "https://i.pinimg.com/736x/5f/fe/50/5ffe50770914e32857574b4f5e985e2a.jpg",
        "rating": 4.9,
        "skin_type": "all",
        "is_cruelty_free": True,
        "is_vegan": True,
        "description": "Lightweight, non-greasy sunscreen offering broad spectrum protection"
    },
    {
        "id": 11,
        "name": "Hydro Boost Water Gel",
        "brand": "AquaDerm",
        "price": 19.99,
        "image_url": "https://i.pinimg.com/736x/01/03/80/0103802fdd401416beb59bfc4785b42e.jpg",
        "rating": 4.5,
        "skin_type": "normal",
        "is_cruelty_free": False,
        "is_vegan": True,
        "description": "Refreshing gel moisturizer that delivers long-lasting hydration"
    },
    {
        "id": 12,
        "name": "Brightening Eye Cream",
        "brand": "FreshLook",
        "price": 23.49,
        "image_url": "https://i.pinimg.com/736x/fd/2a/db/fd2adbf050e47188d6d178737a3663e4.jpg",
        "rating": 4.3,
        "skin_type": "all",
        "is_cruelty_free": True,
        "is_vegan": False,
        "description": "Eye cream that reduces puffiness and brightens dark under-eye circles"
    },
    {
        "id": 13,
        "name": "Detox Clay Mask",
        "brand": "EarthGlow",
        "price": 25.00,
        "image_url": "https://i.pinimg.com/736x/ff/24/73/ff24735f99b05c79878c55112a24f1b2.jpg",
        "rating": 4.6,
        "skin_type": "oily",
        "is_cruelty_free": True,
        "is_vegan": True,
        "description": "Purifying clay mask that absorbs impurities and tightens pores"
    },
    {
        "id": 14,
        "name": "Replenishing Facial Oil",
        "brand": "Botaniq",
        "price": 30.95,
        "image_url": "https://i.pinimg.com/736x/12/fd/eb/12fdeb4624f8745bde9824d482d858cb.jpg",
        "rating": 4.7,
        "skin_type": "dry",
        "is_cruelty_free": True,
        "is_vegan": True,
        "description": "Luxurious facial oil with jojoba and rosehip for intense nourishment"
    },
    {
        "id": 15,
        "name": "Velvet Matte Lipstick",
        "brand": "LuxeLip",
        "price": 12.99,
        "image_url": "https://i.pinimg.com/736x/13/54/62/1354628aa912e1e76b7f9f76fa173fc1.jpg",
        "rating": 4.6,
        "skin_type": "all",
        "is_cruelty_free": True,
        "is_vegan": True,
        "description": "Long-lasting velvet matte lipstick in a deep rose shade for a bold look"
    },
    {
        "id": 16,
        "name": "Liquid Foundation SPF 15",
        "brand": "SkinBase",
        "price": 24.50,
        "image_url": "https://i.pinimg.com/736x/4d/51/9f/4d519f1e00c75032789d9797508971b7.jpg",
        "rating": 4.4,
        "skin_type": "combination",
        "is_cruelty_free": True,
        "is_vegan": False,
        "description": "Medium coverage foundation with SPF 15 that blends seamlessly for a natural finish"
    },
    {
        "id": 17,
        "name": "Cream Concealer Stick",
        "brand": "HideIt",
        "price": 9.99,
        "image_url": "https://i.pinimg.com/736x/98/43/6f/98436f5e51fff3c77b18566d1d127227.jpg",
        "rating": 4.5,
        "skin_type": "oily",
        "is_cruelty_free": False,
        "is_vegan": False,
        "description": "Easy-to-apply cream concealer that covers dark circles and blemishes with a matte finish"
    },
    {
        "id": 18,
        "name": "Glow Highlighter Palette",
        "brand": "RadiantFX",
        "price": 19.99,
        "image_url": "https://i.pinimg.com/736x/74/76/47/74764743f15b9ff36a88767b4b77a185.jpg",
        "rating": 4.7,
        "skin_type": "all",
        "is_cruelty_free": True,
        "is_vegan": True,
        "description": "Palette of four radiant highlighters for a glowing, luminous finish"
    },
    {
        "id": 19,
        "name": "Lengthening Mascara",
        "brand": "EyeLuxe",
        "price": 15.00,
        "image_url": "https://i.pinimg.com/736x/e3/0c/f4/e30cf4b4cfee804f0aede9860b566325.jpg",
        "rating": 4.6,
        "skin_type": "all",
        "is_cruelty_free": True,
        "is_vegan": True,
        "description": "Black mascara with a precision brush that separates and lengthens lashes without clumping"
    },
    {
        "id": 20,
        "name": "Cream Blush Pot",
        "brand": "CheekPop",
        "price": 11.50,
        "image_url": "https://i.pinimg.com/736x/20/de/11/20de11b40ded0a23e36c59f7ca6b9bf6.jpg",
        "rating": 4.3,
        "skin_type": "dry",
        "is_cruelty_free": True,
        "is_vegan": False,
        "description": "Buildable cream blush for a natural flush with a silky, hydrating texture"
    },
    {
        "id": 21,
        "name": "Brow Definer Pencil",
        "brand": "BrowMaster",
        "price": 10.00,
        "image_url": "https://i.pinimg.com/736x/6f/bd/2a/6fbd2af78faf7dce349ef6f15ac09367.jpg",
        "rating": 4.4,
        "skin_type": "all",
        "is_cruelty_free": False,
        "is_vegan": False,
        "description": "Dual-ended brow pencil with a precise tip and blending spoolie for sculpted brows"
    },
    {
        "id": 22,
        "name": "Matte Liquid Lipstick",
        "brand": "BoldHue",
        "price": 13.99,
        "image_url": "https://i.pinimg.com/736x/be/92/d3/be92d344e7a4b0062127418d8b345618.jpg",
        "rating": 4.8,
        "skin_type": "all",
        "is_cruelty_free": True,
        "is_vegan": True,
        "description": "Highly pigmented matte liquid lipstick with all-day wear and no transfer"
    },
    {
        "id": 23,
        "name": "Setting Spray",
        "brand": "FixPro",
        "price": 17.00,
        "image_url": "https://i.pinimg.com/736x/05/9b/3c/059b3c418091cb994ae99984f2e8d2ff.jpg",
        "rating": 4.5,
        "skin_type": "all",
        "is_cruelty_free": True,
        "is_vegan": True,
        "description": "Lightweight setting spray that locks in makeup for up to 16 hours without creasing"
    },
    {
        "id": 24,
        "name": "Flawless Primer",
        "brand": "BaseGlow",
        "price": 20.99,
        "image_url": "https://i.pinimg.com/736x/b6/79/6e/b6796ee982c93d3121f93a79a8a8cafa.jpg",
        "rating": 4.6,
        "skin_type": "combination",
        "is_cruelty_free": True,
        "is_vegan": True,
        "description": "Smoothing primer that blurs imperfections and preps skin for makeup application"
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

@app.post("/products/{product_id}/reviews")
def create_review(product_id: int, review: ReviewCreate):
    return {"status": "success"}

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