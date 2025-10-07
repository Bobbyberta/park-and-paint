/**
 * Test utilities and helpers
 * Shared functions for unit and integration tests
 */

import { vi } from 'vitest';

/**
 * Mock DOM environment for testing
 */
export function setupMockDOM() {
  // Mock document methods
  global.document = {
    ...global.document,
    getElementById: vi.fn(),
    querySelector: vi.fn(),
    querySelectorAll: vi.fn(),
    createElement: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };

  // Mock window methods
  global.window = {
    ...global.window,
    scrollTo: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    matchMedia: vi.fn(),
    performance: {
      getEntriesByType: vi.fn(),
      now: vi.fn(() => Date.now()),
    },
  };

  // Mock HTMLElement
  global.HTMLElement = class MockHTMLElement {
    constructor() {
      this.className = '';
      this.classList = {
        add: vi.fn(),
        remove: vi.fn(),
        contains: vi.fn(),
        toggle: vi.fn(),
      };
      this.style = {};
      this.textContent = '';
      this.innerHTML = '';
      this.setAttribute = vi.fn();
      this.getAttribute = vi.fn();
      this.addEventListener = vi.fn();
      this.removeEventListener = vi.fn();
      this.click = vi.fn();
      this.focus = vi.fn();
      this.blur = vi.fn();
    }
  };
}

/**
 * Create a mock element with common properties
 */
export function createMockElement(tagName = 'div', attributes = {}) {
  const element = new global.HTMLElement();
  element.tagName = tagName.toUpperCase();

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
}

/**
 * Mock Alpine.js for component tests
 */
export function mockAlpine() {
  global.Alpine = {
    start: vi.fn(),
    data: vi.fn(),
    directive: vi.fn(),
    plugin: vi.fn(),
  };
}

/**
 * Mock Leaflet for map tests
 */
export function mockLeaflet() {
  global.L = {
    map: vi.fn(() => ({
      setView: vi.fn(),
      invalidateSize: vi.fn(),
      addControl: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn(),
    })),
    marker: vi.fn(() => ({
      addTo: vi.fn(),
      bindPopup: vi.fn(),
      openPopup: vi.fn(),
      on: vi.fn(),
    })),
    Control: {
      extend: vi.fn(),
    },
    DomUtil: {
      create: vi.fn(() => createMockElement()),
    },
    Icon: {
      Default: {
        prototype: {
          _getIconUrl: vi.fn(),
        },
        mergeOptions: vi.fn(),
      },
    },
  };
}

/**
 * Wait for async operations to complete
 */
export function waitFor(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mock console methods and return restore function
 */
export function mockConsole() {
  const originalConsole = { ...console };
  const mockConsole = {};

  Object.keys(console).forEach((key) => {
    mockConsole[key] = vi.fn();
  });

  Object.assign(console, mockConsole);

  return () => {
    Object.assign(console, originalConsole);
  };
}

/**
 * Create a mock event
 */
export function createMockEvent(type, options = {}) {
  return {
    type,
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
    target: createMockElement(),
    currentTarget: createMockElement(),
    ...options,
  };
}

/**
 * Mock environment variables
 */
export function mockEnv(envVars = {}) {
  const originalEnv = import.meta.env;

  Object.defineProperty(import.meta, 'env', {
    value: {
      ...originalEnv,
      ...envVars,
    },
    writable: true,
  });

  return () => {
    Object.defineProperty(import.meta, 'env', {
      value: originalEnv,
      writable: true,
    });
  };
}

/**
 * Test data factories
 */
export const testData = {
  siteConfig: {
    site: {
      url: 'https://test.example.com',
      name: 'Test Site',
      description: 'Test description',
    },
    contact: {
      email: 'test@example.com',
      phone: '1234567890',
      phoneDisplay: '123 456 7890',
    },
    address: {
      street: '123 Test St',
      city: 'Test City',
      region: 'Test Region',
      country: 'Test Country',
      postcode: 'TE5T 1NG',
      full: '123 Test St, Test City, Test Region, Test Country, TE5T 1NG',
    },
    map: {
      centerLat: 51.5074,
      centerLng: -0.1278,
      zoom: 13,
    },
  },

  performanceEntry: {
    navigation: {
      domainLookupStart: 0,
      domainLookupEnd: 10,
      connectStart: 10,
      connectEnd: 20,
      requestStart: 20,
      responseStart: 30,
      responseEnd: 50,
      navigationStart: 0,
      domContentLoadedEventEnd: 100,
      loadEventEnd: 200,
    },
    resource: {
      name: 'test-resource.js',
      duration: 500,
      transferSize: 1024,
    },
    lcp: {
      startTime: 1000,
    },
    fid: {
      startTime: 100,
      processingStart: 150,
    },
    cls: {
      value: 0.1,
      hadRecentInput: false,
    },
  },
};

/**
 * Assertion helpers
 */
export const assertions = {
  /**
   * Check if element has proper accessibility attributes
   */
  hasAccessibilityAttributes(element, requiredAttrs = []) {
    const missingAttrs = requiredAttrs.filter((attr) => !element.getAttribute(attr));

    if (missingAttrs.length > 0) {
      throw new Error(`Missing accessibility attributes: ${missingAttrs.join(', ')}`);
    }

    return true;
  },

  /**
   * Check if element is properly styled
   */
  hasStyles(element, requiredStyles = {}) {
    const missingStyles = Object.entries(requiredStyles).filter(
      ([prop, value]) => element.style[prop] !== value
    );

    if (missingStyles.length > 0) {
      throw new Error(`Missing styles: ${missingStyles.map(([prop]) => prop).join(', ')}`);
    }

    return true;
  },
};
