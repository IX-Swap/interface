import { kyc } from '../lib/selectors/kyc-form'
import { authForms } from '../lib/selectors/auth'
import { baseCreds } from '../lib/helpers/creds'
import { test } from '../lib/fixtures/fixtures'
import {
  click,
  navigate,
  emailCreate,
  shouldExist,
  screenshotMatching
} from '../lib/helpers/helpers'
let forEachEmail = emailCreate()
test.beforeEach(async ({ page, baseURL, auth }, testInfo) => {
  await navigate(baseCreds.URL, page)
})
test.afterEach(async ({ page, context }, testInfo) => {
  await page.close()
})

test('Check login', async ({ page, auth }) => {
  await auth.loginWithout2fa(baseCreds.EMAIL, baseCreds.PASSWORD)
  await shouldExist(kyc.type.INDIVIDUAL, page)
})

test('Check Registration', async ({ page, auth }) => {
  await auth.submitRegistrationForm(forEachEmail)
  await auth.login(forEachEmail, baseCreds.PASSWORD)
  await shouldExist(kyc.type.INDIVIDUAL, page)
})

test.describe('Check form`s view', () => {
  test('Login form', async ({ page }, testInfo) => {
    await screenshotMatching(testInfo.title, page)
  })

  test('Registration form', async ({ page }, testInfo) => {
    await click(authForms.buttons.REGISTRATION, page)
    await screenshotMatching(testInfo.title, page)
  })

  test('Forgot form', async ({ page }, testInfo) => {
    await click(authForms.buttons.FORGOT, page)
    await screenshotMatching(testInfo.title, page)
  })
})
