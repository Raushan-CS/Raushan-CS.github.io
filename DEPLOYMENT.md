# GitHub Pages Deployment Guide

This guide will help you deploy your 3D portfolio to GitHub Pages.

## Step 1: Create a GitHub Account & Repository

If you don't have a GitHub account:
1. Go to https://github.com/signup
2. Create your account

## Step 2: Create a New Repository

### Option A: Username Repository (Recommended - Direct Domain)

1. Click the **+** icon in the top right corner
2. Select "New repository"
3. Name it: `username.github.io` (replace `username` with your actual GitHub username)
4. Select "Public"
5. Click "Create repository"

Your portfolio will be deployed to: `https://username.github.io`

### Option B: Regular Repository (Subfolder Path)

1. Create a repository named anything (e.g., `portfolio`)
2. Your portfolio will be deployed to: `https://username.github.io/portfolio`

## Step 3: Push Your Code to GitHub

### Using Git Command Line (Recommended)

1. **Navigate to your project folder:**
   ```bash
   cd c:\Users\raush\Coding\Portfolio\3d-portfolio
   ```

2. **Initialize git (if not already done):**
   ```bash
   git init
   ```

3. **Add all files:**
   ```bash
   git add .
   ```

4. **Create initial commit:**
   ```bash
   git commit -m "Initial portfolio commit"
   ```

5. **Rename branch to main (if needed):**
   ```bash
   git branch -M main
   ```

6. **Add remote repository:**
   ```bash
   git remote add origin https://github.com/username/username.github.io.git
   ```
   Replace `username` with your GitHub username

7. **Push to GitHub:**
   ```bash
   git push -u origin main
   ```

### Using GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. Click "File" → "Clone repository"
3. Find your repository
4. Click "Publish repository"
5. Use GitHub Desktop to commit and push changes

## Step 4: Enable GitHub Pages (If Using Regular Repository)

If using Option B:

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll down to "GitHub Pages"
4. Under "Source", select "main" branch
5. Select the folder: `/(root)` or `/3d-portfolio` depending on your structure
6. Click "Save"

## Step 5: Verify Your Portfolio is Live

1. Wait 1-2 minutes for GitHub to build and deploy
2. Visit your URL:
   - `https://username.github.io` (for username.github.io repository)
   - `https://username.github.io/portfolio` (for regular repository)

## Step 6: Update Your Portfolio

### Making Changes Locally

1. Edit files in your local folder
2. Commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

3. GitHub will automatically rebuild and deploy within 1-2 minutes

## Troubleshooting

### Portfolio not showing after push?

1. Wait 2-3 minutes for GitHub Pages to build
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check repository settings - ensure GitHub Pages is enabled
4. Go to repository → Actions tab to see build status

### Custom Domain (Optional)

If you want to use a custom domain:

1. Buy a domain (GoDaddy, Namecheap, etc.)
2. In your GitHub repository settings, scroll to "GitHub Pages"
3. Under "Custom domain", enter your domain
4. Follow the provider's DNS configuration guide
5. Add CNAME records pointing to `username.github.io`

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 404 error | Ensure repository name is correct; check GitHub Pages settings |
| Blank page | Check browser console for errors; verify all file paths are correct |
| Styling not loading | Clear cache; ensure CSS files are in the correct path |
| 3D background missing | Check Three.js CDN link; verify JavaScript file paths |
| Slow loading | Optimize images; reduce particle count in js/main.js |

## Git Commands Cheat Sheet

```bash
# Initial setup
git init
git add .
git commit -m "message"
git branch -M main
git remote add origin <URL>
git push -u origin main

# Future updates
git add .
git commit -m "message"
git push

# Check status
git status

# View history
git log --oneline

# Undo changes
git restore <filename>
git reset --hard HEAD
```

## Next Steps

After deploying:

1. **Update your resume** - Keep content fresh
2. **Add more projects** - Showcase your latest work
3. **Customize colors** - Modify CSS variables to match your brand
4. **Share your portfolio** - Add to LinkedIn, resume, and job applications
5. **Monitor analytics** - Use GitHub Insights and Google Analytics (optional)

## Support

For GitHub Pages documentation: https://docs.github.com/en/pages
For Three.js documentation: https://threejs.org/docs/

---

Your portfolio is now ready to showcase to the world! 🚀
