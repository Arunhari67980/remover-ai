# 📋 Deployment Configuration Reference

## Quick URLs & Keys Template

```
# Fill this out and save securely
BACKEND_URL = https://bg-remover-api.onrender.com
FRONTEND_URL = https://bg-remover-api.vercel.app

API_KEY = [GENERATE SECURE 32+ CHAR KEY]

# For local development
LOCAL_BACKEND = http://localhost:8000
LOCAL_FRONTEND = http://localhost:5173
```

---

## Render Backend Configuration

### Service Settings
- **Name**: `bg-remover-api`
- **Runtime**: Python 3
- **Region**: Oregon (closest to you or users)
- **Plan**: Free (750 hrs/month)

### Build Command
```
pip install -r requirements.txt
```

### Start Command
```
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Environment Variables
```
API_KEY = your-super-secret-key-here
ALLOWED_ORIGINS = https://bg-remover-api.vercel.app,http://localhost:5173
PYTHONUNBUFFERED = true
```

### Health Check
```
GET https://bg-remover-api.onrender.com/health
```

### Expected Response
```json
{
  "status": "healthy",
  "service": "Background Remover API",
  "version": "1.0.0"
}
```

---

## Vercel Frontend Configuration

### Project Settings
- **Framework**: Vite
- **Node Version**: 18.x (default)
- **Install Command**: `npm install`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Environment Variables
```
VITE_API_URL = https://bg-remover-api.onrender.com/remove-bg
VITE_API_KEY = your-super-secret-key-here
```

### Deployment Regions
- Automatic (use default)
- Recommended: US East (closest latency)

---

## API Endpoint Configuration

### Production Endpoint
```
POST https://bg-remover-api.onrender.com/remove-bg
Content-Type: application/json
X-API-Key: [YOUR_API_KEY]

Body:
{
  "image": "data:image/png;base64,iVBORw0KGgo..."
}

Response:
PNG image binary (200 OK)
```

### Local Development Endpoint
```
POST http://localhost:8000/remove-bg
X-API-Key: mysecretkey123
```

---

## Frontend Code Configuration

### Add to `src/main.jsx` or `src/App.jsx`
```javascript
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

async function removeBackground(imageData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({ image: imageData }),
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.blob();
}
```

---

## GitHub Repository Structure

### Backend Repo: `bg-remover-api`
```
bg-remover-api/
├── main.py
├── requirements.txt
├── .env.example
├── .gitignore
├── README.md
└── .github/
    └── workflows/
        └── deploy.yml (optional CI/CD)
```

### Frontend Repo: `bg-remover-frontend` or same repo
```
bg-remover-frontend/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── components/
├── public/
├── package.json
├── vite.config.js
├── .env.production
├── .env.local
├── .env.example
├── vercel.json
└── .gitignore
```

---

## Testing Commands

### Local Backend Test
```bash
# Start backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Test health (in another terminal)
curl http://localhost:8000/health
```

### Local Frontend Test
```bash
# Start frontend
npm install
npm run dev

# Should open http://localhost:5173
```

### Test with Real Backend
```bash
# Update .env.local
VITE_API_URL=https://bg-remover-api.onrender.com/remove-bg
VITE_API_KEY=your-key

# Start frontend
npm run dev
```

---

## Troubleshooting Reference

### 1. Backend Takes Long to Start (Render)
- **Issue**: First request slow (cold start)
- **Cause**: Free tier spins down after 15 mins inactivity
- **Fix**: Upgrade to paid tier or add uptime monitor
- **Monitor**: https://your-backend.onrender.com/health

### 2. CORS Error in Browser
```
Access to XMLHttpRequest at 'https://...' blocked by CORS policy
```
**Fix**: Update `ALLOWED_ORIGINS` in Render environment
```
ALLOWED_ORIGINS = https://bg-remover-api.vercel.app,http://localhost:5173
```

### 3. 403 Forbidden Error
```
{"detail":"Invalid API Key"}
```
**Fix**: Ensure frontend is sending correct API_KEY header
```javascript
headers: {
  'X-API-Key': import.meta.env.VITE_API_KEY,
}
```

### 4. 413 Payload Too Large
**Issue**: Image file too big
**Fix**: Limit upload size or compress image first
```javascript
const maxSize = 10 * 1024 * 1024; // 10MB
if (file.size > maxSize) throw new Error('Image too large');
```

### 5. Timeout Processing Image
**Issue**: Complex image takes > 30s
**Fix**: Increase timeout or add progress indicator
```python
# In main.py, add timeout handler
import asyncio
asyncio.wait_for(process_image(), timeout=60)
```

---

## Monitoring & Logs

### Render Logs
1. Dashboard → Select `bg-remover-api`
2. View in **Logs** tab
3. Filter by event type

### Vercel Logs
1. Dashboard → Select project
2. Click **Deployments**
3. Select deployment → View **Logs**

### Local Terminal
```bash
# Backend logs
uvicorn main:app --reload --log-level debug

# Frontend logs
npm run dev -- --debug
```

---

## Performance Benchmarks

| Metric | Target | Current |
|--------|--------|---------|
| Backend startup | < 3 sec | ? |
| Image processing | < 5 sec | ? |
| Frontend load | < 1 sec | ? |
| API response | < 2 sec | ? |
| CDN cache | 7 days | ✅ (Vercel default) |

---

## Security Credentials

### API Key Requirements
- Minimum 32 characters
- Random mix of uppercase, lowercase, numbers, symbols
- Never commit to git
- Rotate every 90 days

### Generate Secure Key (Terminal)
```bash
# macOS/Linux
openssl rand -base64 32

# Windows PowerShell
[System.Convert]::ToBase64String([System.Security.Cryptography.RNGCryptoServiceProvider]::new().GetBytes(24))
```

### Store Safely
- **Never**: Hardcode in source
- **Never**: Share in chat/email
- **Use**: Render/Vercel environment variables
- **Backup**: Store in password manager

---

## Deployment Checklist Summary

```
BEFORE DEPLOY:
[ ] Code pushed to GitHub
[ ] No secrets in code
[ ] Requirements.txt complete
[ ] All env vars documented

DURING DEPLOY:
[ ] Render backend configured
[ ] Vercel frontend configured
[ ] Environment variables set (both)
[ ] Health check passes

AFTER DEPLOY:
[ ] Backend health: https://api.onrender.com/health
[ ] Frontend loads: https://yourapp.vercel.app
[ ] Image processing works end-to-end
[ ] No console errors
[ ] Download result image works
```

---

## Support & Docs

- **FastAPI**: https://fastapi.tiangolo.com/docs
- **Render Docs**: https://render.com/docs/deploy-fastapi
- **Vercel Docs**: https://vercel.com/docs/frameworks/vite
- **CORS Info**: https://fastapi.tiangolo.com/tutorial/cors
