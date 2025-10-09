# URGENT: GitHub Pages Configuration Issue

## Problem Identified

Your GitHub Actions workflow is correct, but **GitHub Pages is deploying from the wrong source**.

Currently deploying: **Repository root files** (unbuilt source)  
Should deploy: **GitHub Actions artifact** (built dist/ folder)

## Evidence

```bash
# Live site has SOURCE files, not BUILT files:
curl https://parkandpaint.co.uk/ | grep -o 'src="/src/main.js"'
# Returns: src="/src/main.js"  ← This is the SOURCE file!

# Built version should have:
# src="/assets/index-YwDCR4tM.js"  ← This is the BUILT bundle
```

## Fix: Update GitHub Pages Settings

### Step 1: Go to Repository Settings
1. Visit: https://github.com/Bobbyberta/park-and-paint/settings/pages
2. You should see a "Build and deployment" section

### Step 2: Verify Source Configuration
**Current (WRONG):**
- Source: "Deploy from a branch"
- Branch: main / (root) or main / docs

**Required (CORRECT):**
- Source: **"GitHub Actions"**

### Step 3: Change to GitHub Actions
1. Click the **Source** dropdown
2. Select **"GitHub Actions"**
3. Click **Save** (if there's a save button)

### Step 4: Verify Custom Domain
1. In the same settings page, check "Custom domain" field
2. It should say: `parkandpaint.co.uk` (without www, without https://)
3. Wait for DNS check to complete (green checkmark)
4. Enable "Enforce HTTPS" if available

### Step 5: Trigger Redeployment
After changing the source to "GitHub Actions":

```bash
# Option 1: Make a small change and push
git commit --allow-empty -m "trigger: force redeployment with correct source"
git push origin main

# Option 2: Manually trigger workflow
# Go to: https://github.com/Bobbyberta/park-and-paint/actions
# Click "Deploy to GitHub Pages" → "Run workflow" → "Run workflow"
```

### Step 6: Wait and Verify
1. Wait 2-5 minutes for deployment
2. Check Actions tab: https://github.com/Bobbyberta/park-and-paint/actions
3. Wait for green checkmark ✓
4. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
5. Test site in incognito mode

## Verification Commands

After deployment completes:

```bash
# Check if .nojekyll exists (should return 200, not 404)
curl -I https://parkandpaint.co.uk/.nojekyll

# Check if built assets exist
curl -I https://parkandpaint.co.uk/assets/index-YwDCR4tM.js

# Check if images exist  
curl -I https://parkandpaint.co.uk/images/hero-bg.jpg

# Verify HTML has built bundle references
curl https://parkandpaint.co.uk/ | grep 'assets/index'
# Should return: href="/assets/index-DePsuika.css" and src="/assets/index-YwDCR4tM.js"
```

## Why This Happened

GitHub Pages has two deployment methods:
1. **Deploy from a branch** - Serves files directly from repository
2. **GitHub Actions** - Serves files from workflow artifact

Your workflow was correctly building and uploading the `dist/` folder, but GitHub Pages was configured to serve from the branch instead of the Actions artifact.

## Expected Results After Fix

✅ Images load correctly  
✅ CSS applies  
✅ JavaScript works  
✅ Map displays  
✅ No 404 errors  
✅ No module resolution errors  

---

**Created:** October 9, 2025  
**Status:** Awaiting GitHub Pages settings update

