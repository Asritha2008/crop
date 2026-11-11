from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Crop Recommendation API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class CropInput(BaseModel):
    N: float = Field(ge=0, le=200)
    P: float = Field(ge=0, le=200)
    K: float = Field(ge=0, le=250)
    temperature: float = Field(ge=0, le=60)
    humidity: float = Field(ge=0, le=100)
    ph: float = Field(ge=0, le=14)
    rainfall: float = Field(ge=0, le=500)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(data: CropInput):
    # FAKE ANSWER for Days 2 to 4
    return {
        "crop": "rice",
        "confidence": 0.5,
        "top3": [
            {"crop": "rice", "probability": 0.5},
            {"crop": "jute", "probability": 0.3},
            {"crop": "coffee", "probability": 0.2}
        ]
    }