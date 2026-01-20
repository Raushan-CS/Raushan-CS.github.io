# 3D Portfolio Website

A stunning, interactive 3D portfolio website built with **Three.js** and modern web technologies. Showcasing professional experience, projects, skills, and education with animated 3D backgrounds and smooth scrolling navigation.

## 🚀 Features

- **3D Interactive Background** - Animated particles and rotating geometric objects using Three.js
- **Responsive Design** - Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modern UI/UX** - Beautiful gradient designs, smooth animations, and glassmorphism effects
- **Smooth Navigation** - Seamless section scrolling with fixed navigation bar
- **Performance Optimized** - Optimized for fast loading and smooth 60fps animations
- **Mobile Friendly** - Reduced particle count and optimized rendering for mobile devices

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with gradients, animations, and flexbox/grid
- **JavaScript (Vanilla)** - No framework dependencies for lightweight performance
- **Three.js** - 3D graphics library for WebGL rendering

## 📁 Project Structure

```
3d-portfolio/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling
├── js/
│   └── main.js         # Three.js setup and interactions
├── assets/             # Images and other assets (optional)
├── README.md           # This file
└── .gitignore          # Git ignore file
```

## 🎯 Sections

1. **Home** - Hero section with introduction and CTA buttons
2. **Experience** - Work experience at Teya Health and Webnet Technologies
3. **Projects** - Featured projects with tech stack and descriptions
4. **Skills** - Technical skills organized by categories
5. **Education** - Educational background and languages
6. **Contact** - Contact information and social media links

## 💻 Installation & Setup

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Raushan-CS/3d-portfolio.git
   cd 3d-portfolio
   ```

2. **Open in browser:**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

### Customization

To customize the portfolio with your own content:

1. **Update Personal Info** in `index.html`:
   - Name, title, and description
   - Contact information
   - Social media links

2. **Modify Experience, Projects, and Skills** in the respective HTML sections

3. **Customize Colors** in `css/styles.css`:
   - Edit CSS variables in `:root` selector
   - Primary color: `--primary-color: #6366f1`
   - Secondary color: `--secondary-color: #8b5cf6`
   - Accent color: `--accent-color: #ec4899`

4. **Adjust 3D Elements** in `js/main.js`:
   - Particle count
   - Floating object quantity and size
   - Rotation speeds and lighting

## 🚀 GitHub Pages Deployment

### Deploy to GitHub Pages:

1. **Create a new repository** named `username.github.io` (replace `username` with your GitHub username)

2. **Push your files:**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/username/username.github.io.git
   git push -u origin main
   ```

3. **Your portfolio will be live** at `https://username.github.io`

### Alternative: Deploy from a Different Repository

If you want to deploy from a regular repository:

1. Create a repository: `portfolio`
2. In repository settings, enable GitHub Pages
3. Set the source branch to `main` and folder to `/(root)` or `/3d-portfolio`
4. Your site will be available at `https://username.github.io/portfolio`

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance Tips

- The Three.js scene automatically optimizes for mobile devices
- Particle count is reduced on mobile for better performance
- All animations use CSS transforms for GPU acceleration
- Images and assets should be optimized before adding

## 🎨 Customization Guide

### Changing Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #6366f1;    /* Main accent color */
    --secondary-color: #8b5cf6;  /* Gradient color */
    --accent-color: #ec4899;     /* Hover color */
    --dark-bg: #0f172a;          /* Dark background */
    --light-bg: #1e293b;         /* Lighter background */
}
```

### Adjusting 3D Background

In `js/main.js`, modify the `createParticles()` and `createFloatingObjects()` functions:

```javascript
const particleCount = 100;  // Increase for more particles
const pointLight = new THREE.PointLight(0x6366f1, 1);  // Change light color
```

## 📝 Content Tips

- Keep descriptions concise and impactful
- Use emojis in section headers for visual interest
- Add relevant tech badges to projects
- Include measurable achievements in work experience

## 🔧 Troubleshooting

**3D Background not showing?**
- Check browser console for errors
- Ensure Three.js CDN is accessible
- Try a different browser

**Layout looks broken on mobile?**
- Check viewport meta tag
- Clear browser cache
- Test on actual mobile device

**Animations are slow?**
- Reduce particle count in `js/main.js`
- Disable some floating objects
- Use Chrome DevTools Performance tab

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Three.js library
- Inspired by modern portfolio designs
- Built with ❤️ by Raushan Kumar

## 📧 Contact

- Email: raushankumargalaxy407@gmail.com
- LinkedIn: linkedin.com/in/raushancodes/
- GitHub: github.com/Raushan-CS

---

**Last Updated**: January 2025
