/**
 * Unit tests for accessibility utilities
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  announceToScreenReader,
  initializeSmoothScrolling,
  initializeKeyboardNavigation,
  manageFocus,
} from '../utils/accessibility.js';

describe('Accessibility Utilities', () => {
  beforeEach(() => {
    // Clean up DOM before each test
    document.body.innerHTML = '';
  });

  describe('announceToScreenReader', () => {
    it('should create announcer element if it does not exist', () => {
      announceToScreenReader('Test message');

      const announcer = document.getElementById('screen-reader-announcer');
      expect(announcer).toBeTruthy();
      expect(announcer.getAttribute('role')).toBe('status');
      expect(announcer.getAttribute('aria-live')).toBe('polite');
      expect(announcer.getAttribute('aria-atomic')).toBe('true');
      expect(announcer.className).toBe('sr-only');
    });

    it('should reuse existing announcer element', () => {
      // Create initial announcer
      announceToScreenReader('First message');
      const firstAnnouncer = document.getElementById('screen-reader-announcer');

      // Announce second message
      announceToScreenReader('Second message');
      const secondAnnouncer = document.getElementById('screen-reader-announcer');

      expect(firstAnnouncer).toBe(secondAnnouncer);
    });

    it('should set message content after timeout', async () => {
      vi.useFakeTimers();

      announceToScreenReader('Test message');
      const announcer = document.getElementById('screen-reader-announcer');

      // Message should be empty initially
      expect(announcer.textContent).toBe('');

      // Fast-forward time
      vi.advanceTimersByTime(100);
      await vi.runAllTimersAsync();

      expect(announcer.textContent).toBe('Test message');

      vi.useRealTimers();
    });
  });

  describe('initializeSmoothScrolling', () => {
    it('should add click listeners to anchor links', () => {
      // Create test anchor links
      const anchor1 = document.createElement('a');
      anchor1.href = '#section1';
      document.body.appendChild(anchor1);

      const anchor2 = document.createElement('a');
      anchor2.href = '#section2';
      document.body.appendChild(anchor2);

      // Create target elements
      const section1 = document.createElement('div');
      section1.id = 'section1';
      document.body.appendChild(section1);

      const section2 = document.createElement('div');
      section2.id = 'section2';
      document.body.appendChild(section2);

      // Mock scrollTo
      const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

      initializeSmoothScrolling();

      // Simulate click on first anchor
      anchor1.click();

      expect(scrollToSpy).toHaveBeenCalledWith({
        top: expect.any(Number),
        behavior: 'smooth',
      });

      scrollToSpy.mockRestore();
    });

    it('should not prevent default for hash-only links', () => {
      const anchor = document.createElement('a');
      anchor.href = '#';
      document.body.appendChild(anchor);

      const preventDefaultSpy = vi.spyOn(Event.prototype, 'preventDefault');

      initializeSmoothScrolling();
      anchor.click();

      expect(preventDefaultSpy).not.toHaveBeenCalled();

      preventDefaultSpy.mockRestore();
    });
  });

  describe('initializeKeyboardNavigation', () => {
    it('should handle Escape key for mobile menu', () => {
      // Create mobile menu button
      const menuButton = document.createElement('button');
      menuButton.setAttribute('aria-expanded', 'true');
      document.body.appendChild(menuButton);

      const clickSpy = vi.spyOn(menuButton, 'click');
      const focusSpy = vi.spyOn(menuButton, 'focus');

      initializeKeyboardNavigation();

      // Simulate Escape key press
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);

      expect(clickSpy).toHaveBeenCalled();
      expect(focusSpy).toHaveBeenCalled();

      clickSpy.mockRestore();
      focusSpy.mockRestore();
    });
  });

  describe('manageFocus', () => {
    it('should add keyboard-navigation class on Tab key', () => {
      manageFocus();

      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
      document.dispatchEvent(tabEvent);

      expect(document.body.classList.contains('keyboard-navigation')).toBe(true);
    });

    it('should remove keyboard-navigation class on mouse down', () => {
      manageFocus();

      // First add the class
      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
      document.dispatchEvent(tabEvent);
      expect(document.body.classList.contains('keyboard-navigation')).toBe(true);

      // Then remove it with mouse down
      const mouseEvent = new MouseEvent('mousedown');
      document.dispatchEvent(mouseEvent);

      expect(document.body.classList.contains('keyboard-navigation')).toBe(false);
    });
  });
});
