import { test as base, expect } from './fixtures'
import { chromium } from 'playwright'
import { click, navigate, typeText } from '../helpers/helpers'
import { baseCreds } from '../helpers/creds'
import { MetamaskObg } from '../page-objects/metamask'
import { OtcTrading } from '../page-objects/otc-trading'

import { Authentication } from '../page-objects/authentication'

type investaxFixtures = {
  metamaskObg: MetamaskObg
  otcTrading: OtcTrading
}

export const test = base.extend<investaxFixtures>({
  context: async ({}, use) => {
    const path = __dirname.replace('fixtures', 'metamask')
    const ARGS = [`--disable-extensions-except=${path}`, `--load-extension=${path}`]
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: ARGS,
      timeout: 90000,
      viewport: { width: 1920, height: 1080 },
      ignoreHTTPSErrors: true
    })
    await Promise.all([context.waitForEvent('page')])

    await use(context)
    await context.close()
  },

  metamaskObg: [
    async ({ context }, use) => {
      const pageWithMetamask = await context.pages()[1]
      const metamaskObg = new MetamaskObg(pageWithMetamask)
      await metamaskObg.importMetamaskAccount(process.env.METAMASK_RECOVERY, process.env.METAMASK_PASSWORD)
      await use(metamaskObg)
    },
    { auto: true }
  ],

  otcTrading: async ({ page, context }, use) => {
    await use(new OtcTrading(page, context))
  }
})
export { expect }
