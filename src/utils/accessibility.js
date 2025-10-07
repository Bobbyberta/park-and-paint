/**
 * Accessibility Utilities
 * Helper functions for accessibility features
 */

/**
 * Utility function to announce messages to screen readers
 * @param {string} message - The message to announce
 */
export function announceToScreenReader(message) {
  // Check if announcement area already exists
  let announcer = document.getElementById('screen-reader-announcer');

  if (!announcer) {
    // Create a visually hidden element for screen reader announcements
    announcer = document.createElement('div');
    announcer.id = 'screen-reader-announcer';
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
  }

  // Clear and set new message
  announcer.textContent = '';
  setTimeout(() => {
    announcer.textContent = message;
  }, 100);
}

/**
 * Add smooth scrolling for anchor links
 */
export function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Don't prevent default for non-section links
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        // Account for fixed header
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Focus on target for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });
}

/**
 * Initialize keyboard navigation for custom components
 */
export function initializeKeyboardNavigation() {
  // Add keyboard support for custom interactive elements
  document.addEventListener('keydown', (e) => {
    // Handle Escape key for closing modals/menus
    if (e.key === 'Escape') {
      const mobileMenuButton = document.querySelector('[aria-expanded="true"]');
      if (mobileMenuButton) {
        mobileMenuButton.click();
        mobileMenuButton.focus();
      }
    }
  });
}

/**
 * Add focus management for dynamic content
 */
export function manageFocus() {
  // Ensure focus is visible for keyboard users
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
}
