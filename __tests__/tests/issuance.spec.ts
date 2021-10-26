import { kyc } from '../lib/selectors/kyc-form'
import { baseCreds } from '../lib/helpers/creds'
import { test } from '../lib/fixtures/fixtures'
import { navigate, emailCreate, shouldExist } from '../lib/helpers/helpers'
let forEachEmail = emailCreate()
test.beforeEach(async ({ page, baseURL, auth }, testInfo) => {
  await navigate(baseCreds.URL, page)
  await auth.loginWithout2fa(baseCreds.EMAIL_APPROVED, baseCreds.PASSWORD)
})
test.afterEach(async ({ page, context }, testInfo) => {
  await page.close()
})

test('Create DSO', async ({ page, auth }) => {})
