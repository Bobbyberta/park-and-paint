# Deployment Documentation

This document contains all information about hosting, domain management, and deployment for the Park and Paint website.

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
   - Deploys `dist/` folder to GitHub Pages
4. **Site goes live** within ~2 minutes
5. **CDN propagates** within ~10 minutes

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

### Assets Not Loading & Module Resolution Errors (CRITICAL)

**Symptoms:**
- Images return 404 errors: `GET https://parkandpaint.co.uk/images/hero-bg.jpg 404`
- CSS not loading properly
- JavaScript error: `Uncaught TypeError: Failed to resolve module specifier "alpinejs"`
- Map (Leaflet) not displaying
- Site appears broken with no styling

**Root Cause:** Missing `.nojekyll` file causes GitHub Pages to use Jekyll processing, which interferes with Vite builds

**Solution (REQUIRED):**
1. Ensure `.nojekyll` file exists in `public/` folder:
   ```bash
   touch public/.nojekyll
   ```
2. Verify `vite.config.js` has `base: '/'` (not '/repo-name/')
3. Rebuild the site:
   ```bash
   npm run build
   ```
4. Verify `.nojekyll` exists in `dist/` folder after build:
   ```bash
   ls -la dist/.nojekyll
   ```
5. Commit and push all changes:
   ```bash
   git add public/.nojekyll
   git commit -m "fix: Add .nojekyll to prevent Jekyll processing"
   git push origin main
   ```
6. Wait 2-5 minutes for deployment to complete
7. Clear browser cache (Cmd+Shift+R) or test in incognito mode

**Why This Happens:**
- GitHub Pages uses Jekyll by default to process static sites
- Jekyll ignores files/folders starting with `_` (like `_app` or `_next`)
- Vite may create asset paths that Jekyll misinterprets
- The `.nojekyll` file tells GitHub Pages to skip Jekyll processing entirely
- This is REQUIRED for all Vite/modern build tool deployments

**Prevention:**
- Always include `.nojekyll` in `public/` folder for Vite projects
- Verify it's copied to `dist/` after every build
- Add to deployment checklist (see below)

**Prevention Rules for .nojekyll:**

*For New Projects:*
1. Create `.nojekyll` file FIRST, before initial deployment
2. Add to version control (not in .gitignore)
3. Verify in `dist/` after first build

*For Existing Projects:*
1. Audit for `.nojekyll` file monthly
2. Include in pre-deployment checklist
3. Monitor browser console after every deployment

*For Migrations:*
- When moving FROM another host TO GitHub Pages:
  - Add `.nojekyll` immediately
  - Test thoroughly before DNS cutover
  - Keep old hosting active during testing

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

### Build Verification
- [ ] `.nojekyll` file exists in `public/` folder
- [ ] `CNAME` file in `public/` contains: `www.parkandpaint.co.uk`
- [ ] `vite.config.js` has `base: '/'` (not a repo path)
- [ ] Run `npm run build` successfully with no errors
- [ ] Verify `dist/` folder contains:
  - [ ] `.nojekyll` file
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
