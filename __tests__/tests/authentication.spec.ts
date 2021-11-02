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
test.beforeEach(async ({ page }) => {
  await navigate(baseCreds.URL, page)
})
test.afterEach(async ({ page }) => {
  await page.close()
})
test.describe('Functional test ', () => {
  test('The user be logged in', async ({ page, auth }) => {
    await auth.loginWithout2fa(baseCreds.EMAIL, baseCreds.PASSWORD)
    await shouldExist(kyc.type.INDIVIDUAL, page)
  })

  test('The user should be registered', async ({ page, auth }) => {
    await auth.submitRegistrationForm(forEachEmail)
    await auth.login(forEachEmail, baseCreds.PASSWORD)
    await shouldExist(kyc.type.INDIVIDUAL, page)
  })

  test('Account access restored(forgot password)', async ({ page, auth }) => {
    await auth.resetPassword(baseCreds.EMAIL_FOR_RESET)
    await auth.loginWithout2fa(
      baseCreds.EMAIL_FOR_RESET,
      baseCreds.PASSWORD_RESET
    )
    await shouldExist(kyc.MY_PROFILE, page)
  })
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
