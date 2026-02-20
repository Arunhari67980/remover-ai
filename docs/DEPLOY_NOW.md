````markdown
# 🚀 QUICK START: Deploy in 15 Minutes

## TL;DR - Follow This Exactly

### 1. Prepare Your Code (2 min)

```bash
# Make sure you're in your project directory
cd c:\Users\Arun\bg-remover-api

# Create a secure API key and save it
# On Windows PowerShell:
[guid]::NewGuid().ToString().Replace("-","").Substring(0,32)
# Copy the output - this is your API_KEY

# Create .env file (for local testing)
echo API_KEY=your-key-here > .env
echo ALLOWED_ORIGINS=http://localhost:5173 >> .env

# Initialize git if not already done
git init
git add .
git commit -m "Production ready deployment"
```

### 2. Push to GitHub (2 min)

1. Go to https://github.com/new
2. Create repo: `bg-remover-api`
3. In terminal:
```bash
git remote add origin https://github.com/YOUR_USERNAME/bg-remover-api.git
git branch -M main
git push -u origin main
```

### 3. Deploy Backend to Render (3 min)

1. Go to https://render.com/auth/github
2. Authorize & sign in
3. Click **"New +"** → **"Web Service"**
4. Select your `bg-remover-api` repo
5. Fill in:
   - **Name**: `bg-remover-api`
   - **Runtime**: `Python 3`
   - **Build**: `pip install -r requirements.txt`
   - **Start**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Click **"Advanced"** and add env vars:
   ```
   API_KEY = your-key-from-step-1
   ALLOWED_ORIGINS = http://localhost:5173
   ```
7. Click **"Create Web Service"**
8. ⏳ Wait 2 minutes for deployment
9. 📌 **Save your Backend URL** (looks like: `https://bg-remover-api.onrender.com`)

### 4. Deploy Frontend to Vercel (3 min)

1. **Create environment file** in your project:
```bash
# In your project root (c:\Users\Arun\bg-remover-api\)
echo VITE_API_URL=https://bg-remover-api.onrender.com/remove-bg > .env.production
echo VITE_API_KEY=your-key-from-step-1 >> .env.production
```

2. **Commit the frontend code**:
```bash
git add .env.production package.json vite.config.js
git commit -m "Add production environment"
git push
```

3. Go to https://vercel.com/auth/github
4. Authorize & sign in
5. Click **"New Project"**
6. Import your `bg-remover-api` repo
7. Click **"Deploy"** (Vercel auto-detects Vite)
8. ⏳ Wait 1-2 minutes
9. 📌 **Save your Frontend URL** (looks like: `https://bg-remover-api.vercel.app`)

### 5. Final Step: Update Backend CORS (2 min)

1. Go back to Render Dashboard
2. Click your `bg-remover-api` service
3. Click **"Environment"**
4. Edit `ALLOWED_ORIGINS`:
   ```
   https://YOUR-VERCEL-URL.vercel.app,http://localhost:5173
   ```
   (Replace YOUR-VERCEL-URL with your actual domain)
5. Click **"Save Changes"**
6. Service will auto-redeploy ✅

---

## ✅ Verification (5 min)

### Test Backend
```bash
# Copy and run in terminal
curl https://bg-remover-api.onrender.com/health

# Should show: {"status":"healthy",...}
```

### Test Frontend
1. Open: `https://YOUR-VERCEL-URL.vercel.app`
2. Upload an image
3. Click "Remove Background"
4. Download should work ✅

---

## 🎯 You Now Have

| Item | URL |
|------|-----|
| **Backend API** | https://bg-remover-api.onrender.com |
| **Frontend** | https://your-app.vercel.app |
| **Health Check** | https://bg-remover-api.onrender.com/health |

**Total Cost**: FREE ✅

---

## ⚠️ Common Issues

### "Invalid API Key" Error
- ✅ Already fixed in code (uses environment variables now)
- Check Render environment variables are set

### CORS Error in Browser
- Update `ALLOWED_ORIGINS` in Render with your Vercel URL

### Backend slow to start
- First request takes 5-10 sec (free tier cold start)
- Normal! It speeds up after

### Images don't upload
- Check file size (limit to < 10MB)
- Check browser console for errors (F12)

---

## 🎉 Done!

Your website is now live and production-ready!

**Next Steps:**
- [ ] Share with friends: Your Vercel URL
- [ ] Monitor using browser DevTools
- [ ] Upgrade to paid if needed (not required yet!)
- [ ] Add custom domain (optional)

---

## 📚 Full Guides

- Full details: [HOSTING_GUIDE.md](./HOSTING_GUIDE.md)
- Deployment checklist: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- Configuration reference: [DEPLOYMENT_CONFIG.md](./DEPLOYMENT_CONFIG.md)

---

## Support

- **Render Help**: https://render.com/docs
- **Vercel Help**: https://vercel.com/support
- **FastAPI Docs**: https://fastapi.tiangolo.com

Happy hosting! 🚀

````