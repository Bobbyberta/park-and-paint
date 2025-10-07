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
  const map = L.map('mapContainer', {
    center: [siteConfig.map.centerLat, siteConfig.map.centerLng],
    zoom: siteConfig.map.zoom,
    scrollWheelZoom: false,
    attributionControl: true,
  });

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    minZoom: 3,
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
      <div class="p-2">
        <h3 class="font-bold text-lg mb-2">${location.name}</h3>
        <p class="text-sm mb-2">${location.address}</p>
        <p class="text-sm mb-2">${location.description}</p>
        <p class="text-sm">
          <strong>Phone:</strong> 
          <a href="tel:${location.phone.replace(/\s/g, '')}" class="text-primary-600 hover:underline">
            ${location.phone}
          </a>
        </p>
      </div>
    `,
      {
        maxWidth: 300,
        className: 'custom-popup',
      }
    );

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
        map.setView([siteConfig.map.centerLat, siteConfig.map.centerLng], siteConfig.map.zoom);
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
