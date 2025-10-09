# Quick Start Guide

Get your Park & Paint website up and running in 5 minutes! 🚀

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- Vite (build tool)
- Tailwind CSS (styling)
- Alpine.js (interactivity)
- Leaflet.js (maps)
- ESLint & Prettier (code quality)

## Step 2: Start Development Server

```bash
npm run dev
```

Your site will be available at `http://localhost:3000`

## Step 3: Customize Your Site

### Update Contact Information

Edit `index.html` and replace placeholder contact details:

```html
<!-- Search for these placeholders: -->
+44 XXX XXX XXXX          → Your phone number
info@parkandpaint.co.uk   → Your email
Your Street Address       → Your actual address
```

### Add Service Locations

Edit `src/main.js` around line 55 to add your actual service locations:

```javascript
const locations = [
  {
    name: 'Your Office Name',
    coords: [latitude, longitude],  // Get from Google Maps
    description: 'Service area description',
    phone: '+44 XXX XXX XXXX',
  },
  // Add more locations...
];
```

### Customize Colors

Edit `tailwind.config.js` to match your brand:

```javascript
colors: {
  primary: {
    500: '#YOUR_COLOR',  // Main brand color
    600: '#YOUR_COLOR',  // Darker shade
    // etc.
  }
}
```

### Add Your Logo

Replace the text logo in `index.html` (around line 90) with an image:

```html
<a href="/" class="flex items-center">
  <img src="/images/logo.png" alt="Park & Paint Logo" class="h-10">
</a>
```

## Step 4: Add Images

1. Place your images in `public/images/`
2. Reference them in HTML:

```html
<img src="/images/your-image.jpg" alt="Descriptive text">
```

**Important**: Always add descriptive alt text for accessibility!

## Step 5: Test Your Site

### Run Checks

```bash
# Check for code issues
npm run lint

# Format code
npm run format

# Build for production
npm run build
```

### Manual Testing

- ✅ Test on mobile (320px width minimum)
- ✅ Test navigation menu
- ✅ Try keyboard navigation (Tab key)
- ✅ Check map markers work

### Performance Check

1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Run audit
4. Target: 90+ scores across the board

## Step 6: Deploy to GitHub Pages

### ⚠️ CRITICAL: Before First Deployment

**The GitHub Actions workflow MUST include a step to create `.nojekyll` in the `dist/` directory.**

Check that `.github/workflows/deploy.yml` contains:
```yaml
- name: Create .nojekyll file
  run: touch dist/.nojekyll
```

**Why this is critical:**
- Without `.nojekyll`, GitHub Pages uses Jekyll processing
- Jekyll breaks Vite builds causing 404 errors for ALL assets
- Your site will appear completely broken (no images, CSS, or JS)
- **This is the #1 cause of deployment failures**

### First Time Setup

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository, then:
git remote add origin https://github.com/yourusername/park-and-paint.git
git branch -M main
git push -u origin main
```

### Enable GitHub Pages

1. Go to repository **Settings**
2. Click **Pages** in sidebar
3. Under **Source**, select **GitHub Actions**
4. Done! Your site will deploy automatically on every push

### Add Custom Domain (Optional)

1. In GitHub Pages settings, add your domain
2. Create `public/CNAME` file:

```
www.parkandpaint.co.uk
```

3. Update DNS settings with your domain provider:

```
Type: CNAME
Name: www
Value: yourusername.github.io
```

4. Update `vite.config.js`:

```javascript
base: '/',  // For custom domain
```

5. **Verify deployment files:**

```bash
# After building, check these files exist in dist/:
npm run build
ls -la dist/.nojekyll  # Must exist
ls -la dist/CNAME      # Must exist if using custom domain
```

## Common Tasks

### Update Dependencies

```bash
npm outdated      # Check for updates
npm update        # Update packages
```

### Add New Section

1. Add section HTML in `index.html`
2. Add navigation link in header
3. Update footer links
4. Style with Tailwind classes

### Troubleshooting

**Site broken after deployment? (404 errors, no CSS, module errors)**
- **Most common cause:** Missing `.nojekyll` creation step in GitHub Actions workflow
- **DO NOT** just create `public/.nojekyll` - it won't be copied to `dist/` by Vite
- **Solution:** Verify `.github/workflows/deploy.yml` has the `.nojekyll` creation step:
  ```yaml
  - name: Create .nojekyll file
    run: touch dist/.nojekyll
  ```
- If missing, add this step after the build step and before the deploy step
- Commit, push, and wait for redeployment
- See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed fix

**Map not showing?**
- Check browser console for errors
- Verify Leaflet CSS is loaded
- Ensure map container has height

**Build failing?**
- Run `npm install` again
- Delete `node_modules` and reinstall
- Check Node.js version (need v18+)

**Images not loading?**
- First check: Is `.nojekyll` in `public/` folder?
- Verify images are in `public/` folder
- Use absolute paths: `/images/pic.jpg`
- Check file names match exactly

## Next Steps

Once your site is running:

1. ✅ Update all placeholder content
2. ✅ Add real service locations to map
3. ✅ Upload your images
4. ✅ Set up Google Analytics (optional)
5. ✅ Submit sitemap to Google Search Console
7. ✅ Test on real devices
8. ✅ Get feedback from users

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Alpine.js Docs](https://alpinejs.dev/)
- [Leaflet.js Docs](https://leafletjs.com/reference.html)
- [Vite Docs](https://vitejs.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Need Help?

- 📖 Check [README.md](../README.md) for detailed docs
- 🤝 See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines
- 🐛 Open an issue on GitHub
- 📧 Email: info@parkandpaint.co.uk

Happy coding! 🎉

