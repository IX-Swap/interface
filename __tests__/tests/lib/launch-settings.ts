import { chromium } from 'playwright'

async function launchPersistent() {
  const ARGS = [`--disable-extensions-except=${__dirname + '/metamask'}`, `--load-extension=${__dirname + '/metamask'}`]
  const userDataDir = ''
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: ARGS,
    viewport: { width: 1920, height: 1080 },
    // timeout: 50000,
  }) // Go to the starting url before each test.
  return context
}
export { launchPersistent }
