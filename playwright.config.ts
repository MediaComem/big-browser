import { defineConfig, devices } from '@playwright/test';

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
  testDir: './e2e',
  // Run tests in files in parallel
  fullyParallel: true,
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: Boolean(process.env['CI']),
  // Retry on CI only
  retries: process.env['CI'] ? 2 : 0,
  // Opt out of parallel tests on CI
  workers: process.env['CI'] ? 1 : '50%',
  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: 'html',
  // Shared settings for all the projects below. See
  // https://playwright.dev/docs/api/class-testoptions
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://127.0.0.1:3001',
    // Collect trace when retrying the failed test. See
    // https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry'
  },
  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run start:prod',
    url: 'http://127.0.0.1:3001',
    reuseExistingServer: !process.env['CI'],
    env: {
      BIG_BROWSER_DATABASE_URL:
        process.env['BIG_BROWSER_DATABASE_URL'] ?? 'redis://localhost:6379/1',
      BIG_BROWSER_PORT: process.env['BIG_BROWSER_PORT'] ?? '3001'
    }
  }
});
