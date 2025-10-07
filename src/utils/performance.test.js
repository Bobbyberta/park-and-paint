/**
 * Unit tests for performance utilities
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  measureCoreWebVitals,
  measurePageLoad,
  monitorResourcePerformance,
  initializePerformanceMonitoring,
  getPerformanceSummary,
} from './performance.js';

describe('Performance Utilities', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Mock performance API
    global.performance = {
      getEntriesByType: vi.fn(),
      now: vi.fn(() => Date.now()),
    };

    // Mock PerformanceObserver
    global.PerformanceObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      callback,
    }));
  });

  describe('measureCoreWebVitals', () => {
    it('should set up LCP observer when PerformanceObserver is available', () => {
      measureCoreWebVitals();

      expect(global.PerformanceObserver).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle LCP measurement', () => {
      const mockObserver = {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };

      global.PerformanceObserver = vi.fn().mockImplementation((callback) => {
        // Simulate LCP entry
        const mockEntry = {
          startTime: 1000,
        };
        callback({ getEntries: () => [mockEntry] });
        return mockObserver;
      });

      measureCoreWebVitals();

      expect(global.PerformanceObserver).toHaveBeenCalled();
    });

    it('should handle FID measurement', () => {
      const mockObserver = {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };

      global.PerformanceObserver = vi.fn().mockImplementation((callback) => {
        // Simulate FID entry
        const mockEntry = {
          startTime: 100,
          processingStart: 150,
        };
        callback({ getEntries: () => [mockEntry] });
        return mockObserver;
      });

      measureCoreWebVitals();

      expect(global.PerformanceObserver).toHaveBeenCalled();
    });

    it('should handle CLS measurement', () => {
      const mockObserver = {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };

      global.PerformanceObserver = vi.fn().mockImplementation((callback) => {
        // Simulate CLS entry
        const mockEntry = {
          value: 0.1,
          hadRecentInput: false,
        };
        callback({ getEntries: () => [mockEntry] });
        return mockObserver;
      });

      measureCoreWebVitals();

      expect(global.PerformanceObserver).toHaveBeenCalled();
    });
  });

  describe('measurePageLoad', () => {
    it('should measure page load metrics', () => {
      const mockNavigation = {
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
      };

      global.performance.getEntriesByType = vi.fn().mockReturnValue([mockNavigation]);

      // Mock window.addEventListener
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      measurePageLoad();

      expect(addEventListenerSpy).toHaveBeenCalledWith('load', expect.any(Function));

      addEventListenerSpy.mockRestore();
    });
  });

  describe('monitorResourcePerformance', () => {
    it('should set up resource observer when PerformanceObserver is available', () => {
      monitorResourcePerformance();

      expect(global.PerformanceObserver).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should log slow resources in development', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      global.PerformanceObserver = vi.fn().mockImplementation((callback) => {
        const mockEntry = {
          name: 'slow-resource.js',
          duration: 2000, // 2 seconds
          transferSize: 1024,
        };
        callback({ getEntries: () => [mockEntry] });
        return { observe: vi.fn(), disconnect: vi.fn() };
      });

      monitorResourcePerformance();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Slow resource detected:',
        expect.objectContaining({
          name: 'slow-resource.js',
          duration: 2000,
        })
      );

      consoleSpy.mockRestore();
    });

    it('should log large resources in development', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      global.PerformanceObserver = vi.fn().mockImplementation((callback) => {
        const mockEntry = {
          name: 'large-image.jpg',
          duration: 500,
          transferSize: 2 * 1024 * 1024, // 2MB
        };
        callback({ getEntries: () => [mockEntry] });
        return { observe: vi.fn(), disconnect: vi.fn() };
      });

      monitorResourcePerformance();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Large resource detected:',
        expect.objectContaining({
          name: 'large-image.jpg',
          size: '2MB',
        })
      );

      consoleSpy.mockRestore();
    });
  });

  describe('initializePerformanceMonitoring', () => {
    it('should initialize monitoring in development', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      initializePerformanceMonitoring();

      expect(consoleSpy).toHaveBeenCalledWith('🚀 Performance monitoring initialized');

      consoleSpy.mockRestore();
    });

    it('should not initialize monitoring in production', () => {
      // Mock production environment
      const originalEnv = import.meta.env.DEV;
      import.meta.env.DEV = false;

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      initializePerformanceMonitoring();

      expect(consoleSpy).not.toHaveBeenCalledWith('🚀 Performance monitoring initialized');

      // Restore environment
      import.meta.env.DEV = originalEnv;
      consoleSpy.mockRestore();
    });
  });

  describe('getPerformanceSummary', () => {
    it('should return performance summary when navigation data is available', () => {
      const mockNavigation = {
        loadEventEnd: 2000,
        navigationStart: 0,
        domContentLoadedEventEnd: 1500,
      };

      const mockResources = [
        { transferSize: 1024, duration: 500 },
        { transferSize: 2048, duration: 1200 },
      ];

      global.performance.getEntriesByType = vi
        .fn()
        .mockReturnValueOnce([mockNavigation])
        .mockReturnValueOnce(mockResources);

      const summary = getPerformanceSummary();

      expect(summary).toEqual({
        pageLoad: 2000,
        domReady: 1500,
        resourceCount: 2,
        totalResourceSize: 3072,
        slowResources: 1,
        largeResources: 0,
      });
    });

    it('should return null when navigation data is not available', () => {
      global.performance.getEntriesByType = vi.fn().mockReturnValue([]);

      const summary = getPerformanceSummary();

      expect(summary).toBeNull();
    });
  });
});
