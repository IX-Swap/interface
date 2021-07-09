// hello.ts
import { test as base } from '@playwright/test';
import { Login } from '../page-objects/authentication';
import { AltyCMD } from '../page-objects/alty-cmd';

// Define test fixtures "login" and "cmd".
type TestFixtures = {
  login: object;
  cmd: object;
};

// Extend base test with our fixtures.
const test = base.extend<TestFixtures>({
  login: async ({ page }, use) => {
    const login = new Login(page);
    await use(login);

  },
  cmd: async ({ page }, use) => {
    const cmd = new AltyCMD(page);
    await use(cmd);
  },
});

// Now, this "test" can be used in multiple test files, and each of them will get the fixtures.
export default test;
