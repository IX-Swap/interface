import { test as base } from '@playwright/test';
import { BrowserContext } from 'playwright';

export const test = base.extend<{ mockedContext: BrowserContext }>({
  mockedContext: async ({ context }, runTest) => {
    // Modify existing `context` fixture to add a route
    context.route(/.css/, route => route.abort());
    // Pass fixture to test functions
    const all = { context };
    await runTest(all);
  },
});
