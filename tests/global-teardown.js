/**
 * Global teardown for Playwright tests
 * Runs once after all tests complete
 */

export default async function globalTeardown(config) {
  console.log('🧹 Starting Playwright global teardown...');
  
  // You can add global teardown logic here
  // For example:
  // - Clean up test data
  // - Close connections
  // - Generate reports
  
  console.log('✅ Global teardown completed');
}
