from fastapi import FastAPI, Header, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rembg import remove
import io
import base64
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Background Remover API", version="1.0.0")

# 🌐 CORS Configuration - Restrict to production frontend
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# API Key from environment (safer than hardcoded)
API_KEY = os.getenv("API_KEY", "mysecretkey123")

# Request model for base64 image
class ImageRequest(BaseModel):
    image: str  # Base64 encoded image string

@app.post("/remove-bg")
async def remove_bg(
    request: ImageRequest,
    x_api_key: str = Header(None)
):
    """Remove background from image (base64).
    
    Args:
        request: ImageRequest with base64 encoded image
        x_api_key: API key for authentication
        
    Returns:
        PNG image with background removed
    """
    # 🔐 API Key Protection
    if x_api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API Key")

