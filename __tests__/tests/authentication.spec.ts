import { kyc } from '../lib/selectors/kyc-form'
import { authForms } from '../lib/selectors/auth'
import { baseCreds } from '../lib/helpers/creds'
import { test } from '../lib/fixtures/fixtures'
import { click, navigate, emailCreate, shouldExist, screenshotMatching } from '../lib/helpers/helpers'

let forEachEmail = emailCreate()
test.beforeEach(async ({ page }) => {
  await navigate(baseCreds.URL, page)
})
test.afterEach(async ({ page }) => {
  await page.close()
})
test.describe.parallel('Positive tests ', () => {
  test('Test the ability to login (IXPRIME-122)', async ({ auth }) => {
    await auth.loginWithout2fa(baseCreds.EMAIL, baseCreds.PASSWORD)
  })

  test('The user should be registered', async ({ page, auth }) => {
    await auth.submitRegistrationForm(forEachEmail)
    await auth.login(forEachEmail, baseCreds.PASSWORD)
    await shouldExist(kyc.type.INDIVIDUAL, page)
  })

  test('Test the ability to Reset Password (IXPRIME-124)', async ({ page, auth }) => {
    const password = await auth.resetPassword(baseCreds.EMAIL_FOR_RESET)
    await auth.loginWithout2fa(baseCreds.EMAIL_FOR_RESET, password)
    await shouldExist(kyc.MY_PROFILE, page)
  })

  test('The user should be Sign Out', async ({ auth, page }) => {
    await page.pause()
    await auth.loginWithout2fa(baseCreds.EMAIL, baseCreds.PASSWORD)
    await auth.signOut()
  })
})

test.describe('Check form`s view', () => {
  test.afterEach(async ({ page }, testInfo) => {
    await screenshotMatching(testInfo.title, page, page)
  })
  test('Login form', async ({ page }) => {
    await shouldExist(authForms.buttons.REGISTRATION, page)
  })

  test('Registration form', async ({ page }) => {
    await click(authForms.buttons.REGISTRATION, page)
  })

  test('Forgot form', async ({ page }) => {
    await click(authForms.buttons.FORGOT, page)
  })
})
