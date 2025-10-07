/**
 * Unit tests for map component
 */

import { describe, it, expect, vi, afterEach } from 'vitest';

describe('Map Component', () => {
  afterEach(async () => {
    // Clean up any timeouts from map initialization
    const mapModule = await import('../components/map.js');
    if (mapModule.cleanupMapTimeouts) {
      mapModule.cleanupMapTimeouts();
    }
  });

  describe('module structure', () => {
    it('should export initializeMap function', async () => {
      // Import the module dynamically to avoid PNG import issues
      const mapModule = await import('../components/map.js');
      expect(mapModule).toHaveProperty('initializeMap');
      expect(typeof mapModule.initializeMap).toBe('function');
    });

    it('should export cleanupMapTimeouts function', async () => {
      const mapModule = await import('../components/map.js');
      expect(mapModule).toHaveProperty('cleanupMapTimeouts');
      expect(typeof mapModule.cleanupMapTimeouts).toBe('function');
    });

    it('should handle missing map container gracefully', async () => {
      // Mock document.getElementById to return null
      const originalGetElementById = document.getElementById;
      document.getElementById = vi.fn().mockReturnValue(null);

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const { initializeMap } = await import('../components/map.js');
      initializeMap();

      expect(consoleSpy).toHaveBeenCalledWith('Map container not found');

      // Restore original function
      document.getElementById = originalGetElementById;
      consoleSpy.mockRestore();
    });

    it('should handle map container existence', async () => {
      // Mock document.getElementById to return a valid element
      const mockElement = {
        id: 'mapContainer',
        style: {},
      };

      const originalGetElementById = document.getElementById;
      document.getElementById = vi.fn().mockReturnValue(mockElement);

      const { initializeMap } = await import('../components/map.js');
      initializeMap();

      // Should not warn about missing container
      expect(document.getElementById).toHaveBeenCalledWith('mapContainer');

      // Restore original function
      document.getElementById = originalGetElementById;
    });
  });
});
