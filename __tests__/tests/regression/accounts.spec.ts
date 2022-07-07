import { test } from '../../lib/fixtures/fixtures'
import { expect } from '@playwright/test'
import { accountsTab } from '../../lib/selectors/accounts'
import { approveIdentity, createCorporateIdentity, createIdentity } from '../../lib/api/create-identities'
import * as corporateBody from '../../lib/api/corporate-identity'
import * as individualBody from '../../lib/api/individual-identity'
import { baseCreds } from '../../lib/helpers/creds'
import { navigate, click, shouldExist, typeText, emailCreate } from '../../lib/helpers/helpers'

test.use({ storageState: './__tests__/lib/storages/accountsStorageState.json' })

test.beforeEach(async ({ page }) => {
  await navigate(baseCreds.URL, page)
  await click(accountsTab.ACCOUNTS_SECTION, page)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Bank accounts', () => {
  test.beforeEach(async ({ page }) => {
    await click(accountsTab.BANK_ACCOUNTS, page)
  })
  test('Account creation should be canceled (IXPRIME-157)', async ({ bankAccount, page }) => {
    await bankAccount.fillAccountInfoForm()
    await click(accountsTab.buttons.CANCEL, page)
  })

  test('Account should be created (IXPRIME-153)', async ({ bankAccount }) => {
    await bankAccount.fillAccountInfoForm()
    const account = await bankAccount.fillBankAddressForm()
    expect(account).toBe(true)
  })

  test('Account should available to view (IXPRIME-154)', async ({ bankAccount }) => {
    await bankAccount.viewBankAccount()
  })

  test('Account should edited (IXPRIME-155)', async ({ bankAccount, admin, page }) => {
    const holderName = await bankAccount.editBankAccount()
    await click(accountsTab.buttons.SAVE, page)
    await expect(await admin.TABLE).toContainText(holderName)
  })

  test('Check the ability to cancel Edit Bank Account (IXPRIME-159)', async ({ bankAccount, admin, page }) => {
    const holderName = await bankAccount.editBankAccount()
    await click(accountsTab.buttons.CANCEL, page)
    await expect(await admin.TABLE).not.toContainText(holderName)
  })

  test('Account should removed (IXPRIME-156)', async ({ bankAccount }) => {
    await bankAccount.removeBankAccount()
  })
})

test.describe.parallel('Cash deposit', () => {
  let email
  test.beforeEach(async ({ page }) => {
    await click(accountsTab.CASH_DEPOSITS_PAGE, page)
    email = emailCreate()
  })
  test('Check that the USD currency displayed', async ({ page }) => {
    await click(accountsTab.buttons.CASH_DEPOSIT, page)
    await shouldExist('[role="tabpanel"] >> text="USD"', page)
  })

  test('Check that the SGD currency displayed', async ({ page }) => {
    await click(accountsTab.buttons.SGD, page)
    await click(accountsTab.buttons.CASH_DEPOSIT, page)
    await shouldExist('[role="tabpanel"] >> text="SGD"', page)
  })

  const corporatesType = 'corporates'

  test(`Virtual account should be assignet ${corporatesType}`, async ({ bankAccount, page2 }) => {
    const identityResponce = await createCorporateIdentity(email, corporatesType, corporateBody)
    await approveIdentity(identityResponce.submitId, corporatesType)
    await bankAccount.checkThatTheAccountAssigned(page2, email)
  })

  const identityType = 'individuals'

  test(`Virtual account should be assignet ${identityType}`, async ({ auth, page2, bankAccount }) => {
    const identityResponce = await createIdentity(email, identityType, individualBody)
    await approveIdentity(identityResponce.submitId, identityType)
    await bankAccount.checkThatTheAccountAssigned(page2, email)
  })
})
test.describe('Commitments', () => {
  test('The page and table should exist (IXPRIME-174)', async ({ page, invest }) => {
    await click(accountsTab.COMMITMENTS_PAGE, page)
    await expect(page).toHaveURL(`${baseCreds.URL}app/accounts/commitments`)
    await shouldExist(invest.TABLE, page)
  })
})

let USD, SGD: { outstanding: any }
test.describe('Cash withdrawals', () => {
  test.beforeEach(async ({ page, bankAccount }) => {
    await click(accountsTab.CASH_WITHDRAWALS_PAGE, page)
    const { availableUSD, availableSGD } = await bankAccount.getBalances(baseCreds.thirdExchange)
    USD = availableUSD
    SGD = availableSGD
  })

  test('The withdrawal request should be created(USD) (IXPRIME-166)', async ({ bankAccount, page }) => {
    await bankAccount.createWithdrawalsRequest()
    const { availableUSD } = await bankAccount.getBalances(baseCreds.thirdExchange)
    expect(USD.outstanding).toEqual(availableUSD.outstanding + 10000)
  })

  //need to ADD MAX BUTTON ON OTC
  test('Fill amount input field by "Max" button at USD account (IXPRIME-171)', async ({ bankAccount, page }) => {
    await bankAccount.createWithdrawalsRequest('0', false)
    await click('button > text="MAX"', page)
    const val = await bankAccount.AMOUNT.getAttribute('value')
    expect(USD.outstanding).toEqual(Number(val))
  })

  //need to ADD MAX BUTTON ON OTC
  test.skip('Fill amount input field by "Max" button at SGD account (IXPRIME-170)', async ({ bankAccount, page }) => {
    await click(accountsTab.buttons.SGD, page)
    await bankAccount.createWithdrawalsRequest('0', false)
    // await click('button > text="MAX"', page)
    const val = await bankAccount.AMOUNT.getAttribute('value')
    expect(SGD.outstanding).toEqual(Number(val))
  })

  test('The withdrawal request should be created(SGD) (IXPRIME-167)', async ({ bankAccount, page }) => {
    await click(accountsTab.buttons.SGD, page)
    await bankAccount.createWithdrawalsRequest()
    const { availableSGD } = await bankAccount.getBalances(baseCreds.thirdExchange)
    expect(SGD.outstanding).toEqual(availableSGD.outstanding + 10000)
  })
})

