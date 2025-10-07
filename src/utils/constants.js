/**
 * Application Constants
 * Centralized constants for the application
 */

// Animation durations
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Header configuration
export const HEADER_CONFIG = {
  HEIGHT: 80,
  SCROLL_OFFSET: 80,
};

// Map configuration
export const MAP_CONFIG = {
  TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  MAX_ZOOM: 19,
  MIN_ZOOM: 3,
};

// Form configuration
export const FORM_CONFIG = {
  DEBOUNCE_DELAY: 300,
  SUBMIT_TIMEOUT: 5000,
};

// Accessibility configuration
export const A11Y_CONFIG = {
  FOCUS_VISIBLE_CLASS: 'keyboard-navigation',
  SCREEN_READER_CLASS: 'sr-only',
  ANNOUNCER_ID: 'screen-reader-announcer',
};

// Performance configuration
export const PERFORMANCE_CONFIG = {
  LAZY_LOAD_THRESHOLD: 100,
  DEBOUNCE_DELAY: 100,
  THROTTLE_DELAY: 16, // ~60fps
};
