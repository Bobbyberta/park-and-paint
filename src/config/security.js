/**
 * Security Configuration
 * Content Security Policy and security headers configuration
 */

/**
 * Generate Content Security Policy
 * @param {boolean} isProduction - Whether this is a production build
 * @returns {string} CSP header value
 */
export function generateCSP(isProduction = false) {
  const basePolicy = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Required for Alpine.js inline expressions
      "'unsafe-eval'", // Required for Alpine.js dynamic evaluation
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for inline styles
      'fonts.googleapis.com',
      'https://unpkg.com', // For Leaflet CSS
    ],
    'font-src': ['fonts.gstatic.com'],
    'img-src': [
      "'self'",
      'data:',
      'https:', // Allow all HTTPS images (for maps, etc.)
    ],
    'connect-src': ["'self'", 'https://*.tile.openstreetmap.org', 'https://tile.openstreetmap.org'],
    'frame-src': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  };

  // In production, we could make the CSP stricter
  if (isProduction) {
    // Remove unsafe-eval in production if possible
    // This would require refactoring Alpine.js usage
    // basePolicy['script-src'] = basePolicy['script-src'].filter(src => src !== "'unsafe-eval'");
  }

  // Convert to CSP string
  return Object.entries(basePolicy)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
}

/**
 * Security headers for development server
 */
export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
};

/**
 * Production security headers (for deployment)
 */
export const productionSecurityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
};

/**
 * CSP for meta tag (less strict than HTTP headers)
 */
export function getMetaCSP() {
  return generateCSP(false);
}
