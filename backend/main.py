from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/products")
async def get_products():
    return [
        {
        "id": 1,
        "name":"Hydrating Facial Moisturizer",
        "brand": "GlowLab",
        "price":24.99,
        "image_url":"https://i.pinimg.com/736x/94/07/21/94072195d53f07b62f68e81d0d04d817.jpg",
        "rating":4.5,
        "skin_type":"dry",
        "is_cruelty_free":True,
        "is_vegan": True
    },
    {
        "id": 2,
        "name":"Charcoal Cleansing Bar",
        "brand": "PureSkin",
        "price": 18.50,
        "image_url": "https://i.pinimg.com/736x/cd/4e/81/cd4e818113c31852ea1410771a2b7a77.jpg",
        "rating": 4.2,
        "skin_type": "oily",
        "is_cruelty_free": True
    },
    {
        "id": 3,
        "name": "Anti-Aging Night Cream",
        "brand": "DermaCare",
        "price": 2.75,
        "image_url": "https://i.pinimg.com/736x/8e/20/fc/8e20fc2aa3d12f2cf165a170ccd1d12f.jpg",
        "rating": 4.8,
        "skin_type": "mature"
    },
   {
        "id": 4,
        "name":"SPF 50 Sunscreen",
        "brand": "SunSafe",
        "price": 29.99,
        "image_url": "https://i.pinimg.com/736x/18/ad/72/18ad724b3ffa4ce388e3e84391708f55.jpg",
        "rating": 4.6,
        "skin_type": "sensitive",
        "is_vegan": True
   }
    
]



@app.get("/products/{product_id}")
async def get_product(product_id: int):
    products = await get_products() 
    product = next((p for p in products if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

reviews = [
    {"id": 1, "product_id": 1, "rating": 5, "comment": "Great product!"},
]


@app.get("/admin/reviews")
async def get_reviews():
    return {"message": "Reviews endpoint"}

@app.get("/")
async def root():
    return {"message": "Luminaglow API is running"}


