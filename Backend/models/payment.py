from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CardDetails(BaseModel):
    number: str
    expiry: str
    cvc: str
    name: str

class PaymentRequest(BaseModel):
    card_details: CardDetails
    amount: float
    currency: str = "USD"
    description: Optional[str] = None

class PaymentResponse(BaseModel):
    transaction_id: str
    amount: float
    currency: str
    status: str
    timestamp: datetime