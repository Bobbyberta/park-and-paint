# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-10-09

### Fixed
- **CRITICAL**: Added `.nojekyll` file to prevent GitHub Pages Jekyll processing
  - Resolves 404 errors for all assets (images, CSS, JS)
  - Fixes "Failed to resolve module specifier" JavaScript errors
  - Ensures Leaflet map loads correctly
  - Required for all Vite + GitHub Pages deployments

### Changed
- Restructured documentation into `docs/` folder for better organization
- Consolidated `github-pages.md` into comprehensive `DEPLOYMENT.md`
- Updated README.md with new Documentation section
- Enhanced DEPLOYMENT.md with prevention rules and best practices
- Updated QUICKSTART.md with .nojekyll requirement
- Updated cursor rules (github.mdc) with critical deployment information

### Documentation
- Added comprehensive troubleshooting section for GitHub Pages deployment
- Added pre-deployment checklist to prevent common issues
- Added prevention rules for new projects, existing projects, and migrations
- Updated all internal documentation links to reflect new structure
- Reduced root directory clutter from 10 to 3 markdown files

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

