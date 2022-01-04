import { baseCreds } from '../lib/helpers/creds'
import {
  navigate,
  click,
  shouldNotExist,
  shouldExist
} from '../lib/helpers/helpers'
import { test } from '../lib/fixtures/fixtures'
import { expect } from '@playwright/test'
import {
  bankAccounts,
  commitments,
  cashWithdrawals
} from '../lib/selectors/accounts'

test.beforeEach(async ({ auth, page }) => {
  await navigate(baseCreds.URL, page)
  await auth.loginWithout2fa(baseCreds.BANK_ACCOUNT, baseCreds.PASSWORD)
  await click(bankAccounts.ACCOUNTS_SECTION, page)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Bank accounts', () => {
  test.beforeEach(async ({ page }) => {
    await click(bankAccounts.BANK_ACCOUNTS, page)
  })
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
test.describe('Commitments', () => {
  test('The page and table should exist', async ({ page, invest }) => {
    await click(commitments.COMMITMENTS_SECTION, page)
    await expect(page).toHaveURL(`${baseCreds.URL}app/accounts/commitments`)
    await shouldExist(invest.TABLE, page)
  })
})
// test.describe('Cash withdrawals', () => {
//   test.beforeEach(async ({ page }) => {
//     await click(cashWithdrawals.CASHWITHDRAWALS_SECTION, page)
//   })
//   test('The withdrawal request should be created(USD)', async ({
//     bankAccount
//   }) => {
//     await bankAccount.removeBankAccount()
//   })

//   test('The withdrawal request should be created(SGD)', async ({
//     bankAccount
//   }) => {
//     await bankAccount.removeBankAccount()
//   })
// })
