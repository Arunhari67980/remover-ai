# Complete Setup Guide - AI Background Remover React Project

This guide covers the complete setup for the full-stack AI Background Remover application.

## Prerequisites

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **Python** 3.8 or higher ([Download](https://www.python.org/))
- **Git** (optional, for version control)
- **npm** or **yarn** (comes with Node.js)
- **pip** (comes with Python)

## 📦 Installation Steps

### Step 1: Install Node.js Dependencies

```bash
# Navigate to project directory
cd bg-remover-api

# Install all npm packages
npm install
```

**What gets installed:**
- React 18
- Vite (build tool)
- Tailwind CSS
- PostCSS & Autoprefixer
- Other frontend dependencies

### Step 2: Install Python Dependencies

```bash
# Using pip (recommended)
pip install -r requirements.txt

# Or if you use pip3
pip3 install -r requirements.txt
```

**Key packages installed:**
- FastAPI
- Uvicorn (ASGI server)
- Pillow (image processing)
- Python-multipart (file uploads)
- CORS middleware
- Other backend dependencies

### Step 3: Setup Environment Variables

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your actual values
# Open .env in your text editor and update:
# - VITE_API_URL: Your backend API URL
# - VITE_API_KEY: Your actual API key
```

**Example .env file:**
```
VITE_API_URL=http://127.0.0.1:8000/remove-bg
VITE_API_KEY=your-secret-api-key-12345
VITE_APP_TITLE=Remover.AI
VITE_DEBUG=false
```

## 🚀 Running the Application

### Option 1: Run Frontend & Backend Separately (Recommended for Development)

#### Terminal 1 - Start React Development Server
```bash
# From project root
npm run dev

# The app will open at http://localhost:3000
# Hot reload is enabled - changes appear instantly
```

#### Terminal 2 - Start FastAPI Backend
```bash
# From project root
npm run backend

# Server runs on http://127.0.0.1:8000
# Docs available at http://127.0.0.1:8000/docs
```

### Option 2: Run Both Together

```bash
# This requires running in a background shell or using a process manager
npm run start
```

⚠️ **Note:** This may not work on all systems. Use Option 1 for reliable development.

### Option 3: Using Process Managers

#### Using concurrently (optional install)
```bash
npm install --save-dev concurrently

# Add to package.json scripts:
"dev:full": "concurrently \"npm run dev\" \"npm run backend\""

# Then run:
npm run dev:full
```

## 📂 Project Structure Explanation

```
bg-remover-api/
├── src/                          # React source code
│   ├── components/
│   │   └── BackgroundRemoverUI.jsx    # Main component
│   ├── assets/                   # Images, icons, etc.
│   ├── App.jsx                   # App wrapper
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── index.html                    # HTML entry point
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
├── package.json                  # Frontend dependencies
│
├── main.py                       # FastAPI backend
├── requirements.txt              # Python dependencies
│
├── .env                          # Environment variables (create this)
├── .env.example                  # Example env file
├── .gitignore                    # Git ignore rules
├── .eslintrc.json                # Linting rules
├── .prettierrc.json              # Code formatting rules
│
├── README.md                     # Main documentation
└── SETUP.md                      # This file
```

## 🌐 Accessing the Application

Once running:

| Service | URL | Purpose |
|---------|-----|---------|
| React App | http://localhost:3000 | Main UI |
| FastAPI Docs | http://127.0.0.1:8000/docs | Interactive API documentation |
| FastAPI ReDoc | http://127.0.0.1:8000/redoc | Alternative API docs |

## 🛠️ Available Commands

```bash
# Frontend Commands
npm run dev              # Start dev server (port 3000)
npm run dev:host        # Start on all interfaces
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Check code quality
npm run format          # Auto-format code

# Backend Commands
npm run backend         # Start FastAPI server

# Combined
npm run start          # Start both (may not work on all systems)
```

## ⚙️ Configuration

### Changing the Port

**React (Port 3000)**
Edit `vite.config.js`:
```javascript
server: {
  port: 5173  // Change to desired port
}
```

**FastAPI (Port 8000)**
```bash
npm run backend -- --port 8001  # Start on port 8001
```

### Updating API Configuration

Edit `.env`:
```
VITE_API_URL=http://your-api-domain:port/remove-bg
VITE_API_KEY=your-new-api-key
```

### Adding CORS for Different Domains

Edit `main.py` CORS configuration:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🔨 Building for Production

### Frontend Build

```bash
# Create optimized production build
npm run build

# Output is in the dist/ folder
# Ready to deploy to any static hosting
```

### Backend Deployment

For production, use a production ASGI server:

```bash
# Using Gunicorn + Uvicorn (recommended)
pip install gunicorn

# Run with 4 workers
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker

# Or using Uvicorn with SSL
uvicorn main:app --ssl-keyfile=key.pem --ssl-certfile=cert.pem
```

## 🧪 Testing & Development

### Frontend Testing

```bash
# Lint code
npm run lint

# Format code
npm run format

# Check built size
npm run build -- --report
```

### Backend Testing

```bash
# Test API with curl
curl -X POST http://127.0.0.1:8000/remove-bg \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{"image":"data:image/png;base64,..."}'

# Or use the interactive docs at http://127.0.0.1:8000/docs
```

## 🐛 Common Issues & Solutions

### 1. Port Already in Use

**Error:** `Address already in use`

**Solution:**
```bash
# Find what's using the port (macOS/Linux)
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
npm run dev -- --port 5173
```

### 2. Module Not Found

**Error:** `Cannot find module 'react'`

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 3. CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Ensure backend is running: `npm run backend`
- Check `.env` has correct `VITE_API_URL`
- Verify CORS is enabled in `main.py`

### 4. Environment Variables Not Loading

**Error:** Variables undefined in React

**Solution:**
1. Check `.env` file exists in root directory
2. Variables must start with `VITE_` prefix
3. Restart dev server after changing `.env`
4. Clear browser cache and localStorage

### 5. Python Package Installation Issues

**Error:** `pip: command not found`

**Solution:**
```bash
# Try python3
python3 -m pip install -r requirements.txt

# Or update pip
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

## 📱 Development Tips

### Hot Module Reload (HMR)
React changes automatically reload without losing state. This is enabled by default in `npm run dev`.

### Debug Mode
Enable debug logging in `.env`:
```
VITE_DEBUG=true
```

### Browser DevTools
- Use React Developer Tools Chrome Extension
- Monitor Network tab for API calls
- Check Console for errors

### FastAPI Interactive Docs
Visit `http://127.0.0.1:8000/docs` to:
- Test API endpoints
- View request/response schemas
- Check authentication headers

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [FastAPI Docs](https://fastapi.tiangolo.com)
- [MDN Web Docs](https://developer.mozilla.org)

## ✅ Verification Checklist

Before deploying, verify:

- [ ] Node.js v16+ installed: `node --version`
- [ ] Python 3.8+ installed: `python --version`
- [ ] npm dependencies installed: `npm ls`
- [ ] Python packages installed: `pip list`
- [ ] `.env` file created and configured
- [ ] Frontend starts: `npm run dev`
- [ ] Backend starts: `npm run backend`
- [ ] API responds: Check `http://127.0.0.1:8000/docs`
- [ ] UI loads: Check `http://localhost:3000`
- [ ] File upload works
- [ ] API calls succeed (check console and network tabs)

## 🚀 Next Steps

1. **Customize UI**: Edit `src/components/BackgroundRemoverUI.jsx`
2. **Update Colors**: Edit `tailwind.config.js`
3. **Configure Backend**: Edit `main.py`
4. **Add Features**: Create new components in `src/components/`
5. **Deploy**: Build and host on your server

## 📞 Support & Troubleshooting

For detailed troubleshooting, see the main [README.md](README.md)

---

**Last Updated:** February 18, 2026
