# Backend Deployment Guide

## Create Backend Repo

```bash
# Create new directory for backend
mkdir remover-ai-backend
cd remover-ai-backend
git init

# Create your main.py, requirements.txt, etc.
git add .
git commit -m "Initial backend commit"
git remote add origin https://github.com/YOUR_USERNAME/remover-ai-backend.git
git push -u origin main
```

## Files needed in backend repo:

- `main.py` (FastAPI app)
- `requirements.txt` (Python dependencies)
- `.gitignore` (exclude venv, __pycache__)
- `Procfile` (for deployment)
- `.env.example` (example env vars)

## Deploy Backend to Render

### Option A: Using Render (Recommended - FREE tier available)

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your `remover-ai-backend` repo
5. Configure:
   - Name: `remover-ai-api`
   - Runtime: `Python`
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Environment variables:
     ```
     PYTHONUNBUFFERED=true
     ```
6. Deploy!

Your backend will be at: `https://remover-ai-api.onrender.com`

### Option B: Using Railway (Also good)

1. Go to https://railway.app
2. Connect GitHub
3. Create new project
4. Select your `remover-ai-backend` repo
5. Railway auto-detects Python
6. Add environment variables
7. Deploy!

Your backend will be at: `https://remover-ai-backend.railway.app`

### Option C: Using Fly.io

1. Go to https://fly.io
2. Install `flyctl`: https://fly.io/docs/getting-started/installing-flyctl/
3. Run:
```bash
cd remover-ai-backend
flyctl launch
flyctl deploy
```

Your backend will be at: `https://remover-ai-api.fly.dev`

## Update CORS in main.py

Make sure your FastAPI has proper CORS:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://remover-ai.vercel.app", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Update requirements.txt

Ensure these are included:
```
fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.5.0
python-multipart==0.0.6
rembg==2.0.50
pillow==10.1.0
python-dotenv==1.0.0
```
