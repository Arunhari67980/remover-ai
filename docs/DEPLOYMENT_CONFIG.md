````markdown
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
````