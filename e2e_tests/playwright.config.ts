import { PlaywrightTestConfig } from '@playwright/test';
import {timeouts} from './helpers/timeouts'

const config: PlaywrightTestConfig = {
  globalTimeout: timeouts.globalTestsTimeout,
  timeout: timeouts.testTimeout,
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
    actionTimeout: timeouts.mediumTimeout,
    navigationTimeout: timeouts.mediumTimeout,
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
