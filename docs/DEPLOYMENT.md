# Deployment Documentation

This document contains all information about hosting, domain management, and deployment for the Park and Paint website.

---

## ⚠️ CRITICAL REQUIREMENTS

### 1. GitHub Pages Source Configuration

**MOST COMMON ISSUE:** GitHub Pages must be configured to deploy from "GitHub Actions", not "Deploy from a branch".

**Symptoms if misconfigured:**
- ❌ Source files (`/src/main.js`) served instead of built files
- ❌ All images return 404 errors
- ❌ CSS and JavaScript fail to load
- ❌ Error: `Failed to resolve module specifier "alpinejs"`
- ❌ Site appears completely broken

**Fix immediately:**
1. Go to: https://github.com/Bobbyberta/park-and-paint/settings/pages
2. Under "Build and deployment" → "Source"
3. **Must be:** "GitHub Actions" (NOT "Deploy from a branch")
4. Save and trigger redeployment

**Verification:**
```bash
# Check if site serves BUILT files (correct):
curl https://parkandpaint.co.uk/ | grep 'assets/index'
# Should find: /assets/index-YwDCR4tM.js

# NOT source files (incorrect):
curl https://parkandpaint.co.uk/ | grep '/src/main.js'
# Should find nothing
```

### 2. .nojekyll File Requirement

**SECOND CRITICAL REQUIREMENT:** The `.nojekyll` file must be created in `dist/` during deployment.

**Why it's needed:**
- GitHub Pages uses Jekyll by default to process static sites
- Jekyll ignores files/folders starting with `_` 
- Vite generates modern build outputs that Jekyll misinterprets
- `.nojekyll` tells GitHub Pages: "Skip Jekyll processing entirely"

**Symptoms if missing:**
- ❌ All images return 404 errors
- ❌ CSS stylesheets fail to load
- ❌ JavaScript modules fail with "Failed to resolve module specifier" errors
- ❌ Interactive map doesn't display

**Solution (Already Configured):**

The GitHub Actions workflow automatically creates this file:

```yaml
# In .github/workflows/deploy.yml - NEVER REMOVE THIS STEP
- name: Create .nojekyll file
  run: touch dist/.nojekyll
```

**Verification:**
```bash
# Check workflow has the step:
grep -A 2 "Create .nojekyll" .github/workflows/deploy.yml

# After deployment, verify no Jekyll processing:
curl -I https://parkandpaint.co.uk/.nojekyll
# Should return 200 OK (not 404)
```

---

## 🌐 Current Setup

### Hosting

- **Platform:** GitHub Pages
- **Repository:** https://github.com/Bobbyberta/park-and-paint
- **Live Site:** https://www.parkandpaint.co.uk
- **Deployment Method:** Automatic via GitHub Actions
- **Build Tool:** Vite
- **Deployment Frequency:** On every push to `main` branch

### Domain Registration

- **Registrar:** Wix
- **Domain Name:** parkandpaint.co.uk (apex domain with www subdomain)
- **Registration Date:** June 22, 2024 (assumed)
- **Expiration Date:** **June 22, 2028**
- **Auto-Renewal:** Check Wix account settings
- **Renewal Reminder:** Set calendar reminder for May 2028

### Domain DNS Configuration

The domain is registered with Wix but points to GitHub Pages:

**A Records (Apex domain):**
```
Type: A
Name: @ (or parkandpaint.co.uk)
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @ (or parkandpaint.co.uk)
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @ (or parkandpaint.co.uk)
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @ (or parkandpaint.co.uk)
Value: 185.199.111.153
TTL: 3600
```

**CNAME Record (www subdomain):**
```
Type: CNAME
Name: www
Value: bobbyberta.github.io
TTL: 3600
```

**Important Notes:**
- DNS is managed through Wix dashboard (Settings → Domains → DNS)
- Keep Wix domain registration active (renew before June 22, 2028)
- Can cancel Wix website hosting, but keep domain registration
- A records point apex domain to GitHub Pages
- CNAME redirects www subdomain to apex domain

### Analytics & Monitoring

- **Platform:** Google Analytics 4 (GA4)
- **Tracking ID:** G-E718YMXYXN
- **Dashboard:** https://analytics.google.com
- **Implementation:** Direct in `index.html` (gtag.js)
- **Data Collection:** Page views, events, user demographics

**Tracked Metrics:**
- Page views and unique visitors
- Traffic sources (organic, direct, referral)
- User behavior and engagement
- Device and browser statistics
- Geographic location of visitors

