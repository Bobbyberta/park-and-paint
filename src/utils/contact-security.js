/**
 * Contact Information Security Utilities
 * Provides obfuscation and protection for contact details while maintaining SEO
 */

/**
 * Encode email address for obfuscation
 * @param {string} email - The email address to encode
 * @returns {string} - Base64 encoded and reversed email
 */
export function encodeEmail(email) {
  return btoa(email.split('').reverse().join(''));
}

/**
 * Decode email address from obfuscated format
 * @param {string} encoded - The encoded email address
 * @returns {string} - Decoded email address
 */
export function decodeEmail(encoded) {
  try {
    return atob(encoded).split('').reverse().join('');
  } catch (error) {
    console.warn('Failed to decode email:', error);
    return '';
  }
}

/**
 * Format phone number for display while keeping clean version for tel: links
 * @param {string} phone - Clean phone number (e.g., "07732441000")
 * @returns {object} - Object with display and tel versions
 */
export function formatPhone(phone) {
  const clean = phone.replace(/\D/g, ''); // Remove all non-digits
  const display = clean.replace(/(\d{5})(\d{3})(\d{3})/, '$1 $2 $3');
  
  return {
    display: display,
    tel: clean,
    clean: clean
  };
}

/**
 * Encode phone number for obfuscation
 * @param {string} phone - The phone number to encode
 * @returns {string} - Base64 encoded phone number
 */
export function encodePhone(phone) {
  return btoa(phone);
}

/**
 * Decode phone number from obfuscated format
 * @param {string} encoded - The encoded phone number
 * @returns {string} - Decoded phone number
 */
export function decodePhone(encoded) {
  try {
    return atob(encoded);
  } catch (error) {
    console.warn('Failed to decode phone:', error);
    return '';
  }
}

/**
 * Basic bot detection
 * @returns {boolean} - True if bot is detected
 */
export function isBotDetected() {
  // Check for common bot indicators
  const botIndicators = [
    navigator.webdriver,
    window.phantom,
    window._phantom,
    window.callPhantom,
    navigator.userAgent.includes('bot'),
    navigator.userAgent.includes('crawler'),
    navigator.userAgent.includes('spider'),
    navigator.userAgent.includes('scraper')
  ];
  
  return botIndicators.some(indicator => indicator);
}

/**
 * Rate limiting for contact information access
 * @param {string} key - Unique key for rate limiting
 * @param {number} maxRequests - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} - True if request is allowed
 */
export function checkRateLimit(key, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Get existing requests from sessionStorage
  const requests = JSON.parse(sessionStorage.getItem(`rate_limit_${key}`) || '[]');
  
  // Filter requests within the time window
  const recentRequests = requests.filter(timestamp => timestamp > windowStart);
  
  // Check if we've exceeded the limit
  if (recentRequests.length >= maxRequests) {
    return false;
  }
  
  // Add current request
  recentRequests.push(now);
  sessionStorage.setItem(`rate_limit_${key}`, JSON.stringify(recentRequests));
  
  return true;
}

/**
 * Initialize contact information protection
 * This function should be called when the page loads
 */
export function initializeContactProtection() {
  // Decode and display obfuscated contact information
  const emailElements = document.querySelectorAll('[data-email]');
  const phoneElements = document.querySelectorAll('[data-phone]');
  
  // Check rate limit
  if (!checkRateLimit('contact_access', 5, 300000)) { // 5 requests per 5 minutes
    console.warn('Rate limit exceeded for contact information access');
    return;
  }
  
  // Decode emails
  emailElements.forEach(element => {
    const encoded = element.getAttribute('data-email');
    const decoded = decodeEmail(encoded);
    
    if (decoded) {
      element.textContent = decoded;
      element.href = `mailto:${decoded}`;
      element.classList.remove('obfuscated');
    }
  });
  
  // Decode and format phones
  phoneElements.forEach(element => {
    const encoded = element.getAttribute('data-phone');
    const decoded = decodePhone(encoded);
    
    if (decoded) {
      const formatted = formatPhone(decoded);
      element.textContent = formatted.display;
      element.href = `tel:${formatted.tel}`;
      element.classList.remove('obfuscated');
    }
  });
}

/**
 * Hide contact information for detected bots
 */
export function hideContactFromBots() {
  if (isBotDetected()) {
    const contactElements = document.querySelectorAll('.contact-info');
    contactElements.forEach(element => {
      element.style.display = 'none';
    });
    
    // Show alternative contact method
    const altContact = document.querySelector('.alternative-contact');
    if (altContact) {
      altContact.style.display = 'block';
    }
  }
}

/**
 * Generate obfuscated contact data for HTML
 * @param {object} contactInfo - Contact information object
 * @returns {object} - Obfuscated contact data
 */
export function generateObfuscatedContact(contactInfo) {
  return {
    email: encodeEmail(contactInfo.email),
    phone: encodePhone(contactInfo.phone),
    phoneDisplay: contactInfo.phoneDisplay
  };
}
