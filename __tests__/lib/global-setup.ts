// global-setup.ts
import { chromium, FullConfig } from '@playwright/test'
import { baseCreds } from './helpers/creds'
import { navigate } from './helpers/helpers'
import { Authentication } from './page-objects/authentication'
;('use strict')

const storage = {
  '/storages/dsoStorageState.json': baseCreds.EMAIL_APPROVED,
  '/storages/authorizerStorageState.json': baseCreds.AUTHORIZER_USER,
  '/storages/accountsStorageState.json': baseCreds.thirdExchange,
  '/storages/adminStorageState.json': baseCreds.ADMIN_SECTION
}
async function globalSetup(config: FullConfig) {
  for (const [storagePath, email] of Object.entries(storage)) {
    const browser = await chromium.launchPersistentContext('', {
      httpCredentials: baseCreds.httpCredentials
    })
    const page = await browser.newPage()
    const login = new Authentication(page)

    // signed-in
    await navigate(baseCreds.URL, page)
    await login.loginWithout2fa(email, baseCreds.PASSWORD)

    // Save signed-in state to 'storageState.json'.
    await page.context().storageState({ path: __dirname + storagePath })
    await browser.close()
  }
}
export default globalSetup
