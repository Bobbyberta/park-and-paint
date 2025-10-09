# Development Guide

This document provides comprehensive information for developers working on the Park and Paint website.

## 🏗️ Project Structure

```
park-and-paint/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml          # GitHub Actions CI/CD
│   └── dependabot.yml          # Automated dependency updates
├── .husky/
│   └── pre-commit              # Git hooks for code quality
├── public/
│   ├── images/                 # Static images
│   ├── favicon.ico             # Site favicon
│   └── robots.txt              # SEO crawler instructions
├── scripts/
│   └── optimize-images.js      # Image optimization utilities
├── src/
│   ├── components/
│   │   ├── map.js              # Leaflet map component
│   │   └── navigation.js       # Navigation functionality
│   ├── config/
│   │   └── site-config.js      # Centralized configuration
│   ├── utils/
│   │   ├── accessibility.js    # Accessibility utilities
│   │   ├── constants.js        # Application constants
│   │   ├── image-optimization.js # Image optimization
│   │   └── performance.js      # Performance monitoring
│   ├── styles/
│   │   └── main.css            # Tailwind + custom styles
│   └── main.js                 # Application entry point
├── .env.example                # Environment variables template
├── .eslintrc.json             # ESLint configuration
├── .gitignore                 # Git ignore rules
├── .husky/                    # Git hooks
├── .prettierrc                # Prettier configuration
├── index.html                 # Main HTML file
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind customization
├── vite.config.js             # Vite build configuration
├── ENVIRONMENT.md             # Environment configuration guide
└── README.md                  # Project overview
```

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ (20+ recommended)
- npm (comes with Node.js)
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd park-and-paint

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env.local

# Start development server
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint and auto-fix issues |
| `npm run format` | Format code with Prettier |
| `npm run optimize-images` | Analyze and optimize images |
| `npm run bundle-analyze` | Analyze bundle size and composition |
| `npm run analyze` | Run image optimization + build |

## 🏛️ Architecture

### Component System
The application uses a modular component system:

- **Components** (`src/components/`): Reusable UI components
- **Utils** (`src/utils/`): Helper functions and utilities
- **Config** (`src/config/`): Centralized configuration
- **Styles** (`src/styles/`): CSS and styling

### Key Technologies
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Alpine.js**: Lightweight JavaScript framework
- **Leaflet.js**: Interactive maps
- **ESLint + Prettier**: Code quality and formatting

## 🔧 Configuration

### Environment Variables
See [ENVIRONMENT.md](./ENVIRONMENT.md) for detailed environment configuration.

Key variables:
- `VITE_SITE_URL`: Website URL
- `VITE_CONTACT_EMAIL`: Contact email
- `VITE_MAP_CENTER_LAT/LNG`: Map coordinates

### Tailwind Configuration
Custom configuration in `tailwind.config.js`:
- Brand colors and custom palette
- Typography scale (heading-1 through heading-6)
- Custom spacing and sizing
- Font families (Barlow, Work Sans)

## 🎨 Styling Guidelines

### CSS Architecture
- **Base Layer**: Global styles and resets
- **Components Layer**: Reusable component styles
- **Utilities Layer**: Custom utility classes

### Design System
- **Colors**: Primary brand colors, semantic grays
- **Typography**: Barlow for headings, Work Sans for body
- **Spacing**: Consistent Tailwind spacing scale
- **Responsive**: Mobile-first approach

### Accessibility
- WCAG 2.1 AA compliance
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## 🚀 Performance

### Optimization Features
- **Code Splitting**: Automatic chunk splitting for better caching
- **Image Optimization**: WebP support and lazy loading
- **Bundle Analysis**: Performance monitoring and analysis
- **Tree Shaking**: Dead code elimination
- **Minification**: Production build optimization

### Performance Monitoring
- Core Web Vitals tracking (LCP, FID, CLS)
- Resource loading monitoring
- Bundle size analysis
- Development performance insights

### Best Practices
- Lazy load images below the fold
- Use WebP format for images
- Minimize JavaScript bundle size
- Optimize critical rendering path
- Implement proper caching strategies

## 🔍 Code Quality

### Linting and Formatting
- **ESLint**: JavaScript code quality
- **Prettier**: Code formatting
- **Pre-commit Hooks**: Automated quality checks

### Git Workflow
- **Pre-commit Hooks**: Automatic linting and formatting
- **Conventional Commits**: Structured commit messages
- **Branch Protection**: Required reviews for main branch

### Code Standards
- ES6+ JavaScript features
- Modular component architecture
- Consistent naming conventions
- Comprehensive error handling
- Accessibility-first development

## 🧪 Testing

### Manual Testing Checklist
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness (320px - 1440px+)
- [ ] Accessibility with screen readers
- [ ] Performance on slow connections
- [ ] SEO meta tags and structured data

### Performance Testing
- Lighthouse audits (Performance, Accessibility, SEO)
- Core Web Vitals measurement
- Bundle size monitoring
- Image optimization verification

## 🚀 Deployment

### GitHub Actions
Automated deployment pipeline:
1. Code quality checks (ESLint, Prettier)
2. Build process with Vite
3. Deployment to GitHub Pages
4. Performance monitoring

### Environment-Specific Builds
- Development: Hot reload, source maps, debugging
- Production: Optimized, minified, compressed

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Build passes without errors
- [ ] Performance metrics meet targets
- [ ] SEO and accessibility validated
- [ ] Cross-browser testing completed

## 🔧 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for syntax errors
npm run lint
```

#### Performance Issues
```bash
# Analyze bundle size
npm run bundle-analyze

# Check image optimization
npm run optimize-images
```

#### Development Server Issues
```bash
# Check port availability
lsof -ti:3000

# Clear Vite cache
rm -rf node_modules/.vite
```

### Debug Mode
Enable performance monitoring:
```bash
VITE_PERFORMANCE_MONITORING=true npm run dev
```

## 📚 Resources

### Documentation
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Alpine.js](https://alpinejs.dev/)
- [Leaflet.js](https://leafletjs.com/)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [Squoosh](https://squoosh.app/) (Image optimization)

### Performance
- [Core Web Vitals](https://web.dev/vitals/)
- [Web.dev Performance](https://web.dev/performance/)
- [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Make changes following coding standards
3. Test thoroughly (manual + automated)
4. Run pre-commit hooks
5. Create pull request with description
6. Address review feedback
7. Merge after approval

### Code Review Guidelines
- Functionality and correctness
- Performance implications
- Accessibility compliance
- Code quality and maintainability
- Documentation updates

---

**Happy coding! 🎉**

For questions or support, please refer to the [README.md](../README.md) or open an issue.
