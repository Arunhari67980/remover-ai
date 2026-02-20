````markdown
# 📁 Project Structure Guide

This document outlines the new organized structure of the AI Background Remover project.

## 🗂️ Complete Directory Structure

```
bg-remover-api/
│
├── 📂 src/                          # React Frontend (all JS/CSS/JSX)
│   ├── components/
│   │   └── BackgroundRemoverUI.jsx  # Main UI component
│   ├── assets/                      # Images, icons, static assets
│   ├── App.jsx                      # Root React component
│   ├── main.jsx                     # React entry point
│   ├── index.css                    # Global Tailwind styles
│   └── index.html                   # (in root, not here)
│
├── 📂 backend/                      # Python FastAPI Backend
│   ├── main.py                      # FastAPI server
│   └── requirements.txt             # Python dependencies
│
├── 📂 public/                       # Static files served as-is
│   └── favicon.ico
│
├── 📂 docs/                         # 📚 Documentation (NEW!)
│   ├── DEPLOY_NOW.md                # Quick 15-minute deployment
│   ├── DEPLOYMENT_CHECKLIST.md      # Pre-deployment checklist
│   ├── DEPLOYMENT_CONFIG.md         # Configuration reference
│   ├── DEPLOYMENT_GUIDE.md          # Backend/frontend deployment
│   ├── FRONTEND_DEPLOYMENT.md       # Vercel deployment guide
│   ├── HOSTING_GUIDE.md             # Complete hosting guide
│   ├── FIXES.md                     # Known issues & fixes
│   ├── UI_REDESIGN.md               # UI improvements
│   └── PROJECT_CONVERSION.md        # Project conversion notes
│
├── 📂 node_modules/                 # NPM packages (auto-generated)
│
├── 📂 dist/                         # Build output (auto-generated)
│
├── 📂 __pycache__/                  # Python cache (auto-generated)
│
├── 📂 venv/                         # Python virtual env (optional)
│
├── 📄 Configuration Files
│   ├── index.html                   # 🌐 Main HTML entry point
│   ├── package.json                 # NPM configuration
│   ├── vite.config.js               # Vite build config
│   ├── tailwind.config.js           # Tailwind theme config
│   ├── postcss.config.js            # CSS processing config
│   ├── .eslintrc.json               # Linting rules
│   ├── .prettierrc.json             # Code formatting
│   ├── netlify.toml                 # Netlify deploy config
│   ├── vercel.json                  # Vercel deploy config
│   └── .gitignore                   # Git ignore rules
│
├── 📄 Environment Files
│   ├── .env                         # Local environment vars
│   └── .env.example                 # Example template
│
├── 📄 Root Documentation
│   ├── README.md                    # Main project README
│   └── SETUP.md                     # Setup instructions
│
└── 📄 Git
    └── .git/                        # Version control
```

---

## 📦 Dependencies

### Frontend (npm packages)
Located in `package.json`:
- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **PostCSS** - CSS processing
- **ESLint** - Code quality
- **Prettier** - Code formatting

### Backend (Python packages)
Located in `backend/requirements.txt`:
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **Pillow** - Image processing
- **rembg** - Background removal AI
- **python-dotenv** - Environment variables

---

## 🚀 Development Workflow

### Frontend Development
```bash
# Start dev server (port 3000)
npm run dev

# Build for production
npm run build

# Preview prod build
npm run preview

# Linting
npm run lint

# Format code
npm run format
```

### Backend Development
```bash
# Start FastAPI server (port 8000)
npm run backend

# Or directly with uvicorn
uvicorn backend.main:app --reload --port 8000
```

---

## 📄 Important Configuration Files

### `index.html` (Root Level)
Main HTML entry point. Contains:
- Meta tags
- Font imports (Manrope)
- Material Symbols
- Root div for React
- Script reference to `src/main.jsx`

### `vite.config.js`
Vite build configuration:
- Dev server port (3000)
- Build output (dist/)
- Preview settings

### `tailwind.config.js`
Tailwind CSS theme customization:
- Primary colors (#2b6cee)
- Custom fonts
- Border radius
- Dark mode support

### `package.json`
NPM configuration with:
- Dependencies
- Dev scripts
- Metadata

### `backend/main.py`
FastAPI server with:
- `/remove-bg` endpoint
- CORS configuration
- API key authentication
- Image processing

---

## 🌐 Environment Variables

### `.env` (Development)
```
VITE_API_URL=http://localhost:8000/remove-bg
VITE_API_KEY=mysecretkey123
```

### `.env.production` (Production)
```
VITE_API_URL=https://your-backend.onrender.com/remove-bg
VITE_API_KEY=your-production-key
```

---

## 📚 Documentation

Visit `/docs/` folder for:
- **Deployment guides** - How to deploy to Vercel/Render
- **Configuration reference** - Detailed settings
- **Troubleshooting** - Known issues and fixes
- **UI documentation** - Design system details

---

## 🏗️ Build & Deployment

### Development
```bash
# Install deps
npm install
pip install -r backend/requirements.txt

# Start servers
npm run dev        # Terminal 1
npm run backend    # Terminal 2
```

### Production
```bash
# Build frontend
npm run build      # Creates dist/

# Deploy dist/ to Vercel
# Deploy backend/ to Render
```

---

## 🗑️ Cleanup Notes

The following redundant items should be removed manually:
- ❌ `ui/` folder (duplicate React setup)
- ❌ `src/index.html` (keep root level index.html)
- ❌ Root `main.py` (now in `backend/`)
- ❌ Root `requirements.txt` (now in `backend/`)

---

## ✅ Structure Benefits

✅ **Clean separation** - Frontend/backend in separate folders
✅ **Organized docs** - All deployment guides in one place
✅ **Standard layout** - Follows Vite/React best practices
✅ **Scalable** - Easy to add more backend routes
✅ **Professional** - Production-ready structure

---

## 🔗 Quick Links

- **Frontend**: `src/`
- **Backend**: `backend/`
- **Docs**: `docs/`
- **Config**: Root level
- **Main entry**: `index.html`

---

**Last Updated**: February 20, 2026

````