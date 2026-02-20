````markdown
# Frontend Deployment Guide

## Configure Frontend for External Backend

### Step 1: Update Environment Variables

Create `.env.production` file:

```env
# Production API endpoint
VITE_API_URL=https://remover-ai-api.onrender.com/remove-bg
VITE_API_KEY=your-production-api-key

# Or use different backends per environment
VITE_APP_ENV=production
```

Create `.env.development` file:

```env
# Local development
VITE_API_URL=http://localhost:8000/remove-bg
VITE_API_KEY=mysecretkey123
VITE_APP_ENV=development
```

Create `.env.staging` file:

```env
# Staging/Preview
VITE_API_URL=https://staging-api.onrender.com/remove-bg
VITE_API_KEY=staging-api-key
VITE_APP_ENV=staging
```

### Step 2: Update vercel.json

```json
{
  "buildCommand": "npm run build",
  "env": {
    "VITE_API_URL": "@vite_api_url",
    "VITE_API_KEY": "@vite_api_key"
  },
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Step 3: Deploy to Vercel

**Option A: Automatic (Easiest)**

1. Go to https://vercel.com/new
2. Import your `remover-ai` repo
3. Skip build settings (auto-detected)
4. Add Environment Variables:
   - `VITE_API_URL` = `https://remover-ai-api.onrender.com/remove-bg`
   - `VITE_API_KEY` = `your-api-key`
5. Click Deploy!

**Option B: Using Vercel CLI**

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Step 4: Update Frontend Code

The code already uses `import.meta.env.VITE_API_URL`, so no changes needed!

```javascript
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
```

## Environment Variables on Vercel

1. Go to Project Settings → Environment Variables
2. Add for each environment:

**Production:**
```
VITE_API_URL = https://remover-ai-api.onrender.com/remove-bg
VITE_API_KEY = prod-secret-key
```

**Preview (for pull requests):**
```
VITE_API_URL = https://staging-api.onrender.com/remove-bg
VITE_API_KEY = staging-secret-key
```

**Development (local only, in .env):**
```
VITE_API_URL = http://localhost:8000/remove-bg
VITE_API_KEY = dev-key
```

## Test the Setup

1. **Test backend locally:**
   ```bash
   cd remover-ai-backend
   uvicorn main:app --reload
   # Visit http://localhost:8000/docs
   ```

2. **Test frontend with local backend:**
   ```bash
   cd remover-ai
   npm run dev
   # Upload image and verify it works
   ```

3. **Test frontend with deployed backend:**
   - Update `.env` to point to your Render/Railway URL
   - Restart dev server
   - Test image upload

4. **After deployment:**
   - Visit https://remover-ai.vercel.app
   - Try uploading and removing background
   - Check browser console for any CORS errors

````