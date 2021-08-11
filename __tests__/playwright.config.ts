// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test'
const config: PlaywrightTestConfig = {
  timeout: 90000,
  projects: [
    {
      name: 'Chromium',
      retries: 2,
      timeout: 90000,
      use: {
        headless: false,
        viewport: { width: 1720, height: 880 },
        ignoreHTTPSErrors: true,
        browserName: 'chromium',
        screenshot: 'only-on-failure',
        video: 'retry-with-video',
      },
    },
  ],
}
export default config
