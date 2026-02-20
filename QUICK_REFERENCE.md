````markdown
# 🚀 QUICK REFERENCE - Copy & Paste Everything!

Keep this open while deploying! All commands and URLs you need.

---

## 🔧 PowerShell Commands (Copy & Paste)

### First Time Setup:

```powershell
cd "C:\Users\Arun\bg-remover-api"
git config --global user.name "Your Name"
git config --global user.email "your.email@gmail.com"
git init
git add .
git commit -m "Initial commit - Background Remover App"
```

### After GitHub Repo Created:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bg-remover-api.git
git push -u origin main
```

⚠️ Replace `YOUR_USERNAME` with your GitHub username!

---

## 📋 Copy These Exactly!

### Render - Build Command:
```
pip install -r backend/requirements.txt
```

### Render - Start Command:
```
uvicorn backend.main:app --host 0.0.0.0 --port $PORT
```

### Render - Environment Variables:

**Variable 1:**
```
Key: API_KEY
Value: my-secret-bg-remover-key-2026
```

**Variable 2:**
```
Key: ALLOWED_ORIGINS
Value: *
```

### Vercel - Environment Variables:

**Variable 1:**
```
VITE_API_URL = https://bg-remover-api-xxxxx.onrender.com/remove-bg
```
*(Replace `xxxxx` with your Render URL)*

**Variable 2:**
```
VITE_API_KEY = my-secret-bg-remover-key-2026
```
*(Same as Render API_KEY)*

### Render - Update CORS After Vercel Deploy:

```
ALLOWED_ORIGINS = https://bg-remover-api.vercel.app
```
*(Or your custom Vercel URL)*

---

## 🌐 All URLs You'll Need

| Step | URL | What to Do |
|------|-----|-----------|
| 1 | https://github.com | Create account |
| 1 | https://github.com/new | Create new repo |
| 3 | https://render.com | Create account |
| 3 | https://render.com/dashboard | View backend |
| 3 | `https://YOUR-BACKEND.onrender.com/docs` | Test backend |
| 4 | https://vercel.com | Create account |
| 4 | https://vercel.com/dashboard | View frontend |
| 4 | `https://YOUR-FRONTEND.vercel.app` | Test frontend |

---

## 📝 Fill-in Template

Use this to track your URLs:

```
===== MY DEPLOYMENT INFO =====

GitHub Username: _____________________
GitHub Repo: https://github.com/[USERNAME]/bg-remover-api

Render Backend URL: https://[YOUR-BACKEND].onrender.com
Render API Key: _____________________

Vercel Frontend URL: https://[YOUR-FRONTEND].vercel.app

My App Ready at: https://[YOUR-FRONTEND].vercel.app
```

---

## ⏱️ Timeline

| Step | Action | Time | Status |
|------|--------|------|--------|
| 1 | GitHub signup | 1 min | ⬜ |
| 2 | Upload code | 5 min | ⬜ |
| 3 | Deploy backend | 5 min + 2-3 min wait | ⬜ |
| 3 | Test backend | 1 min | ⬜ |
| 4 | Deploy frontend | 5 min + 2-3 min wait | ⬜ |
| 5 | Update CORS | 2 min + 1 min wait | ⬜ |
| 6 | Test app | 2 min | ⬜ |

**Total: 30 minutes**

---

## 🚨 Common Issues Quick Fixes

| Problem | Solution |
|---------|----------|
| **"Git not found"** | Download from git-scm.com/download/win |
| **"Push rejected"** | Make sure email+password are correct for GitHub |
| **"Backend says error"** | Check Render environment variables are set correctly |
| **"App shows API Error"** | Vercel env variables don't match Render - check both |
| **"CORS error in console"** | Update ALLOWED_ORIGINS in Render with Vercel URL |
| **"First upload slow (5-10s)"** | Normal! Free tier cold start. Speed up after. |
| **"App won't load"** | Wait 2 minutes after deploy, clear browser cache (Ctrl+Shift+Delete) |

---

## 🎬 Quick Video of What You'll See

### Step 1: Create GitHub Account
```
Visit github.com → Sign up → Verify email → Done
```

### Step 2: Upload Code
```
Open PowerShell → git init → git add . → git commit → git push → See on GitHub
```

### Step 3: Deploy Backend
```
Visit render.com → Sign up with GitHub → Create service → Fill form → Deploy → Wait → See live URL
```

### Step 4: Deploy Frontend
```
Visit vercel.com → Sign up with GitHub → Import repo → Add env vars → Deploy → See live URL
```

### Step 5: Update CORS
```
Go back to Render → Edit ALLOWED_ORIGINS → Save → Wait 1 min for auto-redeploy
```

### Step 6: Test
```
Open Vercel URL in browser → Upload image → See result → Share with friends! 🎉
```

---

## ✅ Final Verification Checklist

Before sharing your app, verify:

- [ ] Vercel URL loads in browser (you see the app)
- [ ] Upload button works
- [ ] Can select an image
- [ ] After upload, background is removed
- [ ] Can download the result
- [ ] No red errors in browser console (F12)
- [ ] No error messages on screen

If all ✅ = **You're ready to share!**

---

## 📤 How to Share Your App

Copy this message to friends:

```
Check out my Background Remover app!

👉 https://bg-remover-api.vercel.app

Just upload an image and it removes the background for you!
```

---

## 🔄 Update Your App Later

When you make changes:

```powershell
cd "C:\Users\Arun\bg-remover-api"
git add .
git commit -m "My changes"
git push
# Then wait 1-2 minutes, refresh browser!
```

That's it! No manual redeploy needed - both Vercel & Render auto-update.

---

## 📞 Quick Troubleshooting

### Backend not working?
1. Check Render logs: render.com/dashboard → select service → Logs tab
2. Look for error messages
3. Check the Start Command is 100% exact

### Frontend not loading?
1. Check Vercel logs: vercel.com/dashboard → select project → Deployments tab
2. Check environment variables are set
3. Clear browser cache (Ctrl+Shift+Delete)

### CORS error visible?
1. Go to Render backend
2. Click Environment
3. Update ALLOWED_ORIGINS with your exact Vercel URL
4. Wait 1 minute for auto-redeploy

---

## 💡 Pro Tips

✅ **Tip 1**: Keep your API_KEY secret! Don't share it in messages.

✅ **Tip 2**: If backend goes slow after 15 min of no use, it's sleeping (free tier). First request wakes it up.

✅ **Tip 3**: To make it faster, upgrade to paid tier (costs $7/month).

✅ **Tip 4**: GitHub → Vercel/Render auto-sync, so just push to GitHub.

✅ **Tip 5**: Share the **Vercel URL only**, not the secret backend API.

---

## 🎯 Success Indicators

**When should you see:**

- ✅ GitHub: Repository page with your code
- ✅ Render: "Your service is live" message + live URL
- ✅ Vercel: "✅ Deployment successful" + live URL
- ✅ App: Works perfectly when you test it

---

## 📚 Full Guides

If you get stuck:

- **Detailed guide**: [BEGINNER_DEPLOYMENT_GUIDE.md](./BEGINNER_DEPLOYMENT_GUIDE.md)
- **Step checklist**: [DEPLOYMENT_CHECKLIST_VISUAL.md](./DEPLOYMENT_CHECKLIST_VISUAL.md)
- **Technical docs**: [docs/](./docs/) folder

---

**You're going to do great! 💪**

This is simpler than it looks - just follow the steps, copy the commands, click the buttons.

**Time to deploy: 20-30 minutes**

**Questions while deploying? Read the detailed guide!**

Good luck! 🚀

````