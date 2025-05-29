from sqlalchemy import Column, Integer, String, Float, Text, Boolean, Enum, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class ProductCategory(str, PyEnum):
    FOUNDATION = "foundation"
    CONCEALER = "concealer"
    LIPSTICK = "lipstick"
    EYESHADOW = "eyeshadow"
    MASCARA = "mascara"
    SKINCARE = "skincare"

class SkinType(str, PyEnum):
    NORMAL = "normal"
    DRY = "dry"
    OILY = "oily"
    COMBINATION = "combination"
    SENSITIVE = "sensitive"

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    brand = Column(String(50), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    currency = Column(String(3), default="USD")
    category = Column(Enum(ProductCategory), nullable=False)
    skin_type = Column(Enum(SkinType))
    shade = Column(String(50))
    ingredients = Column(Text)
    is_cruelty_free = Column(Boolean, default=False)
    is_vegan = Column(Boolean, default=False)
    rating = Column(Float)
    stock = Column(Integer, default=0)
    image_url = Column(String(255))
    
    reviews = relationship("Review", back_populates="product")

class Review(Base):
    __tablename__ = "reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    rating = Column(Float, nullable=False)
    comment = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    product = relationship("Product", back_populates="reviews")
    user = relationship("User", back_populates="reviews")

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    
    reviews = relationship("Review", back_populates="user")