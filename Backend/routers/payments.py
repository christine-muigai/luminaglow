from fastapi import APIRouter, HTTPException
from datetime import datetime
import uuid
from models.payment import PaymentRequest, PaymentResponse

router = APIRouter(prefix="/api/payments", tags=["payments"])

@router.post("/process", response_model=PaymentResponse)
async def process_payment(payment_request: PaymentRequest):
    
    card = payment_request.card_details
    if not all([card.number, card.expiry, card.cvc, card.name]):
        raise HTTPException(status_code=400, detail="Missing card details")
    
    if len(card.number.replace(" ", "")) < 15:
        raise HTTPException(status_code=400, detail="Invalid card number")
    
    if len(card.cvc) < 3:
        raise HTTPException(status_code=400, detail="Invalid CVC")
    
    transaction_id = str(uuid.uuid4())
    
    return {
        "transaction_id": transaction_id,
        "amount": payment_request.amount,
        "currency": payment_request.currency,
        "status": "completed",
        "timestamp": datetime.now()
    }