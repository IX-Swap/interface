// global-setup.ts
import { chromium, FullConfig } from '@playwright/test'
import { downloadMetamask } from './api/api'
import { baseCreds } from './helpers/creds'
import fs from 'fs'

import { navigate } from './helpers/helpers'
import { Authentication } from './page-objects/authentication'
import extract from 'extract-zip'

const dotenv = require('dotenv')
dotenv.config()
;('use strict')

const storage = {
  '/storages/dsoStorageState.json': baseCreds.EMAIL_APPROVED,
  '/storages/authorizerStorageState.json': baseCreds.AUTHORIZER_USER,
  '/storages/accountsStorageState.json': baseCreds.thirdExchange,
  '/storages/adminStorageState.json': baseCreds.ADMIN_SECTION
}

async function globalSetup(config: FullConfig) {
  if (!process.env.METAMSK)
    for (const [storagePath, email] of Object.entries(storage)) {
      const browser = await chromium.launchPersistentContext('', {})
      const page = await browser.newPage()
      const login = new Authentication(page)

      // signed-in
      await navigate(baseCreds.URL, page)
      await login.loginWithout2fa(email, baseCreds.PASSWORD)

      // Check the availability of documents and add them if they do not exist
      if (!fs.existsSync(__dirname + '/documents/pdfTest.pdf')) {
        await page.pdf({ path: __dirname + '/documents/pdfTest.pdf' })
        await page.screenshot({ path: __dirname + '/documents/test-img.jpg' })
      }

      // Save signed-in state to 'storageState.json'.
      await page.context().storageState({ path: __dirname + storagePath })
      await browser.close()
    }

  // Check for metamask and add it if it does not exist
  if (!fs.existsSync(__dirname + '/metamask')) {
    await downloadMetamask(__dirname + '/metamask.zip')
    await extract(__dirname + '/metamask.zip', {
      dir: __dirname + '/metamask'
    })
  }
}

export default globalSetup
