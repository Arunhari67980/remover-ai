# AI Background Remover - Full Stack Application

A professional, full-featured AI Background Remover application built with **React + Tailwind CSS** frontend and **FastAPI** backend.

## 🎯 Features

✨ **Frontend (React)**
- Modern, responsive UI built with React 18
- Tailwind CSS for professional styling
- Drag & drop image upload
- Real-time image preview
- Before/after image comparison
- Loading spinner during processing
- Download processed images
- Recent history carousel
- Pro upgrade CTA
- Mobile-first responsive design
- Material Symbols icons

🔧 **Backend (FastAPI)**
- High-performance image processing API
- Background removal using AI
- API key authentication
- CORS enabled
- Async/await support
- Comprehensive error handling

## 📁 Project Structure

```
bg-remover-api/
├── src/
│   ├── components/
│   │   └── BackgroundRemoverUI.jsx      # Main UI Component
│   ├── assets/                           # Static assets
│   ├── App.jsx                           # App wrapper
│   ├── main.jsx                          # React entry point
│   └── index.css                         # Global styles + Tailwind
├── public/                               # Static files (public)
├── index.html                            # HTML template
├── package.json                          # NPM dependencies
├── tailwind.config.js                    # Tailwind configuration
├── postcss.config.js                     # PostCSS configuration
├── vite.config.js                        # Vite build config
├── .env                                  # Environment variables
├── .env.example                          # Example env file
├── main.py                               # FastAPI backend
├── requirements.txt                      # Python dependencies
├── UI_SETUP.md                           # UI setup guide
└── README.md                             # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16+ (for React)
- **Python** 3.8+ (for FastAPI)
- **npm** or **yarn** (for package management)

### 1. Clone or Set Up the Project

```bash
cd bg-remover-api
```

### 2. Install Dependencies

#### Frontend (React)
```bash
npm install
```

#### Backend (Python)
```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update:

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://127.0.0.1:8000/remove-bg
VITE_API_KEY=your-actual-api-key-here
```

### 4. Run the Application

#### Terminal 1 - Start Backend Server
```bash
npm run backend
# or
uvicorn main:app --reload --port 8000
```

#### Terminal 2 - Start React Development Server
```bash
npm run dev
```

The application will automatically open at `http://localhost:3000`

## 📦 Available NPM Scripts

```bash
# Development
npm run dev              # Start React dev server (port 3000)
npm run dev:host        # Start on all network interfaces
npm run backend         # Start FastAPI server (port 8000)

# Production
npm run build           # Build optimized production bundle
npm run preview         # Preview production build locally

# Code Quality
npm run lint            # Lint JavaScript/JSX files
npm run format          # Format code with Prettier

# Combined
npm run start          # Start both frontend and backend
```

## 🔌 API Integration

### Request Format

```javascript
POST http://127.0.0.1:8000/remove-bg
Headers:
  - Content-Type: application/json
  - x-api-key: your-api-key-here

Body:
{
  "image": "data:image/png;base64,..."
}
```

### Response Format

**Success (200 OK)**
```
Binary PNG image with removed background
Content-Type: image/png
```

**Error (4xx/5xx)**
```json
{
  "detail": "Error message describing what went wrong"
}
```

## ⚙️ Configuration

### Tailwind CSS Customization

Edit `tailwind.config.js` to customize:
- Colors (primary, success, backgrounds)
- Font families (Manrope)
- Border radius values
- Breakpoints
- Animations

### Vite Configuration

Edit `vite.config.js` to modify:
- Dev server port (default: 3000)
- Build output directory (default: dist)
- Environment variables
- Plugin settings

### FastAPI Settings

Edit `main.py` to configure:
- API endpoints
- CORS settings
- Authentication
- File upload limits
- Processing parameters

## 🎨 Customization Guide

### Change Primary Color
1. Edit `tailwind.config.js`:
   ```javascript
   primary: '#your-color-code'
   ```
2. Edit `src/index.css`:
   ```css
   --primary: #your-color-code;
   ```

### Change App Title
- Edit `index.html` `<title>` tag
- Edit `package.json` `"name"` field
- Update `.env` `VITE_APP_TITLE`

### Add New Components
1. Create component in `src/components/`
2. Import in `src/App.jsx`
3. Use component in JSX

### Modify UI Layout
Edit `src/components/BackgroundRemoverUI.jsx` to:
- Change grid layouts
- Move buttons
- Adjust spacing (padding, margins)
- Update colors and styles

## 🐛 Troubleshooting

### Port Already in Use

**Port 3000 (React Dev Server)**
```bash
# Change in vite.config.js
server: {
  port: 5173,  // Using different port
}
```

**Port 8000 (FastAPI)**
```bash
uvicorn main:app --reload --port 8001
```

### CORS Errors

Make sure FastAPI backend has CORS enabled:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Python cache
pip install --upgrade pip
pip install -r requirements.txt
```

### Environment Variables Not Loading

Ensure:
1. `.env` file exists in project root
2. Variables prefixed with `VITE_` for frontend
3. Restart dev server after changing `.env`

## 📱 Responsive Breakpoints

The UI is optimized for:
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

## 🔐 Security Considerations

1. **API Key**: Keep your API key secure
   - Never commit `.env` to version control
   - Use strong, unique keys
   - Rotate keys periodically

2. **File Uploads**: Validate all uploads
   - Check file size limits
   - Validate file types
   - Scan for malicious content

3. **CORS**: Configure appropriately
   - Restrict origins in production
   - Use environment-specific settings

## 📊 Performance Optimization

### Frontend
- Code splitting with Vite
- Lazy loading components
- Image optimization
- CSS minification

### Backend
- Async request handling
- Efficient image processing
- Response caching
- Database indexing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 📞 Support

For issues, questions, or suggestions:
1. Check existing documentation
2. Review error messages and logs
3. Check `.env` configuration
4. Verify backend is running
5. Clear cache and reinstall dependencies

## 🔄 Version History

**v1.0.0** (February 2026)
- Initial release
- React + FastAPI integration
- Professional UI with Tailwind CSS
- Full image processing pipeline

---

**Last Updated:** February 18, 2026

Made with ❤️ using React, FastAPI, and Tailwind CSS
