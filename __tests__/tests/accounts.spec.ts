import { baseCreds } from '../lib/helpers/creds'
import { navigate } from '../lib/helpers/helpers'
import { test } from '../lib/fixtures/fixtures'
import { expect } from '@playwright/test'

test.beforeEach(async ({ auth, page, bankAccount }) => {
  await navigate(baseCreds.URL, page)
  await auth.loginWithout2fa(baseCreds.BANK_ACCOUNT, baseCreds.PASSWORD)
  await bankAccount.toBankAccounts()
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Bank accounts', () => {
  test('Account should be created', async ({ bankAccount }, testInfo) => {
    await bankAccount.fillAccountInfoForm()
    const account = await bankAccount.fillBankAddressForm()
    expect(account).toBe(true)
  })

  test('Account should available to view', async ({ bankAccount }) => {
    await bankAccount.viewBankAccount()
  })

  test('Account should edited', async ({ bankAccount, page }) => {
    await bankAccount.editBankAccount()
  })

  test.only('Account should removed', async ({ bankAccount, page }) => {
    await bankAccount.removeBankAccount()
    await page.waitForTimeout(10000)
  })
})
