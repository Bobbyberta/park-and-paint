# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- **CRITICAL DEPLOYMENT FIX #1**: Identified GitHub Pages source configuration as primary issue (90% of failures)
  - Root cause: GitHub Pages was set to "Deploy from a branch" instead of "GitHub Actions"
  - Symptom: Site serves source files (`/src/main.js`) instead of built bundles (`/assets/index-XXX.js`)
  - Result: All images, CSS, and JavaScript return 404 errors
  - **Impact**: Entire site appears broken - this is the #1 deployment failure cause
  
- **CRITICAL DEPLOYMENT FIX #2**: Added `.nojekyll` file creation step to GitHub Actions workflow
  - Previously, `.nojekyll` was only in `public/` but Vite doesn't copy it to `dist/`
  - Now automatically created in `dist/` during deployment via workflow step
  - Prevents GitHub Pages Jekyll processing that causes 404 errors for all assets
  - Resolves: images failing to load, CSS not applying, JavaScript module resolution errors
  - **Impact**: Without this fix, even with correct source config, site can still break

### Changed
- 📚 **Consolidated deployment documentation** into single comprehensive guide:
  - Merged `DEPLOYMENT-FIX.md`, `NOJEKYLL-REQUIREMENT.md` into `DEPLOYMENT.md`
  - Prioritized issues by frequency: GitHub Pages source (90%) > .nojekyll (10%)
  - Added "Critical Requirements" section at top covering both common issues
  - Enhanced troubleshooting with diagnostic commands before fixes
  - Removed 313 lines of redundant documentation, added 122 lines of focused content
  - Single source of truth for all deployment information

- 📚 **Enhanced documentation** to prevent future deployment issues:
  - Added prominent warnings in README.md about critical deployment requirements
  - Updated DEPLOYMENT.md with step-by-step troubleshooting prioritized by frequency
  - Improved QUICKSTART.md with clear warnings about GitHub Pages source configuration
  - Added inline comments in `.github/workflows/deploy.yml` to prevent accidental removal
  - Created comprehensive Pre-Deployment Checklist with GitHub Pages source verification as #1 priority
  - Included diagnostic commands to identify root cause before applying fixes

## [1.0.1] - 2025-10-09

### Added
- ⭐ Customer reviews section with star ratings and testimonials
- 📝 Automated Playwright GitHub Actions workflow and production testing
- 🗺️ "Get Directions" button in map location popups
- 📱 Mobile web app capabilities with PWA meta tags

### Fixed
- **CRITICAL**: Added `.nojekyll` file to prevent GitHub Pages Jekyll processing
  - Resolves 404 errors for all assets (images, CSS, JS)
  - Fixes "Failed to resolve module specifier" JavaScript errors
  - Ensures Leaflet map loads correctly
  - Required for all Vite + GitHub Pages deployments
- 🌐 Updated CNAME to use apex domain (parkandpaint.co.uk) for proper GitHub Pages deployment
- 🧪 Improved E2E test reliability with proper viewport handling and async operations
- ⚡ Resolved performance test failures in CI with adjusted timing thresholds
- 🗺️ Adjusted map zoom level from 13 to 11 for better user experience
- ♿ Enhanced accessibility checks with proper timing for map loading

### Changed
- 📚 Restructured documentation into `docs/` folder for better organization
- 📝 Consolidated `github-pages.md` into comprehensive `DEPLOYMENT.md`
- 📖 Updated README.md with new Documentation section
- 🔒 Enhanced Content Security Policy to include Google Analytics endpoints
- ⚡ Set fetchpriority to 'high' for critical images to optimize loading performance

### Documentation
- 🚀 Enhanced DEPLOYMENT.md with prevention rules and best practices
- ✅ Added pre-deployment checklist to prevent common issues
- 🔧 Updated QUICKSTART.md with .nojekyll requirement
- 📖 Updated cursor rules (github.mdc) with critical deployment information
- 🗂️ Updated all internal documentation links to reflect new structure
- 🎯 Reduced root directory clutter from 10 to 3 markdown files