**Access:**
- Owner email: stuart@parkandpaint.co.uk
- Dashboard link: https://analytics.google.com/analytics/web/#/p457825825 (verify actual property ID)

## ⚙️ Initial Setup (One-Time)

### Step 1: Configure GitHub Pages

1. Go to repository settings: https://github.com/Bobbyberta/park-and-paint/settings/pages
2. Under "Build and deployment":
   - **Source:** Select "GitHub Actions"
3. Under "Custom domain":
   - Enter: `parkandpaint.co.uk`
   - Click "Save"
4. Wait for DNS check (shows green checkmark when successful)
5. Enable "Enforce HTTPS" checkbox

### Step 2: Verify DNS Configuration

Check your Wix DNS settings match these records:

**A Records (required for apex domain):**
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

**CNAME Record:**
- Name: `www`
- Value: `bobbyberta.github.io`

### Step 3: Wait for DNS Propagation

- DNS changes can take 1-48 hours to propagate
- Check status: `nslookup parkandpaint.co.uk`
- Test site in incognito mode to avoid cache issues

### Step 4: Verify Deployment

Once DNS propagates, verify:
- ✅ `https://parkandpaint.co.uk` loads correctly
- ✅ `https://www.parkandpaint.co.uk` redirects to apex domain
- ✅ All images and assets load properly
- ✅ SSL certificate is active (padlock icon in browser)

## 🚀 Deployment Process

### Automatic Deployment

Every push to the `main` branch triggers an automatic deployment:

1. **Developer pushes code** to `main` branch
2. **GitHub Actions** detects the push
3. **Workflow runs** (`.github/workflows/deploy.yml`):
   - Checks out code
   - Sets up Node.js 20
   - Installs dependencies (`npm ci`)
   - Builds project (`npm run build`)
   - **⚠️ Creates `.nojekyll` file** (`touch dist/.nojekyll`) - **CRITICAL STEP**
   - Configures GitHub Pages
   - Deploys `dist/` folder to GitHub Pages
4. **Site goes live** within ~2 minutes
5. **CDN propagates** within ~10 minutes

**Note:** The `.nojekyll` creation step is REQUIRED and must never be removed from the workflow.

### Manual Deployment Trigger

If needed, you can manually trigger a deployment:

1. Go to: https://github.com/Bobbyberta/park-and-paint/actions
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select `main` branch
5. Click "Run workflow"

### Monitoring Deployment Status

**Check deployment status:**
- URL: https://github.com/Bobbyberta/park-and-paint/actions
- Look for green ✓ (success) or red ✗ (failed)
- Click on any workflow run to see detailed logs

**Typical deployment timeline:**
- Build time: ~1-2 minutes
- Deployment time: ~30 seconds
- CDN propagation: ~5-10 minutes
- Total time to live: ~10-15 minutes

## 📋 Configuration Files

### Vite Configuration (`vite.config.js`)

```javascript
base: '/',  // Must be '/' for custom domain (NOT '/park-and-paint/')
```

**Important:** The `base` path must be `/` for custom domains. Using a project path like `/park-and-paint/` will cause all assets to fail loading.

### CNAME File (`public/CNAME`)

```
parkandpaint.co.uk
```

This file tells GitHub Pages to serve the site on your custom domain. Use the apex domain (without www) to allow GitHub Pages to handle both apex and www subdomain automatically.

### GitHub Pages Settings

**Repository Settings → Pages:**
- Source: GitHub Actions
- Custom domain: parkandpaint.co.uk
- Enforce HTTPS: ✓ Enabled
- Branch: main (via GitHub Actions)

**To configure custom domain in GitHub:**
1. Go to: https://github.com/Bobbyberta/park-and-paint/settings/pages
2. Under "Custom domain", enter: `parkandpaint.co.uk`
3. Click "Save"
4. Wait for DNS check to complete (green checkmark)
5. Enable "Enforce HTTPS" once DNS check passes
6. This will automatically create/update the CNAME file in your repository

## 🔧 Maintenance Tasks

### Monthly
- [ ] Check Google Analytics for traffic patterns
- [ ] Review any 404 errors in analytics
- [ ] Monitor site performance (Lighthouse scores)

### Quarterly
- [ ] Update dependencies: `npm outdated` → `npm update`
- [ ] Run security audit: `npm audit`
- [ ] Test site on multiple browsers/devices
- [ ] Review and update content if needed

### Annually
- [ ] Review Google Analytics annual report
- [ ] Check domain expiration date (renew before June 22, 2028)
- [ ] Update copyright year in footer
- [ ] Review and update business information
- [ ] Performance optimization audit

