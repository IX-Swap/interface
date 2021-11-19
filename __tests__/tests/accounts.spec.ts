import { baseCreds } from '../lib/helpers/creds'
import { navigate, click, shouldNotExist } from '../lib/helpers/helpers'
import { test } from '../lib/fixtures/fixtures'
import { expect } from '@playwright/test'
import { bankAccounts } from '../lib/selectors/accounts'

test.beforeEach(async ({ auth, page, bankAccount }) => {
  await navigate(baseCreds.URL, page)
  await auth.loginWithout2fa(baseCreds.BANK_ACCOUNT, baseCreds.PASSWORD)
  await bankAccount.toBankAccounts()
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Bank accounts', () => {
  test('Account creation should be canceled', async ({ bankAccount, page }) => {
    await bankAccount.fillAccountInfoForm()
    await click(bankAccounts.buttons.CANCEL, page)
    await shouldNotExist(bankAccounts.buttons.MORE, page)
  })

  test('Account should be created', async ({ bankAccount }, testInfo) => {
    await bankAccount.fillAccountInfoForm()
    const account = await bankAccount.fillBankAddressForm()
    expect(account).toBe(true)
  })

  test('Account should available to view', async ({ bankAccount }) => {
    await bankAccount.viewBankAccount()
  })

  test('Account should edited', async ({ bankAccount }) => {
    await bankAccount.editBankAccount()
  })

  test('Account should removed', async ({ bankAccount }) => {
    await bankAccount.removeBankAccount()
  })
})
