import { baseCreds } from '../../lib/helpers/creds'
import { click, navigate, typeText, waitForText } from '../../lib/helpers/helpers'
import { test, expect } from '../../lib/fixtures/fixtures'
import { accountsTab } from '../../lib/selectors/accounts'
import { text } from '../../lib/helpers/text'

test.use({ storageState: './__tests__/lib/storages/accountsStorageState.json' })

test.describe('Bank accounts (IXPRIME-152)', () => {
  test.beforeEach(async ({ page }) => {
    await navigate(baseCreds.URL + 'app/accounts/bank-accounts/create', page)
  })

  test('Account button should be disabled', async ({ bankAccount }) => {
    await expect(bankAccount.SUBMIT_BUTTON).toBeDisabled()
  })

  test('Check that the fields are required', async ({ kycForms, page, bankAccount }) => {
    await typeText(accountsTab.fields.BANK_NAME, 'BANK_NAME', page)
    await bankAccount.SUBMIT_BUTTON.click()
    await expect(await kycForms.ERROR).toHaveCount(21)
  })
})

test.describe('Cash Withdrawal (IXPRIME-168 / IXPRIME-169)', () => {
  test.beforeEach(async ({ page }) => {
    await navigate(baseCreds.URL + text.requests.cashWithdrawal, page)
  })

  test('The Confirm Withdrawal button should be disabled', async ({ bankAccount }) => {
    await expect(bankAccount.CONFIRM_WITHDRAWAL_BUTTON).toBeDisabled()
  })

  test('Check that the Confirm button is enabled when "Insufficient balance" ', async ({ page, bankAccount }) => {
    await bankAccount.createWithdrawalsRequest('0', false)
    await bankAccount.AMOUNT.type('111111111', { delay: 150 })
    await waitForText(page, 'Insufficient balance')

    await expect(bankAccount.CONFIRM_WITHDRAWAL_BUTTON).toBeDisabled()
  })

  test('Check that the empty form shoul not be submited ', async ({ page, bankAccount, issuance }) => {
    await bankAccount.createWithdrawalsRequest('0', false)
    await bankAccount.AMOUNT.type('00', { delay: 1500 })
    const form = await page.locator(issuance.BASE_FORM)
    await expect(form).toContainText("Can't be zero")
    await expect(bankAccount.CONFIRM_WITHDRAWAL_BUTTON).toBeDisabled()
  })
})

test.describe('Blockchain Addresses', () => {
  test.beforeEach(async ({ page }) => {
    await navigate(baseCreds.URL + 'app/accounts/withdrawal-addresses', page)
    await click(accountsTab.buttons.ADD_ADDRESS, page)
  })

  test('The "Connect" button should be disabled', async ({ bankAccount }) => {
    await expect(bankAccount.CONNECT).toBeDisabled()
  })

  test('The blockchain address should be recognized', async ({ page, dso, bankAccount }) => {
    await typeText(accountsTab.fields.BLOCKCHAIN_ADDRESS, '0xF294A4bFFE774EFa561111a6F', page)
    await expect(dso.ERROR).toContainText('Could not detect network of this wallet')
    await expect(bankAccount.CONNECT).toBeDisabled()
  })
})
