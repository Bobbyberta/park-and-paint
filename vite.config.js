import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  // Set base to '/' for root deployment or '/repo-name/' for GitHub Pages project site
  base: '/',
  
  // Environment variables configuration
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  
  build: {
    // Output directory for production build
    outDir: 'dist',
    
    // Generate sourcemaps for debugging
    sourcemap: false,
    
    // Minify for production
    minify: 'terser',
    
    // Asset optimization
    assetsInlineLimit: 4096,
    
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          'leaflet': ['leaflet'],
          'alpine': ['alpinejs']
        }
      }
    }
  },
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    }
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    }
  },
  
  // Plugins
  plugins: [
    // Bundle analyzer - only run when ANALYZE=true
    process.env.ANALYZE && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ].filter(Boolean),
});

