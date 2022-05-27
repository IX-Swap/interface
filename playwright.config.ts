import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  /* Directory that will be recursively scanned for test files. */
  testDir: './__tests__/tests',

  /* Opt out of parallel tests on CI. */
  workers: 2,

  /* This is a base timeout for all tests. */
  timeout: 180 * 1000,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: process.env.CI !== undefined,

  /* Take pictures if they are missing. */
  updateSnapshots: 'missing',

  /* Retry on CI only */
  retries: process.env.CI !== undefined ? 1 : 0,
  /* The maximum number of test failures. After reaching this number, testing will stop and exit with an error. */

  reporter: [['html', { outputFolder: 'reports/html' }], ['list']],
  outputDir: 'reports',
  /* Retry on CI only */

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     */
    timeout: 15000
  },

  globalSetup: require.resolve('./__tests__/lib/global-setup'),
  use: {
    headless: true,
    viewport: { width: 1900, height: 1000 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'off',
    httpCredentials: {
      username: 'ixprime',
      password: '!nv35taX2K2!*'
    }
  },
  projects: [
    {
      name: 'Chrome',
      use: { browserName: 'chromium' }
    },

    {
      name: 'Webkit',
      use: { browserName: 'webkit' }
    },

    {
      name: 'Firefox',
      use: { browserName: 'firefox' }
    }

    // {
    //   name: 'iPhone',
    //   use: { ...devices['iPhone 12 Pro Max'] }
    // }
  ]
}
export default config
