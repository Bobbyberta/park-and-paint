# Testing Guide

This document explains how to run tests locally and in GitHub Actions.

## Test Types

### 1. Unit Tests (Vitest)
Tests for individual components, utilities, and configuration.

**Run locally:**
```bash
npm test              # Watch mode
npm run test:run      # Run once
npm run test:ui       # Visual UI
npm run test:coverage # With coverage report
```

**Test files:**
- `src/**/*.test.js` - All unit tests

**Coverage reports:** `coverage/` directory

---

### 2. End-to-End Tests (Playwright)

E2E tests that simulate real user interactions across multiple browsers.

#### Development Tests (Against Dev Server)
Tests run against Vite dev server (`localhost:3000`):

```bash
npm run test:e2e         # Run all E2E tests
npm run test:e2e:ui      # Visual UI mode
npm run test:e2e:headed  # See browser windows
npm run test:e2e:debug   # Debug mode
```

**Config:** `playwright.config.js`
**Base URL:** `http://localhost:3000`
**Server:** Vite dev server (auto-started)

#### Production Tests (Against Built Site)
Tests run against production build (`localhost:4173`):

```bash
npm run test:e2e:prod       # Run against preview server
npm run test:e2e:prod:ui    # Visual UI mode
npm run test:all:prod       # Run unit + E2E prod tests
```

**Config:** `playwright.config.prod.js`
**Base URL:** `http://localhost:4173`
**Server:** Vite preview server (auto-started)

---

## Browsers Tested

E2E tests run on:
- ✅ Desktop Chrome (Chromium)
- ✅ Desktop Firefox
- ✅ Desktop Safari (WebKit)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

---

## Test Artifacts

### Local Development

When tests run locally, artifacts are saved to:

```
test-results/          # Screenshots, videos, traces
playwright-report/     # HTML test report
coverage/             # Unit test coverage
```

**View HTML report:**
```bash
npx playwright show-report
```

**Clean up artifacts:**
```bash
npm run test:clean              # Remove all test artifacts
npm run test:clean-results      # Remove test-results/ only
npm run test:clean-reports      # Remove playwright-report/ only
```

---

## GitHub Actions

### Workflow: `.github/workflows/playwright.yml`

**Triggers:**
- Every push to `main` branch
- Every pull request to `main` branch
- Manual trigger via GitHub Actions UI

**What it does:**
1. Installs dependencies
2. Installs Playwright browsers
3. Runs unit tests (`npm run test:run`)
4. Builds production site (`npm run build`)
5. Runs E2E tests against production build
6. Uploads artifacts

### Viewing Test Results in GitHub

**After workflow completes:**

1. Go to: https://github.com/Bobbyberta/park-and-paint/actions
2. Click on the workflow run
3. Scroll to **Artifacts** section at the bottom
4. Download any of these:

#### Artifacts Available:

**📊 `playwright-report`** (Retention: 30 days)
- Full HTML test report
- Test results and timings
- Download and open `index.html` in browser

**🎥 `test-videos`** (Retention: 7 days)
- Videos of failed tests
- Screenshots on failure
- Traces for debugging
- Located in `test-results/` folder

**📈 `coverage`** (Retention: 7 days)
- Unit test coverage reports
- HTML coverage report
- JSON coverage data

---

## Test Configuration Differences

| Feature | Dev Config | Production Config |
|---------|-----------|-------------------|
| Config File | `playwright.config.js` | `playwright.config.prod.js` |
| Base URL | `localhost:3000` | `localhost:4173` |
| Server | Vite dev server | Vite preview server |
| Build Required | No | Yes |
| 404 Test | Skipped | Runs |
| Hot Reload | Yes | No |
| Best For | Development | CI/CD, Pre-deployment |

---

## Writing Tests

### Unit Tests

Create test files next to source files:

```javascript
// src/utils/myUtil.test.js
import { describe, it, expect } from 'vitest';
import { myFunction } from './myUtil.js';

describe('myFunction', () => {
  it('should do something', () => {
    expect(myFunction()).toBe('expected');
  });
});
```

### E2E Tests

Add tests to `tests/e2e/`:

```javascript
// tests/e2e/my-feature.spec.js
import { test, expect } from '@playwright/test';

test('my feature works', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading')).toBeVisible();
});
```

---

## Troubleshooting

### E2E Tests Timeout
- Increase timeout in config: `timeout: 60000`
- Check if dev/preview server is running
- Try running with `--headed` to see what's happening

### Tests Pass Locally but Fail in CI
- CI uses production config by default
- Viewport sizes may differ
- Check if feature requires specific screen size
- Review uploaded videos/screenshots

### Videos Not Recording
- Videos only record on failure by default
- Change config: `video: 'on'` to always record
- Videos are in `test-results/` directory

### Missing Artifacts in GitHub
- Artifacts only upload if tests complete
- Check workflow logs for failures
- Artifacts expire based on retention days

---

## Best Practices

✅ **DO:**
- Run `npm run test:all:prod` before pushing to main
- Keep test files close to source files
- Use descriptive test names
- Test critical user flows
- Review test videos when tests fail

❌ **DON'T:**
- Commit `test-results/` or `playwright-report/`
- Use `test.only()` in committed code
- Skip tests without good reason
- Test implementation details
- Ignore flaky tests

---

## Quick Reference

```bash
# Unit tests
npm test                    # Watch mode
npm run test:run           # Run once

# E2E tests (dev)
npm run test:e2e           # All browsers
npm run test:e2e:ui        # Visual mode

# E2E tests (production)
npm run test:e2e:prod      # Against build
npm run test:all:prod      # Everything

# Cleanup
npm run test:clean         # Remove artifacts

# View reports
npx playwright show-report # Open HTML report
```

---

**Last Updated:** October 9, 2025

