// Import Alpine.js for reactive UI components
import Alpine from 'alpinejs';

// Import Leaflet CSS (included in HTML, but imported here for Vite bundling)
import 'leaflet/dist/leaflet.css';

// Import main styles
import './styles/main.css';

// Import components
import { initializeMap } from './components/map.js';
import { initializeNavigation, initializeScrollNavigation } from './components/navigation.js';

// Import utilities
import {
  initializeSmoothScrolling,
  initializeKeyboardNavigation,
  manageFocus,
} from './utils/accessibility.js';
import { initializeLazyLoading } from './utils/image-optimization.js';
import { initializePerformanceMonitoring } from './utils/performance.js';

// Initialize Alpine.js
window.Alpine = Alpine;
Alpine.start();

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize map
  initializeMap();

  // Initialize navigation
  initializeNavigation();
  initializeScrollNavigation();

  // Initialize accessibility features
  initializeSmoothScrolling();
  initializeKeyboardNavigation();
  manageFocus();

  // Initialize image optimization
  initializeLazyLoading();

  // Initialize performance monitoring (development only)
  initializePerformanceMonitoring();
});

// Contact form handling is now managed by contact-form.js component