### Before Domain Expiration (May 2028)
- [ ] Set calendar reminder for May 1, 2028
- [ ] Log into Wix account
- [ ] Verify domain auto-renewal is enabled OR
- [ ] Manually renew domain for another term
- [ ] Update expiration date in documentation

## 🆘 Troubleshooting

### Site Completely Broken After Deployment (MOST COMMON)

**Symptoms:**
- Images return 404 errors: `GET https://parkandpaint.co.uk/images/hero-bg.jpg 404`
- CSS not loading properly
- JavaScript error: `Uncaught TypeError: Failed to resolve module specifier "alpinejs"`
- Error shows `/src/main.js` instead of `/assets/index-XXX.js`
- Map (Leaflet) not displaying
- Site appears broken with no styling

**Root Cause #1: Wrong GitHub Pages Source (90% of issues)**

GitHub Pages is deploying from repository branch instead of GitHub Actions artifact.

**Diagnosis:**
```bash
# Check what's being served:
curl https://parkandpaint.co.uk/ | grep -o 'src="[^"]*main.js"'

# If returns: src="/src/main.js" → WRONG (source files)
# Should return: src="/assets/index-XXX.js" → CORRECT (built files)
```

**Fix:**
1. Visit: https://github.com/Bobbyberta/park-and-paint/settings/pages
2. Under "Build and deployment" → "Source"
3. **Change from:** "Deploy from a branch" 
4. **Change to:** "GitHub Actions"
5. Save the change
6. Trigger redeployment:
   ```bash
   git commit --allow-empty -m "trigger: redeploy with GitHub Actions"
   git push origin main
   ```
7. Wait 2-5 minutes for GitHub Actions to complete
8. Check: https://github.com/Bobbyberta/park-and-paint/actions
9. Clear browser cache (Cmd+Shift+R) and test in incognito mode

**Root Cause #2: Missing .nojekyll File (10% of issues)**

Even with correct GitHub Actions source, missing `.nojekyll` causes Jekyll processing.

**Diagnosis:**
```bash
# Check if workflow has .nojekyll step:
grep "Create .nojekyll" .github/workflows/deploy.yml

# Check if deployed:
curl -I https://parkandpaint.co.uk/.nojekyll
# Should return: HTTP/2 200 (not 404)
```

**Fix:**
1. Verify `.github/workflows/deploy.yml` contains:
   ```yaml
   - name: Create .nojekyll file
     run: touch dist/.nojekyll
   ```
