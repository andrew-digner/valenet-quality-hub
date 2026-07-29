import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  reporter: [['html', { open: 'never' }]],
  testDir: './apps/frontend/tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm --filter @valenet/frontend dev',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: 'http://127.0.0.1:3000',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'tablet', use: { ...devices['iPad Pro 11'] } },
  ],
});
