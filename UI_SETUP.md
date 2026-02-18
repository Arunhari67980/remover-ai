# UI Setup Guide - AI Background Remover React

This is a professional React-based UI for the AI Background Remover application. The UI is built with **React**, **Tailwind CSS**, and **Vite**.

## Project Structure

```
bg-remover-api/
├── ui/
│   ├── BackgroundRemoverUI.jsx      # Main React Component
│   ├── App.jsx                       # App Wrapper Component
│   ├── main.jsx                      # React Entry Point
│   ├── index.css                     # Tailwind CSS + Global Styles
│   ├── tailwind.config.js            # Tailwind Configuration
│   ├── postcss.config.js             # PostCSS Configuration
│   └── index.html                    # HTML Template
├── package.json                      # Dependencies
├── vite.config.js                    # Vite Configuration
├── main.py                           # Backend API
└── requirements.txt                  # Python Dependencies
```

## Installation

### 1. Install Node.js Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed (v16 or higher recommended).

```bash
npm install
```

### 2. Update API Configuration

Edit **`ui/BackgroundRemoverUI.jsx`** and update the API key:

```javascript
const API_URL = 'http://127.0.0.1:8000/remove-bg';
const API_KEY = 'your-actual-api-key-here'; // Replace with your API key
```

## Running the Applications

### Start the Backend Server

In one terminal window:

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn main:app --reload --port 8000
```

### Start the React Development Server

In another terminal window:

```bash
# Run the Vite development server
npm run dev
```

This will:
- Start the React app on `http://localhost:3000`
- Open it automatically in your default browser
- Enable hot module replacement (HMR) for instant updates

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This generates:
- Optimized JavaScript bundles
- Minified CSS
- Output in the `dist/` folder

To preview the production build locally:

```bash
npm run preview
```

## Features

✅ **Drag & Drop Upload** - Intuitive image upload with drag and drop support
✅ **Before/After Preview** - Side-by-side comparison of original and processed images
✅ **Real-time Processing** - Visual loading spinner during background removal
✅ **Download Results** - One-click download of processed images
✅ **Recent History** - Displays recently edited images
✅ **Pro CTA** - Upgrade banner for premium features
✅ **Bottom Navigation** - Mobile-first navigation bar
✅ **Responsive Design** - Mobile-optimized interface
✅ **Dark Mode Ready** - Tailwind CSS dark mode support
✅ **Smooth Animations** - Professional transitions and hover effects

## API Integration

The React component communicates with your FastAPI backend via:

```
POST http://127.0.0.1:8000/remove-bg
Headers: x-api-key: your-api-key-here
Body: { "image": "base64-encoded-image-string" }
```

### Expected Response
- Success (200): Binary image blob with transparent background (PNG)
- Error (4xx/5xx): JSON error message

## Tailwind CSS Configuration

The project uses a customized Tailwind configuration with:
- Custom color scheme (Primary Blue: `#2b6cee`)
- Custom border radius values
- Manrope font family
- Material Symbols icon support

See `tailwind.config.js` for full customization options.

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Material Symbols** - Icon library
- **PostCSS** - CSS processing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### CORS Issues
If you get CORS errors, make sure your FastAPI backend has CORS enabled:

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

### Port Already in Use
If port 3000 is busy, change it in `vite.config.js`:
```javascript
server: {
  port: 5173, // or any available port
}
```

### Module Not Found Errors
Ensure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

### Component Structure
- `BackgroundRemoverUI.jsx` - Main component with all UI logic
- `App.jsx` - App wrapper with global styles
- `main.jsx` - React DOM render

### State Management
The component uses React hooks (`useState`, `useRef`) for state management:
- `selectedImage` - Current selected file
- `previewImage` - Base64 image for preview
- `resultImage` - Processed image URL
- `loading` - Processing status
- `activeNav` - Active navigation tab

### Customization
To customize colors, update:
1. `tailwind.config.js` - Theme colors
2. `index.css` - Global styles
3. `BackgroundRemoverUI.jsx` - Component-specific styles

## Support & License

For issues or questions, refer to the main project documentation.

---

**Last Updated:** February 2026
