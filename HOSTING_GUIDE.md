# 🚀 Complete Website Hosting Guide (Production Ready)

## Overview
This guide deploys your entire background remover application:
- **Frontend**: React + Vite on Vercel (CDN + Serverless)
- **Backend**: FastAPI on Render (Docker + Auto-scaling)
- **Database/Storage**: Not needed (stateless API)

---

## 🔑 Pre-Deployment Checklist

- [ ] GitHub account created
- [ ] Vercel account (vercel.com)
- [ ] Render account (render.com)
- [ ] Domain name (optional, but recommended)
- [ ] Generated secure API_KEY

---

## Part 1: Backend Deployment (Render) - 5 minutes

### Step 1: Create Backend Repo on GitHub

```bash
# Create new repo on GitHub: https://github.com/new
# Name it: bg-remover-api-backend
# Add description: "FastAPI Background Remover Service"
```

### Step 2: Create `.env` File for Render

In Render dashboard, we'll add these environment variables:

```
API_KEY=your-super-secret-key-12345
ALLOWED_ORIGINS=https://remover-ai.vercel.app,http://localhost:5173
ENVIRONMENT=production
```

### Step 3: Deploy to Render

1. Go to **https://render.com** → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Select your backend repo
4. Configure:
   - **Name**: `bg-remover-api`
   - **Runtime**: Python 3
   - **Root Directory**: (leave empty)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Add Environment Variables**:
   ```
   API_KEY = your-secure-key
   ALLOWED_ORIGINS = https://remover-ai.vercel.app,http://localhost:5173
   ```
6. Click **"Create Web Service"**
7. Wait 2-3 minutes for deployment ✅

**Your Backend URL**: `https://bg-remover-api.onrender.com` (or custom domain)

---

## Part 2: Frontend Deployment (Vercel) - 5 minutes

### Step 1: Set Up Environment Variables

Create `.env.production` in your project root:

```env
VITE_API_URL=https://bg-remover-api.onrender.com/remove-bg
VITE_API_KEY=your-secure-key
```

### Step 2: Create `vercel.json` for routing

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@vite_api_url",
    "VITE_API_KEY": "@vite_api_key"
  },
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html",
      "status": 200
    }
  ],
  "functions": {
    "src/pages/**/*.jsx": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### Step 3: Deploy to Vercel

1. Go to **https://vercel.com** → Sign up with GitHub
2. Click **"Add New"** → **"Project"**
3. Select your backend repo or current project
4. **Import Project**
5. Framework: Auto-detect (Vite)
6. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. **Add Environment Variables**:
   ```
   VITE_API_URL = https://bg-remover-api.onrender.com/remove-bg
   VITE_API_KEY = your-secure-key
   ```
8. **Deploy** ✅
9. Wait 1-2 minutes

**Your Frontend URL**: `https://bg-remover-api.vercel.app`

---

## Part 3: Configure Domain (Optional but Recommended)

### Connect Custom Domain

**For Vercel**:
1. Project Settings → Domains
2. Add domain: `bg-remover.com`
3. Update DNS at registrar (GoDaddy, Namecheap, etc)

**For Render**:
1. Web Service Settings → Custom Domain
2. Add domain: `api.bg-remover.com`
3. Add CNAME record to DNS

---

## Part 4: Monitoring & Scaling

### Health Checks
- **Backend**: https://bg-remover-api.onrender.com/health
- **Frontend**: https://bg-remover-api.vercel.app

### Error Tracking (Optional)
Add Sentry for error monitoring:

```python
# In main.py
import sentry_sdk
sentry_sdk.init("your-sentry-dsn")
```

### Auto-scaling
- **Render**: ✅ Automatic (paid plans)
- **Vercel**: ✅ Automatic serverless

---

## 🔒 Security Checklist

- [ ] API Key is secure & not in git
- [ ] CORS is restricted to frontend domain only
- [ ] No hardcoded secrets in code
- [ ] Backend uses HTTPS (automatic on both platforms)
- [ ] Environment variables set on both platforms
- [ ] `.env` file ignored in `.gitignore`

---

## 📊 Testing Your Deployment

### 1. Test Backend Health
```bash
curl https://bg-remover-api.onrender.com/health
# Should return: {"status": "healthy", ...}
```

### 2. Test Backend with Image
```bash
curl -X POST https://bg-remover-api.onrender.com/remove-bg \
  -H "X-API-Key: your-key" \
  -H "Content-Type: application/json" \
  -d '{"image": "your-base64-image"}'
```

### 3. Test Frontend
- Open https://bg-remover-api.vercel.app
- Upload image
- Verify background removal works

---

## 🐛 Troubleshooting

### Backend won't deploy
- Check `requirements.txt` has all dependencies
- Verify start command is correct
- Check logs: Render Dashboard → Logs

### Frontend shows errors
- Check browser console (F12)
- Verify environment variables set
- Test backend health first
- Check CORS settings

### CORS Errors
Update `main.py`:
```python
ALLOWED_ORIGINS = [
    "https://remover-ai.vercel.app",
    "http://localhost:5173"
]
```

### API Key not working
- Verify key is set in Render environment
- Check frontend is sending `x-api-key` header
- Ensure header name matches in backend

---

## 📈 Performance Tips

1. **Image Optimization**:
   - Compress images before uploading
   - Limit to files < 10MB
   - Use WebP format

2. **Caching**:
   - Cache frontend assets (auto on Vercel)
   - Set `Cache-Control` headers on API responses

3. **Database** (future):
   - Consider PostgreSQL on Railway or Supabase
   - Add caching layer (Redis)

---

## 💰 Cost Breakdown

| Service | Free Tier | Paid |
|---------|-----------|------|
| Vercel | ✅ Unlimited | $20/mo |
| Render | ✅ 750 hrs/mo | $7-12/mo |
| **Total** | **✅ Free** | **~$27/mo** |

---

## 🎯 Next Steps

1. **Immediate**: Deploy backend to Render
2. **Next**: Deploy frontend to Vercel
3. **Then**: Monitor and optimize
4. **Later**: Add custom domain
5. **Future**: Add database, caching, monitoring

---

## Quick Reference: URLs After Deployment

```
Frontend:  https://bg-remover-api.vercel.app
Backend:   https://bg-remover-api.onrender.com
Health:    https://bg-remover-api.onrender.com/health
```

---

Questions? Check the individual deployment guides:
- [Backend Deployment](./BACKEND_DEPLOYMENT.md)
- [Frontend Deployment](./FRONTEND_DEPLOYMENT.md)
