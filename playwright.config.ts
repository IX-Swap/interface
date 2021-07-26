// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test'
const config: PlaywrightTestConfig = {
  // Put any shared options on the top level.

  use: {
    headless: false,
    viewport: { width: 1720, height: 880 },
    // Configure the browser to use.
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    video: 'retry-with-video',
  },

  projects: [
    {
      name: 'Chromium',
      retries: 0,
      timeout: 90000,
      use: {
        headless: false,
        viewport: { width: 1720, height: 880 },
        // Configure the browser to use.
        browserName: 'chromium',
        screenshot: 'only-on-failure',
        video: 'retry-with-video',
      },
    },

    // {
    //   name: 'Firefox',
    //   use: { browserName: 'firefox' },
    // },

    // {
    //   name: 'WebKit',
    //   use: { browserName: 'webkit' },
    // },
  ],
}
export default config