2. If missing, add it after the build step
3. Commit and push:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "fix: add .nojekyll creation to workflow"
   git push origin main
   ```
4. Wait for redeployment

**Prevention Checklist:**

Before every deployment:
- [ ] Verify GitHub Pages Source is "GitHub Actions" (not branch)
- [ ] Verify workflow has `.nojekyll` creation step
- [ ] Check Actions tab shows successful builds
- [ ] Test in incognito mode after deployment

### Assets Not Loading (404 Errors)

**Symptom:** Images, CSS, or JS files return 404 errors (after .nojekyll is confirmed present)

**Solution:**
1. Check `vite.config.js` has `base: '/'`
2. Rebuild: `npm run build`
3. Commit and push changes
4. Wait for deployment to complete

### Domain Not Working

**Symptom:** Site shows "404 - There isn't a GitHub Pages site here"

**Solution:**
1. Check GitHub Pages settings has custom domain: parkandpaint.co.uk
   - Go to: https://github.com/Bobbyberta/park-and-paint/settings/pages
   - Verify custom domain is set correctly
2. Verify `public/CNAME` file contains: `parkandpaint.co.uk`
3. Check DNS settings in Wix:
   - A records point to GitHub Pages IPs (185.199.108-111.153)
   - CNAME record for www points to `bobbyberta.github.io`
4. Wait up to 48 hours for DNS propagation (typically 1-2 hours)
5. Clear browser cache or test in incognito mode

### Deployment Failing

**Symptom:** GitHub Actions workflow shows red ✗

**Solution:**
1. Check workflow logs: https://github.com/Bobbyberta/park-and-paint/actions
2. Common issues:
   - Build errors: Fix code issues and push again
   - Node version mismatch: Workflow uses Node 20
   - Dependencies issues: Update `package-lock.json`
3. Try manual workflow trigger after fixing

### Google Analytics Not Tracking

**Symptom:** No data appearing in GA4 dashboard

**Solution:**
1. Verify tracking code in `index.html` has correct ID: G-E718YMXYXN
2. Check browser console for gtag.js errors
3. Disable ad blockers when testing
4. Wait 24-48 hours for data to appear
5. Use GA4 DebugView for real-time testing

## 🔐 Access & Credentials

### GitHub Repository
- **Owner:** Bobbyberta
- **Repository:** park-and-paint
- **Collaborators:** (add as needed)
- **Access:** https://github.com/Bobbyberta/park-and-paint/settings/access

### Wix Domain Management
- **Login:** https://manage.wix.com
- **Account Email:** (domain owner's email)
- **Domain:** www.parkandpaint.co.uk
- **Section:** Settings → Domains

### Google Analytics
- **Login:** https://analytics.google.com
- **Account Email:** stuart@parkandpaint.co.uk
- **Property:** Park and Paint
- **Tracking ID:** G-E718YMXYXN

## 📊 Performance Targets

### Lighthouse Scores (Target: 90+)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Current Optimization
- Image optimization: WebP format with fallbacks
- Code splitting: Alpine.js and Leaflet as separate chunks
- Asset inlining: Files < 4KB inlined
- Caching: GitHub Pages CDN handles caching
- Compression: Gzip enabled by default

## ✅ Pre-Deployment Checklist

Use this checklist before every deployment to prevent common issues:

### Critical Configuration Verification (DO THIS FIRST)

**1. GitHub Pages Source Settings:**
- [ ] Go to: https://github.com/Bobbyberta/park-and-paint/settings/pages
- [ ] **VERIFY** "Source" is set to: **"GitHub Actions"**
- [ ] **NOT** "Deploy from a branch"
- [ ] This is the #1 cause of deployment failures

**2. Workflow .nojekyll Step:**
- [ ] **VERIFY** `.github/workflows/deploy.yml` contains the `.nojekyll` creation step:
  ```yaml
  - name: Create .nojekyll file
    run: touch dist/.nojekyll
  ```
- [ ] **NEVER REMOVE** this step from the workflow
- [ ] If either setting is wrong, the entire site will break on deployment

### Build Verification
- [ ] `CNAME` file in `public/` contains: `parkandpaint.co.uk` (no www, no protocol)
- [ ] `vite.config.js` has `base: '/'` (not a repo path)
- [ ] Run `npm run build` successfully with no errors
- [ ] Verify `dist/` folder contains:
  - [ ] `.nojekyll` file (created by workflow, not Vite)
  - [ ] `CNAME` file
  - [ ] `index.html` with bundled asset references
  - [ ] `assets/` folder with JS and CSS bundles
  - [ ] `images/` folder with all image assets
  - [ ] `favicon.svg` and `favicon.ico`

### Code Quality
- [ ] Run `npm run lint` - no errors
- [ ] Run `npm run format` - code formatted
- [ ] All images optimized (WebP with fallbacks)
- [ ] No console.log statements in production code

### Testing
- [ ] Test locally with `npm run dev` - site works
- [ ] Test build locally with `npm run preview` - all assets load
- [ ] Check responsive design on mobile/tablet/desktop
- [ ] Verify all links work (internal and external)
- [ ] Test contact information (email, phone links)

### Git & Deployment
- [ ] Commit all changes with descriptive message
- [ ] Push to `main` branch
- [ ] Check GitHub Actions workflow status (green ✓)
- [ ] Wait 2-5 minutes for deployment to complete
- [ ] Test live site: https://www.parkandpaint.co.uk
- [ ] Clear browser cache (Cmd+Shift+R) before testing
- [ ] Verify in incognito mode

### Post-Deployment Verification
- [ ] All images load correctly (no 404s)
- [ ] CSS styling applied correctly
- [ ] JavaScript working (mobile menu, map)
- [ ] Alpine.js components functioning
- [ ] Leaflet map displays correctly
- [ ] Google Analytics tracking code present
- [ ] SSL certificate active (HTTPS padlock)
- [ ] No console errors in browser DevTools
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile device

### Emergency Rollback (If Needed)
If deployment fails:
1. Check GitHub Actions logs for errors
2. Revert last commit: `git revert HEAD`
3. Push revert: `git push origin main`
4. Wait for automatic redeployment
5. Fix issues locally, then redeploy

## 📱 Contact Information

For deployment issues or questions:
- **Technical Owner:** stuart@parkandpaint.co.uk
- **Repository:** https://github.com/Bobbyberta/park-and-paint
- **Documentation:** This file

---

**Last Updated:** October 9, 2025  
**Next Review:** January 2026
