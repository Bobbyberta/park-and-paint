/**
 * Global setup for Playwright tests
 * Runs once before all tests
 */

export default async function globalSetup(config) {
  console.log('🚀 Starting Playwright global setup...');
  
  // You can add global setup logic here
  // For example:
  // - Database seeding
  // - Authentication setup
  // - Environment configuration
  
  console.log('✅ Global setup completed');
}
