from pydantic import BaseModel
class Product(BaseModel):
    name: str
    price: float
    category: str
    class Config:
        on_mode = True