from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
import uuid
import os

from utils import predict_video

app = FastAPI()

# Allow React to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Save uploaded video
    file_id = str(uuid.uuid4())
    video_path = f"{UPLOAD_DIR}/{file_id}_{file.filename}"

    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run ML prediction
    fake_prob = predict_video(video_path)

    # Clean up
    os.remove(video_path)

    if fake_prob > 0.5:
        return {
            "result": "FAKE",
            "confidence": round(fake_prob * 100, 2)
        }
    else:
        return {
            "result": "REAL",
            "confidence": round((1 - fake_prob) * 100, 2)
        }
