/**
 * Test Setup File
 * Global test configuration and utilities
 */

import '@testing-library/jest-dom';

// Mock environment variables for testing
Object.defineProperty(import.meta, 'env', {
  value: {
    DEV: true,
    VITE_SITE_URL: 'http://localhost:3000',
    VITE_SITE_NAME: 'Park and Paint',
    VITE_SITE_DESCRIPTION: 'Test description',
    VITE_CONTACT_EMAIL: 'test@parkandpaint.co.uk',
    VITE_PHONE_NUMBER: '07732441000',
    VITE_PHONE_DISPLAY: '07732 44 1000',
    VITE_ADDRESS_STREET: '7 Ferry Court',
    VITE_ADDRESS_CITY: 'Bath',
    VITE_ADDRESS_REGION: 'England',
    VITE_ADDRESS_COUNTRY: 'United Kingdom',
    VITE_ADDRESS_POSTCODE: 'BA2 4JW',
    VITE_ADDRESS_FULL: '7 Ferry Court, Bath, England, United Kingdom, BA2 4JW',
    VITE_MAP_CENTER_LAT: '51.3792880272762',
    VITE_MAP_CENTER_LNG: '-2.3531900513862065',
    VITE_MAP_ZOOM: '13',
    VITE_HOURS_MONDAY_THURSDAY: '7:30 AM - 4:00 PM',
    VITE_HOURS_FRIDAY_SATURDAY: 'By Appointment',
    VITE_HOURS_SUNDAY: 'Closed',
  },
  writable: true,
});

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock PerformanceObserver
global.PerformanceObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock Leaflet for map tests
vi.mock('leaflet', () => {
  const mockMap = {
    setView: vi.fn(),
    invalidateSize: vi.fn(),
    addControl: vi.fn(),
    addEventListener: vi.fn(),
  };

  const mockMarker = {
    addTo: vi.fn().mockReturnThis(),
    bindPopup: vi.fn().mockReturnThis(),
    openPopup: vi.fn().mockReturnThis(),
    on: vi.fn().mockReturnThis(),
  };

  const mockTileLayer = {
    addTo: vi.fn().mockReturnThis(),
  };

  const mockControl = {
    onAdd: vi.fn(),
  };

  // Mock Control.extend to return a constructor function
  const mockControlConstructor = vi.fn(() => mockControl);

  return {
    default: {
      map: vi.fn(() => mockMap),
      tileLayer: vi.fn(() => mockTileLayer),
      marker: vi.fn(() => mockMarker),
      Control: {
        extend: vi.fn(() => mockControlConstructor),
      },
      DomUtil: {
        create: vi.fn(() => ({
          innerHTML: '',
          style: {},
          onclick: null,
          setAttribute: vi.fn(),
          addEventListener: vi.fn(),
        })),
      },
      Icon: {
        Default: {
          prototype: {
            _getIconUrl: vi.fn(),
          },
          mergeOptions: vi.fn(),
        },
      },
    },
  };
});

// Mock Alpine.js
vi.mock('alpinejs', () => ({
  default: {
    start: vi.fn(),
  },
}));

// Setup global test utilities
global.testUtils = {
  // Helper to create a mock DOM element
  createMockElement: (tagName = 'div', attributes = {}) => {
    const element = document.createElement(tagName);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    return element;
  },

  // Helper to wait for async operations
  waitFor: (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms)),

  // Helper to mock console methods
  mockConsole: () => {
    const originalConsole = { ...console };
    Object.keys(console).forEach((key) => {
      // eslint-disable-next-line no-console
      console[key] = vi.fn();
    });
    return () => {
      Object.assign(console, originalConsole);
    };
  },
};
