// playwright.config.ts
import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  timeout: 180000,
  // reporter: [["list"], ["json", { outputFile: "test-results.json" }]],
  // outputDir: 'screenshot',
  // globalTimeout: 600000,
  use: {
    trace: 'on-first-retry',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    browserName: "chromium",
    screenshot: "only-on-failure",
    video: "off",
  },

  projects: [
    {
      name: "Chromium",
      retries: 1,
      timeout: 180000,
      use: {
        headless: true,
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true,
        browserName: "chromium",
        screenshot: "only-on-failure",
        trace: 'on-first-retry',
        video: "off",
        httpCredentials: {
          username: "ixprime",
          password: "!nv35taX2K2!*",
        },
      },
    },
  ],
};
export default config;
