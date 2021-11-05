import { baseCreds } from '../lib/helpers/creds'
import { test } from '../lib/fixtures/fixtures'
import { click, navigate, screenshotMatching } from '../lib/helpers/helpers'
import { expect } from '@playwright/test'

test.beforeEach(async ({ page, auth, invest }) => {
  await navigate(baseCreds.URL, page)
  await auth.loginWithout2fa(baseCreds.EMAIL_APPROVED, baseCreds.PASSWORD)
})
test.afterEach(async ({ page }) => {
  await page.close()
})
test.describe('Primary', () => {
  test('Page with docs appears', async ({ investment, context }) => {
    const pages = await investment.downloadDocument(context)
    expect(pages).toBe(2)
  })

  test('Custody address should be created', async ({ investment }) => {
    await investment.createCustodyAddress()
  })

  test.only('User should make an investment', async ({ investment, page }) => {
    await investment.createNewInvestment()
  })
})
