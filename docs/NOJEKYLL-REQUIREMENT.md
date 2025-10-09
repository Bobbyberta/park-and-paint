# .nojekyll File Requirement for GitHub Pages + Vite

## ⚠️ CRITICAL: Why This File is Required

When deploying a Vite-built site to GitHub Pages, the `.nojekyll` file is **absolutely essential**. Without it, your entire site will break.

## 🚨 Symptoms Without .nojekyll

If the `.nojekyll` file is missing from your deployment, you will see:

```
❌ GET https://parkandpaint.co.uk/images/hero-bg.jpg 404 (Not Found)
❌ GET https://parkandpaint.co.uk/favicon.ico 404 (Not Found)
❌ Uncaught TypeError: Failed to resolve module specifier "alpinejs"
❌ Site appears completely broken with no styling
❌ No images load
❌ JavaScript functionality doesn't work
❌ Maps don't display
```

**The site will appear completely broken to visitors.**

## 🔧 Why This Happens

1. **GitHub Pages uses Jekyll by default** to process static sites
2. **Jekyll ignores certain files/folders**, especially those starting with `_`
3. **Vite generates modern build outputs** that Jekyll misinterprets
4. **The `.nojekyll` file tells GitHub Pages**: "Skip Jekyll processing entirely"

## ✅ The Solution

### For This Project (Already Implemented)

The `.nojekyll` file is automatically created during deployment by our GitHub Actions workflow:

**File:** `.github/workflows/deploy.yml`

```yaml
- name: Build
  run: npm run build

# CRITICAL: This step is REQUIRED for GitHub Pages + Vite deployments
# Without .nojekyll, GitHub Pages uses Jekyll processing which breaks the site
# Symptoms: 404 errors for images, CSS, JS, and module resolution failures
# DO NOT REMOVE THIS STEP - See docs/DEPLOYMENT.md for details
- name: Create .nojekyll file
  run: touch dist/.nojekyll

- name: Setup Pages
  uses: actions/configure-pages@v4
```

### ⚠️ NEVER REMOVE THIS STEP

This step must remain in the workflow. Removing it will break the entire deployed site.

## 🔍 How to Verify

### Before Deployment

Check that `.github/workflows/deploy.yml` contains the `.nojekyll` creation step:

```bash
grep -A 2 "Create .nojekyll" .github/workflows/deploy.yml
```

### After Deployment

1. Wait for GitHub Actions to complete (check: https://github.com/Bobbyberta/park-and-paint/actions)
2. Visit your site: https://www.parkandpaint.co.uk
3. Open browser DevTools (F12) → Console tab
4. Check for errors:
   - ✅ **No errors** = .nojekyll is working
   - ❌ **404 errors for assets** = .nojekyll is missing

### Manual Verification

You can check if the file exists in your deployment:

```bash
# After deployment, check GitHub Pages source
# The .nojekyll file should be at the root of your deployed site
# You can't directly view it, but its presence is confirmed by working assets
```

## 🛠️ Troubleshooting

### Problem: Site Broken After Deployment

**Check:**
1. Go to: https://github.com/Bobbyberta/park-and-paint/actions
2. Click on the latest workflow run
3. Expand the "Build" job
4. Look for "Create .nojekyll file" step
5. Verify it ran successfully

**Fix if missing:**
1. Open `.github/workflows/deploy.yml`
2. Add the `.nojekyll` creation step after the build step:
   ```yaml
   - name: Create .nojekyll file
     run: touch dist/.nojekyll
   ```
3. Commit and push changes
4. Wait for redeployment (~2-5 minutes)
5. Clear browser cache and test

### Problem: Workflow Has the Step But Site Still Broken

**Possible causes:**
1. Wrong `base` path in `vite.config.js` (should be `'/'` for custom domains)
2. DNS configuration issues
3. Browser cache (try incognito mode)
4. CDN propagation delay (wait 10-15 minutes)

**Quick test:**
```bash
# Build locally and check
npm run build
ls -la dist/.nojekyll  # File should NOT exist (created by workflow)

# The workflow creates it, not Vite
```

## 📚 Related Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment guide
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
- [README.md](../README.md) - Project overview

## 🎯 Key Takeaways

1. ✅ `.nojekyll` is **required** for Vite + GitHub Pages
2. ✅ It's created **automatically** by the GitHub Actions workflow
3. ✅ The workflow step must **never be removed**
4. ✅ Without it, the **entire site breaks**
5. ✅ Always verify the step exists before modifying the workflow

## 📧 Questions?

If you encounter issues related to `.nojekyll`:
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for troubleshooting steps
- Review GitHub Actions logs for errors
- Contact: stuart@parkandpaint.co.uk

---

**Last Updated:** October 9, 2025  
**Status:** Active - Critical Requirement

