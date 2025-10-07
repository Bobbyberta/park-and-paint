/**
 * End-to-end tests for critical user flows
 */

import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Car Paint Repair.*Park and Paint.*Bath.*England/);
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /WELCOME TO PARK AND PAINT/i })).toBeVisible();
    
    // Check navigation
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Services' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    await page.goto('/');
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Park and Paint repairs the scratches and scuffs/);
    
    // Check Open Graph tags
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Car Paint Repair.*Park and Paint/);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    
    // Check Twitter Card tags
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/');
    
    // Check for skip link
    await expect(page.getByRole('link', { name: /Skip to main content/i })).toBeVisible();
    
    // Check for proper heading hierarchy
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});

test.describe('Navigation', () => {
  test('should navigate between sections', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to Services section
    await page.getByRole('link', { name: 'Services' }).click();
    await expect(page.locator('#services')).toBeInViewport();
    
    // Test navigation to Contact section
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page.locator('#contact')).toBeInViewport();
    
    // Test navigation back to Home
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page.locator('#home')).toBeInViewport();
  });

  test('should work on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile menu button is visible
    await expect(page.getByRole('button', { name: /Toggle mobile menu/i })).toBeVisible();
    
    // Check desktop navigation is hidden
    await expect(page.getByRole('link', { name: 'Home' })).not.toBeVisible();
    
    // Open mobile menu
    await page.getByRole('button', { name: /Toggle mobile menu/i }).click();
    
    // Check mobile menu items are visible
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Services' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('should close mobile menu when clicking outside', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Open mobile menu
    await page.getByRole('button', { name: /Toggle mobile menu/i }).click();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    
    // Click outside menu
    await page.click('body', { position: { x: 100, y: 500 } });
    
    // Check menu is closed
    await expect(page.getByRole('link', { name: 'Home' })).not.toBeVisible();
  });
});

test.describe('Services Section', () => {
  test('should display services information', async ({ page }) => {
    await page.goto('/#services');
    
    // Check services heading
    await expect(page.getByRole('heading', { name: /OUR SERVICES/i })).toBeVisible();
    
    // Check services content
    await expect(page.getByText(/Quality Guaranteed/i)).toBeVisible();
    await expect(page.getByText(/lifetime guarantee/i)).toBeVisible();
  });
});

test.describe('Contact Section', () => {
  test('should display contact information', async ({ page }) => {
    await page.goto('/#contact');
    
    // Check contact heading
    await expect(page.getByRole('heading', { name: /CONTACT US/i })).toBeVisible();
    
    // Check address
    await expect(page.getByText(/7 Ferry Court.*Bath.*England/i)).toBeVisible();
    
    // Check email link
    const emailLink = page.getByRole('link', { name: 'stuart@parkandpaint.co.uk' });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', 'mailto:stuart@parkandpaint.co.uk');
    
    // Check phone link
    const phoneLink = page.getByRole('link', { name: '07732 44 1000' });
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', 'tel:07732441000');
  });
});

test.describe('Map Section', () => {
  test('should load map successfully', async ({ page }) => {
    await page.goto('/');
    
    // Wait for map to load
    await page.waitForSelector('#mapContainer', { timeout: 10000 });
    
    // Check map container is visible
    await expect(page.locator('#mapContainer')).toBeVisible();
    
    // Check map has proper accessibility attributes
    await expect(page.locator('#mapContainer')).toHaveAttribute('role', 'application');
    await expect(page.locator('#mapContainer')).toHaveAttribute('aria-label', /Interactive map showing our location/);
  });

  test('should handle map interactions', async ({ page }) => {
    await page.goto('/');
    
    // Wait for map to load
    await page.waitForSelector('#mapContainer', { timeout: 10000 });
    
    // Check for map controls
    const mapContainer = page.locator('#mapContainer');
    await expect(mapContainer).toBeVisible();
    
    // Try to interact with map (basic check)
    await mapContainer.click();
    
    // Map should still be visible after interaction
    await expect(mapContainer).toBeVisible();
  });
});

test.describe('Opening Hours Section', () => {
  test('should display opening hours', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to opening hours section
    await page.locator('#hours').scrollIntoViewIfNeeded();
    
    // Check opening hours heading
    await expect(page.getByRole('heading', { name: /OPENING HOURS/i })).toBeVisible();
    
    // Check hours content
    await expect(page.getByText(/Come visit us for a free estimate/i)).toBeVisible();
    await expect(page.getByText(/Monday - Thursday.*7:30 AM - 4:00 PM/i)).toBeVisible();
    await expect(page.getByText(/Friday & Saturday.*By Appointment/i)).toBeVisible();
    await expect(page.getByText(/Sunday.*Closed/i)).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have good Lighthouse scores', async ({ page }) => {
    await page.goto('/');
    
    // Basic performance checks
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        loadComplete: navigation.loadEventEnd - navigation.navigationStart,
      };
    });
    
    // DOM should be ready quickly
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2000);
    
    // Page should load completely within reasonable time
    expect(performanceMetrics.loadComplete).toBeLessThan(3000);
  });
});

test.describe('Error Handling', () => {
  test('should handle 404 errors gracefully', async ({ page }) => {
    const response = await page.goto('/non-existent-page');
    expect(response?.status()).toBe(404);
    
    // Should show 404 page or redirect appropriately
    // This depends on your hosting configuration
  });
});

test.describe('Cross-browser Compatibility', () => {
  test('should work in different browsers', async ({ page, browserName }) => {
    await page.goto('/');
    
    // Basic functionality should work across browsers
    await expect(page.getByRole('heading', { name: /WELCOME TO PARK AND PAINT/i })).toBeVisible();
    
    // Navigation should work
    await page.getByRole('link', { name: 'Services' }).click();
    await expect(page.locator('#services')).toBeInViewport();
    
    console.log(`✅ Test passed in ${browserName}`);
  });
});
