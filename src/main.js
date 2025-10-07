// Import Alpine.js for reactive UI components
import Alpine from 'alpinejs';

// Import Leaflet CSS (included in HTML, but imported here for Vite bundling)
import 'leaflet/dist/leaflet.css';

// Import main styles
import './styles/main.css';

// Import site configuration
import { siteConfig } from './config/site-config.js';

// Import components
import { initializeMap } from './components/map.js';
import { initializeNavigation, initializeScrollNavigation } from './components/navigation.js';

// Import utilities
import {
  initializeSmoothScrolling,
  initializeKeyboardNavigation,
  manageFocus,
  announceToScreenReader,
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

// Handle form submission (placeholder - replace with actual form handling)
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('form[aria-label="Contact form"]');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // TODO: Replace with actual form submission logic
      // For now, just log and show an alert
      console.log('Form submitted:', data);

      alert(
        'Thank you for your message! We will get back to you soon.\n\n(Note: This is a demo. Connect to a real form handler to enable submissions.)'
      );

      // Reset form
      contactForm.reset();

      // Announce to screen readers
      announceToScreenReader('Form submitted successfully. We will contact you soon.');
    });
  }
});
