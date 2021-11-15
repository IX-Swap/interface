// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  workers: process.env.CI ? 2 : undefined,
  // reporter: process.env.CI ? [['github'], ['dot']] : 'list',
  reporter: process.env.CI ? 'line' : 'line',
  timeout: 180000,
  updateSnapshots: 'missing',
  use: {
    trace: 'on-first-retry',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    video: 'off'
  },

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
    // {
    //   name: 'Webkit',
    //   retries: 1,
    //   timeout: 180000,
    //   use: {
    //     headless: true,
    //     viewport: { width: 1900, height: 1000 },
    //     ignoreHTTPSErrors: true,
    //     browserName: 'webkit',
    //     screenshot: 'only-on-failure',
    //     trace: 'on-first-retry',
    //     video: 'off',
    //     httpCredentials: {
    //       username: 'ixprime',
    //       password: '!nv35taX2K2!*'
    //     }
    //   }
    // }
  ]
}
export default config
