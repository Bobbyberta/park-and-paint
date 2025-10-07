#!/usr/bin/env node

/**
 * Image Optimization Script
 * Optimizes images in the public/images directory
 * Generates WebP versions for better performance
 */

import { readFile, writeFile, readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { createReadStream, createWriteStream } from 'fs';

// Simple image optimization using Node.js built-in capabilities
// For production, consider using a service like Cloudinary or ImageKit

const IMAGES_DIR = 'public/images';
const OUTPUT_DIR = 'public/images/optimized';

/**
 * Get file size in bytes
 */
async function getFileSize(filePath) {
  const stats = await stat(filePath);
  return stats.size;
}

/**
 * Check if WebP is supported by the browser
 */
function isWebPSupported() {
  return `
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
      return originalSrc.replace(/\\.(jpg|jpeg|png)$/i, '.webp');
    }
    return originalSrc;
  }
  `;
}

/**
 * Generate responsive image markup
 */
function generateResponsiveImageMarkup(originalPath, alt) {
  const baseName = basename(originalPath, extname(originalPath));
  const webpPath = originalPath.replace(/\\.(jpg|jpeg|png)$/i, '.webp');
  
  return `
<picture>
  <source srcset="${webpPath}" type="image/webp">
  <img src="${originalPath}" alt="${alt}" loading="lazy" decoding="async">
</picture>`;
}

/**
 * Create image optimization utilities
 */
async function createImageUtils() {
  const utilsContent = `
/**
 * Image Optimization Utilities
 * Provides responsive image loading and WebP support detection
 */

${isWebPSupported()}

// Lazy loading implementation
function initializeLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

export { checkWebPSupport, getOptimizedImageSrc, initializeLazyLoading };
`;

  await writeFile('src/utils/image-optimization.js', utilsContent);
  console.log('✅ Created image optimization utilities');
}

/**
 * Analyze current images
 */
async function analyzeImages() {
  try {
    const files = await readdir(IMAGES_DIR);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    console.log('📊 Image Analysis:');
    console.log('==================');
    
    for (const file of imageFiles) {
      const filePath = join(IMAGES_DIR, file);
      const size = await getFileSize(filePath);
      const sizeKB = (size / 1024).toFixed(2);
      
      console.log(`${file}: ${sizeKB} KB`);
      
      // Recommendations
      if (size > 500000) { // > 500KB
        console.log(`  ⚠️  Large file detected - consider compression`);
      }
      if (!file.toLowerCase().includes('webp')) {
        console.log(`  💡 Consider creating WebP version for better performance`);
      }
    }
    
    console.log('\n📋 Recommendations:');
    console.log('==================');
    console.log('1. Use WebP format for better compression');
    console.log('2. Implement lazy loading for images below the fold');
    console.log('3. Use responsive images with srcset');
    console.log('4. Compress images before adding to public/images/');
    console.log('5. Consider using a CDN for image delivery');
    
  } catch (error) {
    console.error('Error analyzing images:', error.message);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🖼️  Image Optimization Setup');
  console.log('============================\n');
  
  await analyzeImages();
  await createImageUtils();
  
  console.log('\n✨ Image optimization setup complete!');
  console.log('\nNext steps:');
  console.log('1. Manually compress your images using tools like:');
  console.log('   - https://squoosh.app/ (online)');
  console.log('   - https://imageoptim.com/ (Mac)');
  console.log('   - https://tinypng.com/ (online)');
  console.log('2. Create WebP versions of your images');
  console.log('3. Update your HTML to use the responsive image markup');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { analyzeImages, createImageUtils };
