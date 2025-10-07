#!/usr/bin/env node

/**
 * WebP Image Conversion Script
 * Converts images in public/images/ to WebP format for better performance
 */

import sharp from 'sharp';
import { readFile, writeFile, readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGES_DIR = 'public/images';
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

/**
 * Convert image to WebP format
 */
async function convertToWebP(inputPath, outputPath, quality = 85) {
  try {
    await sharp(inputPath)
      .webp({ 
        quality,
        effort: 6, // Higher effort = better compression
        smartSubsample: true
      })
      .toFile(outputPath);
    
    const originalSize = (await stat(inputPath)).size;
    const webpSize = (await stat(outputPath)).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${basename(inputPath)} → ${basename(outputPath)} (${savings}% smaller)`);
    return { success: true, savings: parseFloat(savings) };
  } catch (error) {
    console.error(`❌ Failed to convert ${inputPath}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Generate responsive image sizes
 */
async function generateResponsiveSizes(inputPath, baseName, quality = 85) {
  const sizes = [
    { width: 800, suffix: '-800w' },
    { width: 1200, suffix: '-1200w' },
    { width: 1600, suffix: '-1600w' }
  ];
  
  const results = [];
  
  for (const size of sizes) {
    try {
      const outputPath = join(IMAGES_DIR, `${baseName}${size.suffix}.webp`);
      
      await sharp(inputPath)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality, effort: 6 })
        .toFile(outputPath);
      
      const fileSize = (await stat(outputPath)).size;
      console.log(`📱 ${basename(outputPath)} (${size.width}px, ${(fileSize / 1024).toFixed(1)}KB)`);
      
      results.push({
        path: outputPath,
        width: size.width,
        size: fileSize
      });
    } catch (error) {
      console.error(`❌ Failed to generate ${size.width}px version:`, error.message);
    }
  }
  
  return results;
}

/**
 * Process all images in the directory
 */
async function processImages() {
  try {
    const files = await readdir(IMAGES_DIR);
    const imageFiles = files.filter(file => 
      SUPPORTED_FORMATS.includes(extname(file).toLowerCase())
    );
    
    if (imageFiles.length === 0) {
      console.log('📷 No images found to convert');
      return;
    }
    
    console.log(`🖼️  Converting ${imageFiles.length} images to WebP...\n`);
    
    let totalSavings = 0;
    let successCount = 0;
    
    for (const file of imageFiles) {
      const inputPath = join(IMAGES_DIR, file);
      const baseName = basename(file, extname(file));
      const outputPath = join(IMAGES_DIR, `${baseName}.webp`);
      
      console.log(`\n🔄 Processing: ${file}`);
      
      // Convert to WebP
      const result = await convertToWebP(inputPath, outputPath);
      
      if (result.success) {
        totalSavings += result.savings;
        successCount++;
        
        // Generate responsive sizes for hero images
        if (file.includes('hero') || file.includes('painter')) {
          console.log(`📐 Generating responsive sizes for ${file}...`);
          await generateResponsiveSizes(inputPath, baseName);
        }
      }
    }
    
    console.log(`\n✨ Conversion complete!`);
    console.log(`📊 Successfully converted ${successCount}/${imageFiles.length} images`);
    console.log(`💾 Average size reduction: ${(totalSavings / successCount).toFixed(1)}%`);
    
    if (successCount > 0) {
      console.log(`\n💡 Next steps:`);
      console.log(`1. Update your HTML to use WebP images with fallbacks`);
      console.log(`2. Test the images in different browsers`);
      console.log(`3. Consider using responsive images with srcset`);
    }
    
  } catch (error) {
    console.error('Error processing images:', error.message);
  }
}

/**
 * Generate HTML markup for responsive WebP images
 */
function generateResponsiveMarkup(originalPath, alt) {
  const baseName = basename(originalPath, extname(originalPath));
  
  return `
<picture>
  <source 
    media="(max-width: 800px)" 
    srcset="/images/${baseName}-800w.webp" 
    type="image/webp"
  >
  <source 
    media="(max-width: 1200px)" 
    srcset="/images/${baseName}-1200w.webp" 
    type="image/webp"
  >
  <source 
    srcset="/images/${baseName}-1600w.webp" 
    type="image/webp"
  >
  <img 
    src="${originalPath}" 
    alt="${alt}" 
    loading="lazy" 
    decoding="async"
  >
</picture>`;
}

/**
 * Main function
 */
async function main() {
  console.log('🎨 WebP Image Conversion Tool');
  console.log('=============================\n');
  
  await processImages();
  
  console.log('\n📝 Example responsive image markup:');
  console.log(generateResponsiveMarkup('/images/hero-bg.jpg', 'Professional car paint repair background'));
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { convertToWebP, generateResponsiveSizes, generateResponsiveMarkup };