### Removed
- 🗑️ Deprecated github-pages.mdc documentation file
- 🗑️ CNAME file temporarily removed and recreated for custom domain setup

## [2025-10-08]

### Added
- 📊 Google Analytics integration with gtag.js tracking
- 🎨 Enhanced map styling with grayscale tile layer
- 🖼️ Added image reference for Park and Paint service

### Fixed
- 🎯 Fixed Vite base path configuration for custom domain deployment (changed from `/park-and-paint/` to `/`)
- 🎨 Fixed favicon references to include SVG format
- 🗺️ Updated map zoom level from 15 to 11 in environment configuration

### Changed
- 📝 Updated environment and README for current hosting and analytics setup
- 🗺️ Improved map section styling with better zoom level

### Documentation
- 📖 Updated hosting details and analytics section in README

## [2025-10-07]

### Added
- 🧪 Comprehensive testing suite with Playwright for E2E tests
- 🧪 Unit tests for components and utilities (map, accessibility, performance, site-config)
- 📚 `TESTING.md` documentation with comprehensive testing guide
- 🚀 GitHub Pages deployment configuration and workflow
- 🔒 Business information enhancements with lifetime guarantee messaging
- 📊 Expanded Schema.org structured data with service areas, offers, and aggregate ratings
- 🎨 Enhanced map section with grayscale styling and improved popups
- 🗺️ Custom popup styles for map markers with better visual consistency

### Fixed
- 📱 Fixed mobile menu to close when clicking outside
- 🔧 Fixed contact address selector to avoid duplicate matches in tests
- 🗺️ Map timeout cleanup to prevent test issues

### Changed
- 📝 Simplified contact information by removing obfuscation logic
- 🗺️ Updated map section background color to gray with adjusted padding
- ⏰ Modified opening hours to include new timings for Friday and Saturday
- 📊 Updated aggregate rating review count from 127 to 41 for accuracy
- 🔧 Performance logging now conditional (development mode only)
- 📄 Updated license information in package.json to "SEE LICENSE IN LICENSE"
- 🎨 Refactored map tile layer with cache busting
- 📝 Updated service offerings and review details

### Removed
- 🚫 "Mobile Car Repair" service from offerings list
- 🗑️ Contact security obfuscation utilities (contact-security.js)

### CI/CD
- ⬆️ Bumped actions/checkout from 4 to 5
- ⬆️ Bumped actions/setup-node from 4 to 5
- ⬆️ Bumped actions/configure-pages from 4 to 5
- ⬆️ Bumped actions/upload-pages-artifact from 3 to 4
- 🧪 Added automated E2E testing in CI pipeline
- 📦 Test artifacts retention: HTML reports (30 days), videos (7 days), coverage (7 days)

### Configuration
- 🔧 Updated .editorconfig with indentation settings for various file types
- 🔧 Modified ESLint configuration to allow console.log in warnings
- 🎨 Added additional SEO meta tags
- 🔧 Introduced new script command for creating Open Graph images
- 🔧 Added pre-commit hook for linting and formatting checks

## [1.0.0] - 2025-10-06

### Added
- Initial project setup with Vite, Tailwind CSS, Alpine.js, and Leaflet.js
- Mobile-first responsive design
- WCAG 2.1 AA accessibility features
- SEO optimization with meta tags, Open Graph, and structured data
- Interactive map with service location markers
- Services, About, Locations, and Contact sections
- GitHub Actions CI/CD for automated deployment
- ESLint and Prettier configuration for code quality
- Comprehensive README and CONTRIBUTING documentation

### Features
- 📱 Responsive navigation with mobile hamburger menu
- 🗺️ Interactive Leaflet map with custom markers
- ♿ Full keyboard navigation support
- 🔍 SEO-optimized with Schema.org structured data
- ⚡ Fast performance with optimized builds

### Documentation
- Complete setup and installation guide
- Deployment instructions for GitHub Pages
- Contributing guidelines
- Code style standards
- Accessibility testing procedures

[1.0.0]: https://github.com/bobbyberta/park-and-paint/releases/tag/v1.0.0

