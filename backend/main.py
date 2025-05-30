from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils import preprocess_image, base64_to_image
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = load_model("digit-prediction-cnn-model.h5")

class CanvasInput(BaseModel):
    image_data: str  # base64 string

@app.post("/predict/canvas")
async def predict_canvas(input: CanvasInput):
    try:
        img = base64_to_image(input.image_data)
        img_array = preprocess_image(img)
        prediction = model.predict(img_array, verbose=0)
        predicted_class = int(np.argmax(prediction))
        return {"prediction": predicted_class}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing canvas image: {e}")

@app.post("/predict/image")
async def predict_image(file: UploadFile = File(...)):
    try:
        img = Image.open(file.file)
        img_array = preprocess_image(img)
        prediction = model.predict(img_array, verbose=0)
        predicted_class = int(np.argmax(prediction))
        return {"prediction": predicted_class}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing uploaded image: {e}")
