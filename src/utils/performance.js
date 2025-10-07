/**
 * Performance Monitoring Utilities
 * Provides performance tracking and optimization insights
 */

// Only log in development
const isDev = import.meta.env.DEV;

/**
 * Measure Core Web Vitals
 */
export function measureCoreWebVitals() {
  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (isDev) console.log('LCP:', lastEntry.startTime);

      // Report to analytics if available
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          name: 'LCP',
          value: Math.round(lastEntry.startTime),
        });
      }
    });

    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  // First Input Delay (FID)
  if ('PerformanceObserver' in window) {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (isDev) console.log('FID:', entry.processingStart - entry.startTime);

        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'FID',
            value: Math.round(entry.processingStart - entry.startTime),
          });
        }
      });
    });

    fidObserver.observe({ entryTypes: ['first-input'] });
  }

  // Cumulative Layout Shift (CLS)
  if ('PerformanceObserver' in window) {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });

      if (isDev) console.log('CLS:', clsValue);

      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          name: 'CLS',
          value: Math.round(clsValue * 1000),
        });
      }
    });

    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }
}

/**
 * Measure page load performance
 */
export function measurePageLoad() {
  window.addEventListener('load', () => {
    // Navigation timing
    const navigation = performance.getEntriesByType('navigation')[0];

    if (navigation) {
      const metrics = {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        request: navigation.responseStart - navigation.requestStart,
        response: navigation.responseEnd - navigation.responseStart,
        dom: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        load: navigation.loadEventEnd - navigation.navigationStart,
      };

      if (isDev) console.log('Page Load Metrics:', metrics);

      // Report to analytics
      if (window.gtag) {
        window.gtag('event', 'page_load', {
          dns_time: Math.round(metrics.dns),
          tcp_time: Math.round(metrics.tcp),
          request_time: Math.round(metrics.request),
          response_time: Math.round(metrics.response),
          dom_time: Math.round(metrics.dom),
          load_time: Math.round(metrics.load),
        });
      }
    }
  });
}

/**
 * Monitor resource loading performance
 */
export function monitorResourcePerformance() {
  if ('PerformanceObserver' in window) {
    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      entries.forEach((entry) => {
        // Log slow resources (> 1 second)
        if (entry.duration > 1000 && isDev) {
          console.warn('Slow resource detected:', {
            name: entry.name,
            duration: Math.round(entry.duration),
            size: entry.transferSize || 0,
          });
        }

        // Log large resources (> 1MB)
        if (entry.transferSize && entry.transferSize > 1024 * 1024 && isDev) {
          console.warn('Large resource detected:', {
            name: entry.name,
            size: Math.round(entry.transferSize / 1024 / 1024) + 'MB',
          });
        }
      });
    });

    resourceObserver.observe({ entryTypes: ['resource'] });
  }
}

/**
 * Initialize performance monitoring
 */
export function initializePerformanceMonitoring() {
  // Only run in development or when explicitly enabled
  if (import.meta.env.DEV || import.meta.env.VITE_PERFORMANCE_MONITORING === 'true') {
    if (isDev) console.log('🚀 Performance monitoring initialized');

    measureCoreWebVitals();
    measurePageLoad();
    monitorResourcePerformance();

    // Log performance tips
    if (isDev) {
      setTimeout(() => {
        console.log('💡 Performance Tips:');
        console.log('- Use WebP images for better compression');
        console.log('- Implement lazy loading for images below the fold');
        console.log('- Minimize JavaScript bundle size');
        console.log('- Use CDN for static assets');
        console.log('- Enable compression (gzip/brotli)');
      }, 2000);
    }
  }
}

/**
 * Get performance summary
 */
export function getPerformanceSummary() {
  const navigation = performance.getEntriesByType('navigation')[0];
  const resources = performance.getEntriesByType('resource');

  if (!navigation) return null;

  const summary = {
    pageLoad: Math.round(navigation.loadEventEnd - navigation.navigationStart),
    domReady: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
    resourceCount: resources.length,
    totalResourceSize: resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0),
    slowResources: resources.filter((r) => r.duration > 1000).length,
    largeResources: resources.filter((r) => r.transferSize && r.transferSize > 1024 * 1024).length,
  };

  return summary;
}
