// playwright.config.ts

import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  workers: 6,
  timeout: 180000,
  updateSnapshots: 'missing',
  reporter: [['allure-playwright'], ['list']],
  outputDir: 'reports',
  projects: [
    {
      name: 'Chromium',
      retries: 1,
      timeout: 180000,
      use: {
        headless: true,
        viewport: { width: 1900, height: 1000 },
        ignoreHTTPSErrors: true,
        browserName: 'chromium',
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        video: 'off',
        httpCredentials: {
          username: 'ixprime',
          password: '!nv35taX2K2!*'
        }
      }
    }
  ]
}
export default config
