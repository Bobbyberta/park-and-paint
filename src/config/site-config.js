/**
 * Site Configuration
 * Centralized configuration for the Park and Paint website
 * This can be extended to use environment variables in the future
 */

export const siteConfig = {
  // Site Information
  site: {
    url: import.meta.env.VITE_SITE_URL || 'https://www.parkandpaint.co.uk',
    name: import.meta.env.VITE_SITE_NAME || 'Park and Paint',
    description:
      import.meta.env.VITE_SITE_DESCRIPTION ||
      'Professional car paint repair and SMART repair services in Bath, England',
  },

  // Contact Information
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'stuart@parkandpaint.co.uk',
    phone: import.meta.env.VITE_PHONE_NUMBER || '07732441000',
    phoneDisplay: import.meta.env.VITE_PHONE_DISPLAY || '07732 44 1000',
    // Obfuscated versions for security
    emailObfuscated: 'a3Uub2MudG5pYXBkbmFrcmFwQHRyYXV0cw==',
    phoneObfuscated: 'MDc3MzI0NDEwMDA=',
  },

  // Business Address
  address: {
    street: import.meta.env.VITE_ADDRESS_STREET || '7 Ferry Court',
    city: import.meta.env.VITE_ADDRESS_CITY || 'Bath',
    region: import.meta.env.VITE_ADDRESS_REGION || 'England',
    country: import.meta.env.VITE_ADDRESS_COUNTRY || 'United Kingdom',
    postcode: import.meta.env.VITE_ADDRESS_POSTCODE || 'BA2 4JW',
    full:
      import.meta.env.VITE_ADDRESS_FULL || '7 Ferry Court, Bath, England, United Kingdom, BA2 4JW',
  },

  // Map Configuration
  map: {
    centerLat: parseFloat(import.meta.env.VITE_MAP_CENTER_LAT || '51.3792880272762'),
    centerLng: parseFloat(import.meta.env.VITE_MAP_CENTER_LNG || '-2.3531900513862065'),
    zoom: parseInt(import.meta.env.VITE_MAP_ZOOM || '11'),
  },

  // Business Hours
  hours: {
    mondayThursday: import.meta.env.VITE_HOURS_MONDAY_THURSDAY || '7:30 AM - 4:00 PM',
    fridaySaturday: import.meta.env.VITE_HOURS_FRIDAY_SATURDAY || 'By Appointment',
    sunday: import.meta.env.VITE_HOURS_SUNDAY || 'Closed',
  },

  // Social Media (for future use)
  social: {
    facebook: import.meta.env.VITE_SOCIAL_FACEBOOK || '',
    twitter: import.meta.env.VITE_SOCIAL_TWITTER || '',
    instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || '',
  },

  // Analytics (for future use)
  analytics: {
    gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID || '',
    gtmId: import.meta.env.VITE_GTM_ID || '',
  },

  // SEO Configuration
  seo: {
    defaultTitle: 'Car Paint Repair | Park and Paint | Bath | England',
    defaultDescription:
      'Park and Paint repairs the scratches and scuffs on your car. Professional SMART repair services in Bath, England. Mobile car paint repair at your convenience.',
    defaultKeywords:
      'car paint repair, scratch repair, SMART repair, mobile car repair, Bath, car body repair, scuff repair',
    ogImage: '/images/og-image.jpg',
    twitterImage: '/images/twitter-image.jpg',
  },
};

// Export individual configurations for easy access
export const { site, contact, address, map, hours, social, analytics, seo } = siteConfig;
