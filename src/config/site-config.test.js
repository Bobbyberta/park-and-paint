/**
 * Unit tests for site configuration
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { siteConfig } from '../config/site-config.js';

describe('Site Configuration', () => {
  beforeEach(() => {
    // Reset environment variables to defaults
    Object.defineProperty(import.meta, 'env', {
      value: {
        VITE_SITE_URL: 'https://www.parkandpaint.co.uk',
        VITE_SITE_NAME: 'Park and Paint',
        VITE_SITE_DESCRIPTION:
          'Professional car paint repair and SMART repair services in Bath, England',
        VITE_CONTACT_EMAIL: 'stuart@parkandpaint.co.uk',
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
  });

  describe('site configuration', () => {
    it('should have correct site information', () => {
      expect(siteConfig.site.url).toBe('https://www.parkandpaint.co.uk');
      expect(siteConfig.site.name).toBe('Park and Paint');
      expect(siteConfig.site.description).toBe(
        'Professional car paint repair and SMART repair services in Bath, England'
      );
    });

    it('should have correct contact information', () => {
      expect(siteConfig.contact.email).toBe('stuart@parkandpaint.co.uk');
      expect(siteConfig.contact.phone).toBe('07732441000');
      expect(siteConfig.contact.phoneDisplay).toBe('07732 44 1000');
    });

    it('should have correct address information', () => {
      expect(siteConfig.address.street).toBe('7 Ferry Court');
      expect(siteConfig.address.city).toBe('Bath');
      expect(siteConfig.address.region).toBe('England');
      expect(siteConfig.address.country).toBe('United Kingdom');
      expect(siteConfig.address.postcode).toBe('BA2 4JW');
      expect(siteConfig.address.full).toBe('7 Ferry Court, Bath, England, United Kingdom, BA2 4JW');
    });

    it('should have correct map configuration', () => {
      expect(siteConfig.map.centerLat).toBe(51.3792880272762);
      expect(siteConfig.map.centerLng).toBe(-2.3531900513862065);
      expect(siteConfig.map.zoom).toBe(13);
    });

    it('should have correct business hours', () => {
      expect(siteConfig.hours.mondayThursday).toBe('7:30 AM - 4:00 PM');
      expect(siteConfig.hours.fridaySaturday).toBe('By Appointment');
      expect(siteConfig.hours.sunday).toBe('Closed');
    });

    it('should have SEO configuration', () => {
      expect(siteConfig.seo.defaultTitle).toBe(
        'Car Paint Repair | Park and Paint | Bath | England'
      );
      expect(siteConfig.seo.defaultDescription).toBe(
        'Park and Paint repairs the scratches and scuffs on your car. Professional SMART repair services in Bath, England. Mobile car paint repair at your convenience.'
      );
      expect(siteConfig.seo.defaultKeywords).toBe(
        'car paint repair, scratch repair, SMART repair, mobile car repair, Bath, car body repair, scuff repair'
      );
      expect(siteConfig.seo.ogImage).toBe('/images/og-image.jpg');
      expect(siteConfig.seo.twitterImage).toBe('/images/twitter-image.jpg');
    });
  });

  describe('environment variable handling', () => {
    it('should have environment variables available', () => {
      // Test that environment variables are accessible
      expect(import.meta.env.VITE_SITE_URL).toBeDefined();
      expect(import.meta.env.VITE_SITE_NAME).toBeDefined();
      expect(import.meta.env.VITE_CONTACT_EMAIL).toBeDefined();
    });

    it('should use default values when environment variables are not set', () => {
      // Test that the config uses the expected default values
      expect(siteConfig.site.url).toBe('https://www.parkandpaint.co.uk');
      expect(siteConfig.site.name).toBe('Park and Paint');
      expect(siteConfig.contact.email).toBe('stuart@parkandpaint.co.uk');
    });
  });

  describe('data types', () => {
    it('should parse numeric values correctly', () => {
      expect(typeof siteConfig.map.centerLat).toBe('number');
      expect(typeof siteConfig.map.centerLng).toBe('number');
      expect(typeof siteConfig.map.zoom).toBe('number');
    });

    it('should handle string values correctly', () => {
      expect(typeof siteConfig.site.url).toBe('string');
      expect(typeof siteConfig.site.name).toBe('string');
      expect(typeof siteConfig.contact.email).toBe('string');
    });
  });
});
