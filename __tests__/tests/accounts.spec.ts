import { baseCreds } from '../lib/helpers/creds'
import {
  navigate,
  click,
  shouldNotExist,
  shouldExist,
  waitForText
} from '../lib/helpers/helpers'
import { test } from '../lib/fixtures/fixtures'
import { expect } from '@playwright/test'
import { bankAccounts } from '../lib/selectors/accounts'

test.beforeEach(async ({ auth, page }) => {
  await navigate(baseCreds.URL, page)
  await auth.loginWithout2fa(baseCreds.thirdExchange, baseCreds.PASSWORD)
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
    // await shouldNotExist(bankAccounts.buttons.MORE, page)
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

test.describe('Cash deposit', () => {
  test.beforeEach(async ({ page }) => {
    await click(bankAccounts.CASH_DEPOSITS_PAGE, page)
  })
  test('Check that the USD currency displayed', async ({ page }) => {
    await click(bankAccounts.buttons.CASH_DEPOSIT, page)
    await shouldExist('[role="tabpanel"] >> text="USD"', page)
  })

  test('Check that the SGD currency displayed', async ({ page }) => {
    await click(bankAccounts.buttons.SGD, page)
    await click(bankAccounts.buttons.CASH_DEPOSIT, page)
    await shouldExist('[role="tabpanel"] >> text="SGD"', page)
  })
})
test.describe('Commitments', () => {
  test('The page and table should exist', async ({ page, invest }) => {
    await click(bankAccounts.COMMITMENTS_PAGE, page)
    await expect(page).toHaveURL(`${baseCreds.URL}app/accounts/commitments`)
    await shouldExist(invest.TABLE, page)
  })
})
let USD: { outstanding: any }
let SGD: { outstanding: any }
test.describe('Cash withdrawals', () => {
  test.beforeEach(async ({ page, bankAccount }) => {
    await click(bankAccounts.CASH_WITHDRAWALS_PAGE, page)
    const { availableUSD, availableSGD } = await bankAccount.getBalances(
      baseCreds.thirdExchange
    )
    USD = availableUSD
    SGD = availableSGD
  })

  test('The withdrawal request should be created(USD)', async ({
    bankAccount
  }) => {
    await bankAccount.createWithdrawalsRequest()
    const { availableUSD } = await bankAccount.getBalances(
      baseCreds.thirdExchange
    )
    expect(USD.outstanding).toEqual(availableUSD.outstanding + 10000)
  })

  test('The withdrawal request should be created(SGD)', async ({
    bankAccount,
    page
  }) => {
    await click(bankAccounts.buttons.SGD, page)
    await bankAccount.createWithdrawalsRequest()
    const { availableSGD } = await bankAccount.getBalances(
      baseCreds.thirdExchange
    )
    expect(SGD.outstanding).toEqual(availableSGD.outstanding + 10000)
  })
})

test('The Asset Balances page should be available', async ({ page }) => {
  await click(bankAccounts.ASSET_BALANCES_PAGE, page)
  await shouldExist('table tbody', page)
})
test.describe('The Digital Securities page', () => {
  test.beforeEach(async ({ page }) => {
    await click(bankAccounts.DIGITAL_SECURITIES, page)
  })

  test('Deposit', async ({ page }) => {
    await click(bankAccounts.buttons.DEPOSIT, page)
    await click(bankAccounts.listBox.TOKEN, page)
    await click(bankAccounts.listBox.TOKEN_VALUE, page)
    await waitForText(page, '0xfF53032a62b1c2d7EbC22c1124F27CAc14647ED0')
  })
})
