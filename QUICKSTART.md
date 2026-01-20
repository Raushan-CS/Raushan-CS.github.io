# Quick Start Guide

Get your 3D portfolio running in 2 minutes!

## 🚀 Quick Setup

### Option 1: Run Locally (Fastest)

1. **Navigate to the project folder:**
   ```bash
   cd 3d-portfolio
   ```

2. **Start a local server:**
   ```bash
   python -m http.server 8000
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

Done! Your portfolio is now running! 🎉

### Option 2: Open Directly

Simply **double-click `index.html`** to open it in your default browser.

## 🌐 Deploy to GitHub (Next Step)

Ready to go live? Follow [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions to host on GitHub Pages (FREE!).

## 🎨 Customize Your Portfolio

### Change Your Information

Edit `index.html` and update:
- Your name and title
- Work experience details
- Project descriptions
- Contact information
- Social media links

### Customize Colors

Edit `css/styles.css` and change these variables:

```css
:root {
    --primary-color: #6366f1;    /* Main color */
    --secondary-color: #8b5cf6;  /* Gradient */
    --accent-color: #ec4899;     /* Hover effects */
}
```

### Adjust 3D Background

Edit `js/main.js`:

```javascript
const particleCount = 100;  // More = prettier but slower
// Adjust lighting, object quantity, etc.
```

## 📋 File Overview

| File | Purpose |
|------|---------|
| `index.html` | Main content structure |
| `css/styles.css` | All styling and animations |
| `js/main.js` | 3D background with Three.js |
| `README.md` | Full documentation |
| `DEPLOYMENT.md` | How to deploy to GitHub |
| `package.json` | Project metadata |

## ✨ Features

✅ **3D Animated Background** - Particles and floating objects  
✅ **Fully Responsive** - Works on mobile, tablet, desktop  
✅ **Modern Design** - Gradients, glassmorphism, smooth animations  
✅ **No Dependencies** - Pure HTML/CSS/JavaScript  
✅ **Fast Loading** - Lightweight and optimized  
✅ **Easy to Deploy** - One-click GitHub Pages setup  

## 🎯 Next Steps

1. ✅ View locally
2. ✅ Customize content
3. ✅ Follow DEPLOYMENT.md to go live
4. ✅ Share your portfolio!

## 💡 Pro Tips

- **Mobile Preview**: Use browser DevTools (F12) → Toggle device toolbar
- **Color Inspiration**: Try https://coolors.co for color schemes
- **Emoji Add-ons**: Enhance sections with relevant emojis
- **Performance**: Remove unneeded objects in js/main.js for faster loading
- **Analytics**: Add Google Analytics after deployment

## 🆘 Need Help?

- Three.js docs: https://threejs.org/docs/
- GitHub Pages: https://docs.github.com/en/pages
- CSS tricks: https://css-tricks.com/

## 🚀 Ready to Deploy?

Open [DEPLOYMENT.md](DEPLOYMENT.md) for detailed GitHub Pages setup instructions!

---

**Last Updated**: January 2025  
**Built with**: HTML5 | CSS3 | JavaScript | Three.js
