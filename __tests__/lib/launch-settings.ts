import { chromium } from 'playwright'

async function launchPersistent() {
  const ARGS = [`--disable-extensions-except=${__dirname + '/metamask'}`, `--load-extension=${__dirname + '/metamask'}`]
  const userDataDir = ''
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: ARGS,
    timeout: 90000,
    viewport: { width: 1720, height: 880 },
    httpCredentials: {
      username: 'ixswapio',
      password: '2theM0on',
    },
  })
  return context
  // Connect ot the Metamask
}

export { launchPersistent }
