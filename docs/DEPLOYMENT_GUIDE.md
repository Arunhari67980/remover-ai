````markdown
# Quick Start: Separate Backend & Frontend Deployment

## 🚀 Summary of Deployment Strategy

| Component | Where | Public URL |
|-----------|-------|-----------|
| React Frontend | Vercel | `https://remover-ai.vercel.app` |
| FastAPI Backend | Render | `https://remover-ai-api.onrender.com` |

---

## ⚡ Quick Steps (15 minutes)

### Phase 1: Prepare Backend (5 min)

1. **Create new GitHub repo: `remover-ai-backend`**
   ```bash
   git -C ~/Desktop init remover-ai-backend
   cd ~/Desktop/remover-ai-backend
   ```

2. **Copy backend files:**
   ```bash
   # Copy from your main project
   cp ~/bg-remover-api/main.py .
   cp ~/bg-remover-api/requirements.txt .
   ```

3. **Add .gitignore, .env.example, README:**
   ```bash
   echo "venv/" > .gitignore
   echo "__pycache__/" >> .gitignore
   echo ".env" >> .gitignore
   ```

4. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Backend: FastAPI + rembg service"
   git remote add origin https://github.com/YOUR_USERNAME/remover-ai-backend.git
   git push -u origin main
   ```

### Phase 2: Deploy Backend to Render (3 min)

1. Go to https://render.com → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your **`remover-ai-backend`** repo
4. Fill in:
   - **Name:** `remover-ai-api`
   - **Runtime:** Python 3
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Create Web Service**
6. Wait 2-3 minutes for deployment ✅

**Your backend URL:** `https://remover-ai-api.onrender.com`

### Phase 3: Deploy Frontend to Vercel (5 min)

1. Go to https://vercel.com → Sign up with GitHub
2. Click **"Add New"** → **"Project"**
3. Import **`remover-ai`** repo
4. Click **"Deploy"** (Vercel auto-detects Vite)
5. After deployment, go to **Project Settings** → **Environment Variables**
6. Add variable:
   ```
   VITE_API_URL = https://remover-ai-api.onrender.com/remove-bg
   VITE_API_KEY = your-production-key
   ```
7. **Redeploy** to apply env vars
8. Done! ✅

**Your frontend URL:** `https://remover-ai.vercel.app`

---

## 🔧 Environment Variables Setup

### For Frontend (.env files)

**`.env.local` (dev):**
```
VITE_API_URL=http://localhost:8000/remove-bg
VITE_API_KEY=mysecretkey123
```

**Vercel Dashboard:**
- Production: `VITE_API_URL = https://remover-ai-api.onrender.com/remove-bg`
- Preview: `VITE_API_URL = https://remover-ai-api.onrender.com/remove-bg`

### For Backend (main.py)

Update CORS to allow Vercel domain:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://remover-ai.vercel.app",
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🧪 Testing Checklist

- [ ] Backend deployed to Render (visit https://remover-ai-api.onrender.com/docs)
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set on Vercel
- [ ] Can upload image on frontend without CORS error
- [ ] Backend processes image correctly
- [ ] Download works

---

## 📝 Alternative Backend Hosting Options

| Platform | Free Tier | Startup Time | Best For |
|----------|-----------|--------------|----------|
| **Render** | Yes (spinning down) | 50s cold start | Learning, hobby projects |
| **Railway** | $5 credits | 10-30s | Reliable, fast |
| **Fly.io** | Yes | 5-10s | Global edge locations |
| **AWS Lambda** | 1M requests/mo | Instant (warm) | Production, high scale |
| **Google Cloud Run** | 2M requests/mo | 5-15s | Scalable, managed |

---

## 🎯 What Happens Next

After deployment:

1. **User uploads image** → Sent to `https://remover-ai.vercel.app`
2. **Frontend calls API** → `POST https://remover-ai-api.onrender.com/remove-bg`
3. **Backend processes** → Removes background using rembg
4. **Response returns** → PNG with transparent background
5. **User downloads** → PNG file

All happens in **~2-3 seconds**! ⚡

---

## ⚠️ Common Issues & Fixes

**Issue: CORS error when uploading**
- Solution: Update CORS in `main.py` with your Vercel domain

**Issue: Backend returns 404**
- Solution: Check your `VITE_API_URL` doesn't have trailing slash

**Issue: Env vars not working**
- Solution: Redeploy after setting env vars (auto or manual)

**Issue: First request takes 50 seconds**
- Solution: Normal for Render free tier (cold start). Upgrade or use Railway.

---

## 📞 Support

Need help? Check logs:
- **Vercel:** Deployments tab → click deployment → View logs
- **Render:** Dashboard → Service → Logs tab

````