/**
 * Map Component
 * Handles Leaflet map initialization and functionality
 */

import L from 'leaflet';
import { siteConfig } from '../config/site-config.js';

// Fix for Leaflet marker icons (required when using Leaflet with bundlers)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configure Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

/**
 * Initialize Leaflet map with markers
 * Displays service locations across the UK
 */
export function initializeMap() {
  // Check if map container exists
  const mapContainer = document.getElementById('mapContainer');
  if (!mapContainer) {
    console.warn('Map container not found');
    return;
  }

  // Initialize map using configuration
  const mapZoom = parseInt(import.meta.env.VITE_MAP_ZOOM || '11');
  console.log('Map zoom level:', mapZoom);
  const map = L.map('mapContainer', {
    center: [siteConfig.map.centerLat, siteConfig.map.centerLng],
    zoom: mapZoom,
    scrollWheelZoom: false,
    attributionControl: true,
  });

  // Add grayscale OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    minZoom: 3,
    className: 'grayscale-map',
    // Add cache busting to ensure fresh tiles
    version: '1.0.0',
  }).addTo(map);

  // Our location using configuration
  const location = {
    name: siteConfig.site.name,
    coords: [siteConfig.map.centerLat, siteConfig.map.centerLng],
    description: `${siteConfig.address.full} - Mobile car paint repair service in Bath and surrounding areas`,
    phone: siteConfig.contact.phoneDisplay,
    address: `${siteConfig.address.street}, ${siteConfig.address.postcode}, ${siteConfig.address.city}, ${siteConfig.address.region}`,
  };

  // Add marker for our location
  const marker = L.marker(location.coords)
    .addTo(map)
    .bindPopup(
      `
      <div class="p-3">
        <p class="text-sm text-gray-700 mb-3">${location.address}</p>
        <a 
          href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.address.full)}" 
          target="_blank" 
          rel="noopener noreferrer"
          style="display: inline-flex; align-items: center; justify-content: center; width: 100%; padding: 8px 12px; background-color: #006DE0; color: white; font-size: 14px; font-weight: 500; border-radius: 8px; text-decoration: none; transition: background-color 200ms;"
          onmouseover="this.style.backgroundColor='#0056b3'"
          onmouseout="this.style.backgroundColor='#006DE0'"
          aria-label="Get directions to ${location.name} on Google Maps"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
          </svg>
          Get Directions
        </a>
      </div>
    `,
      {
        maxWidth: 280,
        className: 'custom-popup',
      }
    )
    .openPopup();

  // Add accessibility: announce when marker is clicked
  marker.on('click', () => {
    announceToScreenReader(`Selected location: ${location.name}. ${location.description}`);
  });

  // Add a custom control for resetting map view
  const ResetControl = L.Control.extend({
    options: {
      position: 'topleft',
    },
    onAdd: function (map) {
      const container = L.DomUtil.create(
        'div',
        'leaflet-bar leaflet-control leaflet-control-custom'
      );
      container.innerHTML = '🏠';
      container.style.backgroundColor = 'white';
      container.style.width = '30px';
      container.style.height = '30px';
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';
      container.style.cursor = 'pointer';
      container.style.fontSize = '18px';
      container.title = 'Reset map view';
      container.setAttribute('role', 'button');
      container.setAttribute('aria-label', 'Reset map to default view');

      container.onclick = function () {
        map.setView([siteConfig.map.centerLat, siteConfig.map.centerLng], mapZoom);
        announceToScreenReader(
          `Map view reset to show our location at ${siteConfig.address.street}`
        );
      };

      return container;
    },
  });

  map.addControl(new ResetControl());

  // Handle window resize to ensure map renders correctly
  window.addEventListener('resize', () => {
    map.invalidateSize();
  });

  // Ensure map renders correctly after any animations
  setTimeout(() => {
    map.invalidateSize();
  }, 250);

  console.log(`Map initialized successfully showing our location at ${siteConfig.address.full}`);
}

/**
 * Utility function to announce messages to screen readers
 * @param {string} message - The message to announce
 */
function announceToScreenReader(message) {
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
