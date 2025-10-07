/**
 * Image Optimization Utilities
 * Provides responsive image loading and WebP support detection
 */

// Check WebP support
function checkWebPSupport() {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

// Use WebP if supported, fallback to original
function getOptimizedImageSrc(originalSrc) {
  if (checkWebPSupport()) {
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  return originalSrc;
}

// Lazy loading implementation
function initializeLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

export { checkWebPSupport, getOptimizedImageSrc, initializeLazyLoading };
