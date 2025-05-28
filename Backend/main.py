from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import payments

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(payments.router)

@app.get("/")
def read_root():
    return {"message": "Payment API is running"}