/**
 * Navigation Component
 * Handles navigation functionality and mobile menu
 */

import { announceToScreenReader } from '../utils/accessibility.js';

/**
 * Initialize navigation functionality
 */
export function initializeNavigation() {
  // Mobile menu functionality is handled by Alpine.js
  // This function can be extended for additional navigation features

  // Add click handlers for navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      // Close mobile menu if open
      const mobileMenuButton = document.querySelector('[aria-expanded="true"]');
      if (mobileMenuButton) {
        mobileMenuButton.click();
      }

      // Announce navigation to screen readers
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const sectionName = targetSection.querySelector('h1, h2, h3')?.textContent || 'section';
        announceToScreenReader(`Navigating to ${sectionName}`);
      }
    });
  });
}

/**
 * Add scroll-based navigation highlighting
 */
export function initializeScrollNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove active class from all links
          navLinks.forEach((link) => link.classList.remove('active'));

          // Add active class to current section's link
          const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    },
    {
      rootMargin: '-80px 0px -50% 0px', // Account for fixed header
      threshold: 0.1,
    }
  );

  sections.forEach((section) => observer.observe(section));
}
