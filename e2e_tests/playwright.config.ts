import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  globalTimeout: 710000,
  timeout: 210000,
  retries: process.env.E2E_CI ? 2 : 0,
  reporter: [['list'], ['html', { outputFolder: 'test-results/report' }] ],
  testDir: './tests',
  globalSetup: './setup/globalSetup.ts',
  outputDir: './test-results',
  workers: 2,
  use: {
    baseURL: process.env.E2E_URL || 'http://localhost:3000/',
    browserName: 'chromium',
    viewport: { width: 1600, height: 1200 },
    headless: false,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 50000,
    navigationTimeout: 40000,
    permissions: ['clipboard-read', 'clipboard-write'],
  },
  expect: {
    timeout: 35000,
    toMatchSnapshot: {
      maxDiffPixels: 30
    }
  },
  snapshotDir: 'testData/snapshots',
};

export default config;