test('The Asset Balances page should be available (IXPRIME-172)', async ({ page }) => {
  await click(accountsTab.ASSET_BALANCES_PAGE, page)
  await shouldExist('table tbody', page)
})

test.describe('The Digital Securities page (IXPRIME-15)', () => {
  test.beforeEach(async ({ page }) => {
    await click(accountsTab.DIGITAL_SECURITIES, page)
  })

  test.skip('(THE ACCOUNT IS NOT HEX The wallet address should displayed (deposit page)', async ({ bankAccount }) => {
    await bankAccount.tokenDepositRequest()
  })

  test.skip('(THE ACCOUNT IS NOT HEX Withdrawal request should be created', async ({ bankAccount }) => {
    await bankAccount.tokenWithdrawalRequest()
  })
})

test.describe('The Transactions page', () => {
  test.beforeEach(async ({ page }) => {
    await click(accountsTab.TRANSACTIONS, page)
  })

  test.afterEach(async ({ page, invest }) => {
    await shouldExist(`${invest.TABLE} >> text="Trade"`, page)
  })
  test('Check that the data displayed in the table', async ({ invest, page }) => {
    await click(accountsTab.listBox.ASSET, page)
    if (baseCreds.URL.includes('dev')) {
      await click('[data-value="61e51b1421b1911c3f5ed1c4"]', page)
    } else {
      await click(accountsTab.listBox.ASSET_VALUE, page)
    }
    await shouldExist(invest.TABLE, page)
  })

  // test('Check that the currency can be changed', async ({ page }) => {
  //   await click(accountsTab.listBox.CURRENCY, page)
  //   await click(accountsTab.listBox.CURRENCY_VALUE_SGD, page)
  // })
})

test.describe('The Blockchain addresses page', () => {
  test.beforeEach(async ({ page }) => {
    await click(accountsTab.BLOCKCHAIN_ADDRESSES, page)
  })

  test('The View Blockchain Address window should exist (IXPRIME-182)', async ({ page, admin }) => {
    await admin.USER_VIEW_CARD.click()
    const locator = await page.locator(accountsTab.ACCOUNT_INFORMATION)
    await expect(locator).toContainText([
      'View Blockchain Address',
      'Blockchain Network',
      'Address Label'
      // 'Ropsten Test Network (Public Ethereum)'
    ])
  })

  test('The blockchain address should be recognized', async ({ page }) => {
    await click(accountsTab.buttons.ADD_ADDRESS, page)
    await typeText(accountsTab.fields.BLOCKCHAIN_ADDRESS, '0xF294A4bFFE774EFa56d9a3980215a0aD06Eb6a6F', page)
    const locator = page.locator(accountsTab.BLOCKCHAIN_FORM)
    await expect(locator).toContainText(['Metamask Wallet', 'Ethereum Blockchain'])
  })

  test('The "Create Wallet" window should exist', async ({ page }) => {
    await click(accountsTab.buttons.ADD_ADDRESS, page)
    await click('text="Let’s create"', page)
    await shouldExist('[href="https://metamask.io"]', page)
  })
})
test.describe('The Dashboard page', () => {
  test.beforeEach(async ({ page }) => {
    await click(accountsTab.DASHBOARD_PAGE, page)
  })
  test('Redirection to the Blockchain addresses page (IXPRIME-187)', async ({ page }) => {
    await click(accountsTab.BLOCKCHAIN_ADDRESSES, page)
    await expect(page).toHaveURL(/app\/accounts\/withdrawal-addresses$/g)
  })

  test.skip('Redirection to the invest page', async ({ page }) => {
    await click(accountsTab.buttons.PRIMARY_MARKET, page)
    await expect(page).toHaveURL(/app\/invest$/g)
  })
})
test.describe('The My Reports page', () => {
  test.beforeEach(async ({ page }) => {
    await click(accountsTab.MY_REPORTS_PAGE, page)
  })
  test('Check that the reports exist on the page (IXPRIME-189)', async ({ invest, page }) => {
    const reportsPage = await page.locator(invest.TABLE)
    await expect(reportsPage).toContainText([
      'Accounts Summary',
      'Trade Confirmation',
      'Aggregated Costs and Charges',
      'Dividends'
    ])
  })

  test('Check that the data in the report exist', async ({ page }) => {
    await click(accountsTab.buttons.VIEW_REPORT, page)
    await expect(page).toHaveURL(
      /app\/accounts\/reports\/accounts-summary\?expandedSections=Open\+Positions%2CCash\+Report$/g
    )
    const reportsPage = await page.locator(accountsTab.REPORTS_INFORMATION)
    await expect(reportsPage).toContainText([
      'Symbol',
      'Open',
      'Quantity',
      'Cost price',
      'Cost value',
      'Last Trade Price',
      'Current Value',
      'Unrealized P/L'
    ])
  })
})

test.describe('The My Holdings page', () => {
  test.beforeEach(async ({ page }) => {
    await click(accountsTab.MY_EXCHANGE_HOLDINGS, page)
  })
  test('Check the ability to watch "Orders" (IXPRIME-198)', async ({ page, admin }) => {
    await click('button >> text="Orders"', page)
    await expect(admin.TABLE).toContainText([
      'Date',
      'Pair',
      'Name',
      'Side',
      'Type',
      'Time-In Force',
      'Unit Price',
      'Units',
      'Total Amount'
    ])
  })
})
