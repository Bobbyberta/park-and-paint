# Environment Configuration

This document describes the environment variables available for configuring the Park and Paint website.

## Setup

1. Copy the example configuration:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your specific values
3. Restart the development server: `npm run dev`

## Available Variables

### Site Configuration
- `VITE_SITE_URL` - The full URL of your website (default: https://www.parkandpaint.co.uk)
- `VITE_SITE_NAME` - The name of your business (default: Park and Paint)
- `VITE_SITE_DESCRIPTION` - Brief description for SEO (default: Professional car paint repair...)

### Contact Information
- `VITE_CONTACT_EMAIL` - Primary contact email (default: stuart@parkandpaint.co.uk)
- `VITE_PHONE_NUMBER` - Phone number without formatting (default: 07732441000)
- `VITE_PHONE_DISPLAY` - Formatted phone number for display (default: 07732 44 1000)

### Business Address
- `VITE_ADDRESS_STREET` - Street address (default: 7 Ferry Court)
- `VITE_ADDRESS_CITY` - City (default: Bath)
- `VITE_ADDRESS_REGION` - Region/State (default: England)
- `VITE_ADDRESS_COUNTRY` - Country (default: United Kingdom)
- `VITE_ADDRESS_POSTCODE` - Postal code (default: BA2 4JW)
- `VITE_ADDRESS_FULL` - Complete address string

### Map Configuration
- `VITE_MAP_CENTER_LAT` - Latitude for map center (default: 51.3792880272762)
- `VITE_MAP_CENTER_LNG` - Longitude for map center (default: -2.3531900513862065)
- `VITE_MAP_ZOOM` - Default map zoom level (default: 11)

### Business Hours
- `VITE_HOURS_MONDAY_THURSDAY` - Monday-Thursday hours (default: 7:30 AM - 4:00 PM)
- `VITE_HOURS_FRIDAY_SATURDAY` - Friday-Saturday hours (default: By Appointment)
- `VITE_HOURS_SUNDAY` - Sunday hours (default: Closed)

### Social Media (Future Use)
- `VITE_SOCIAL_FACEBOOK` - Facebook page URL
- `VITE_SOCIAL_TWITTER` - Twitter profile URL
- `VITE_SOCIAL_INSTAGRAM` - Instagram profile URL

### Analytics
- `VITE_GA_TRACKING_ID` - Google Analytics tracking ID (current: G-E718YMXYXN)
- `VITE_GTM_ID` - Google Tag Manager container ID (optional)

## Usage in Code

Environment variables are automatically available in your JavaScript code:

```javascript
import { siteConfig } from './config/site-config.js';

// Access configuration
console.log(siteConfig.contact.email);
console.log(siteConfig.map.centerLat);
```

## Security Notes

- Never commit `.env.local` or `.env` files to version control
- All environment variables must be prefixed with `VITE_` to be accessible in the browser
- Sensitive data should not be stored in environment variables for client-side applications

## Production Deployment

**Current Setup:**
- **Hosting:** GitHub Pages
- **Repository:** https://github.com/Bobbyberta/park-and-paint
- **Domain:** www.parkandpaint.co.uk (registered with Wix, expires Jun 22, 2028)
- **Deployment:** Automatic via GitHub Actions on every push to main branch
- **Analytics:** Google Analytics 4 (Tracking ID: G-E718YMXYXN)

For production deployments:

1. Environment variables are set in the GitHub repository settings (if needed)
2. GitHub Actions automatically uses variables during build
3. Google Analytics is configured directly in `index.html`
4. Domain DNS points to GitHub Pages via CNAME record

## Default Values

All variables have sensible defaults defined in `src/config/site-config.js`. If an environment variable is not set, the default value will be used.
