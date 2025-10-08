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
- **Domain Name:** www.parkandpaint.co.uk
- **Registration Date:** June 22, 2024 (assumed)
- **Expiration Date:** **June 22, 2028**
- **Auto-Renewal:** Check Wix account settings
- **Renewal Reminder:** Set calendar reminder for May 2028

### Domain DNS Configuration

The domain is registered with Wix but points to GitHub Pages:

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
www.parkandpaint.co.uk
```

This file tells GitHub Pages to serve the site on your custom domain.

### GitHub Pages Settings

**Repository Settings → Pages:**
- Source: GitHub Actions
- Custom domain: www.parkandpaint.co.uk
- Enforce HTTPS: ✓ Enabled
- Branch: main (via GitHub Actions)

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

### Assets Not Loading (404 Errors)

**Symptom:** Images, CSS, or JS files return 404 errors

**Solution:**
1. Check `vite.config.js` has `base: '/'`
2. Rebuild: `npm run build`
3. Commit and push changes
4. Wait for deployment to complete

### Domain Not Working

**Symptom:** Site shows "404 - There isn't a GitHub Pages site here"

**Solution:**
1. Check GitHub Pages settings has custom domain: www.parkandpaint.co.uk
2. Verify `public/CNAME` file exists with correct domain
3. Check DNS settings in Wix point to `bobbyberta.github.io`
4. Wait up to 48 hours for DNS propagation

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

## 📱 Contact Information

For deployment issues or questions:
- **Technical Owner:** stuart@parkandpaint.co.uk
- **Repository:** https://github.com/Bobbyberta/park-and-paint
- **Documentation:** This file

---

**Last Updated:** October 8, 2025  
**Next Review:** January 2026
