# Park and Paint

A mobile-first, accessible, and SEO-optimized website for professional car paint repair and SMART repair services in Bath, England. Built with modern web technologies and deployed on GitHub Pages.

## 🚀 Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/) - Fast, modern bundler for optimal performance
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Interactivity**: [Alpine.js](https://alpinejs.dev/) - Lightweight JavaScript framework
- **Maps**: [Leaflet.js](https://leafletjs.com/) - Open-source interactive maps
- **Hosting**: [GitHub Pages](https://pages.github.com/) - Free, reliable static hosting
- **Code Quality**: ESLint + Prettier for consistent, clean code

## ✨ Features

- 📱 **Mobile-First Design** - Responsive across all devices (320px - 1440px+)
- ♿ **WCAG 2.1 AA Accessible** - Semantic HTML, ARIA labels, keyboard navigation
- 🔍 **SEO Optimized** - Meta tags, Open Graph, structured data (Schema.org)
- 🗺️ **Interactive Map** - Service area in Bath and surrounding locations
- ⚡ **Fast Performance** - Optimized builds, lazy loading, minimal dependencies
- 🎨 **Modern UI** - Clean, professional design with smooth animations
- 🚗 **SMART Repair Focus** - Specialized content for car paint repair services

## 🧰 Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/park-and-paint.git
cd park-and-paint
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (output to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint and auto-fix issues
- `npm run format` - Format code with Prettier

## 🚀 Deployment

### Current Hosting Setup

**Hosting:** GitHub Pages  
**Repository:** https://github.com/Bobbyberta/park-and-paint  
**Live Site:** https://www.parkandpaint.co.uk  
**Deployment Method:** Automatic via GitHub Actions

**Domain Registration:**
- **Registrar:** Wix
- **Domain:** www.parkandpaint.co.uk
- **Expiration Date:** June 22, 2028
- **DNS Configuration:** CNAME record pointing to GitHub Pages

**Analytics:**
- **Platform:** Google Analytics 4
- **Tracking ID:** G-E718YMXYXN
- **Dashboard:** https://analytics.google.com

### Deployment Process

This project uses **GitHub Actions** for automatic deployment:

1. **Automatic Deployment**
   - Every push to `main` branch triggers deployment
   - GitHub Actions workflow builds and deploys automatically
   - Check deployment status: https://github.com/Bobbyberta/park-and-paint/actions
   - Build time: ~2 minutes
   - Full propagation: ~10 minutes

2. **Workflow Configuration**
   - Located in `.github/workflows/deploy.yml`
   - Uses Node.js 20 for consistent builds
   - Deploys `dist/` directory to GitHub Pages
   - Runs on every push and can be triggered manually

3. **Domain Configuration**
   - Custom domain configured in GitHub Pages settings
   - `CNAME` file in `public/` directory points to `www.parkandpaint.co.uk`
   - `vite.config.js` has `base: '/'` for custom domain deployment

### Manual Build (Testing Only)

```bash
npm run build
# Output is in the dist/ folder
# GitHub Actions handles deployment automatically
```

## 📁 Project Structure

```
park-and-paint/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── public/
│   ├── images/                 # Static images
│   └── favicon.ico             # Favicon
├── src/
│   ├── styles/
│   │   └── main.css           # Tailwind + custom styles
│   └── main.js                # Alpine.js + Leaflet initialization
├── .eslintrc.json             # ESLint configuration
├── .gitignore                 # Git ignore rules
├── .prettierrc                # Prettier configuration
├── index.html                 # Main HTML file
├── package.json               # Dependencies and scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind customization
├── vite.config.js             # Vite build configuration
├── CONTRIBUTING.md            # Contribution guidelines
└── README.md                  # This file
```

## ♿ Accessibility

This site is built with accessibility as a priority:

- ✅ Semantic HTML5 structure
- ✅ ARIA labels and roles where appropriate
- ✅ Keyboard navigation support
- ✅ Focus indicators visible
- ✅ Screen reader friendly
- ✅ Color contrast meets WCAG AA standards
- ✅ Skip to main content link
- ✅ Responsive text sizing

### Testing Accessibility

Run [Lighthouse](https://developers.google.com/web/tools/lighthouse) audit:
- Open Chrome DevTools (F12)
- Go to Lighthouse tab
- Run audit for Accessibility

Target: 90+ score

## 🔍 SEO

SEO optimizations included:

- ✅ Meta description and keywords
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Canonical URL
- ✅ Structured data (Schema.org)
- ✅ Semantic HTML
- ✅ Proper heading hierarchy
- ✅ Alt text for images
- ✅ Sitemap ready

### Testing SEO

- Run Lighthouse SEO audit
- Use [Google's Rich Results Test](https://search.google.com/test/rich-results)
- Check [PageSpeed Insights](https://pagespeed.web.dev/)

## 🎨 Customization

### Colors

Edit brand colors in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your color palette
      }
    }
  }
}
```

### Content

- Update text content in `index.html`
- Replace placeholder contact information
- Add your actual service locations in `src/main.js`

### Images

- Add images to `public/images/`
- Update favicon and touch icons in `public/`
- Replace Open Graph images

## 🔧 Maintenance

### Keep Dependencies Updated

```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Or use npm-check-updates
npx npm-check-updates -u
npm install
```

### Regular Checks

- ✅ Run Lighthouse audits quarterly
- ✅ Test on multiple browsers
- ✅ Verify mobile responsiveness
- ✅ Check all links work
- ✅ Update content as needed
- ✅ Backup custom domain settings

## 🔒 Project Status

This is a proprietary project owned by Park & Paint. All rights reserved.

## 📝 License

This project is proprietary and confidential to Park & Paint. All rights reserved. 

**License**: SEE LICENSE IN LICENSE file

For permissions and licensing inquiries, contact: stuart@parkandpaint.co.uk

## 🆘 Support

For issues or questions:

- Open an issue on GitHub
- Email: info@parkandpaint.co.uk
- Check documentation at [docs/](docs/)

## 📊 Performance

Expected performance metrics:

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Performance**: 90+
- **Lighthouse Accessibility**: 95+
- **Lighthouse SEO**: 95+

## 🌟 Acknowledgments

- Built with guidance from best practices
- Icons from [Heroicons](https://heroicons.com/)
- Maps powered by [OpenStreetMap](https://www.openstreetmap.org/)
- Fonts from system fonts for optimal performance

---

**Built with ❤️ for accessibility, performance, and user experience**

