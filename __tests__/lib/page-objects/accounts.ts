import { accountsTab } from '../selectors/accounts'

import {
  click,
  typeText,
  waitForText,
  shouldNotExist,
  shouldExist,
  clearAndTypeText,
  waitForResponseInclude,
  randomString
} from '../helpers/helpers'
import { getCookies, getRequest } from '../api/api'
import { Locator } from '@playwright/test'

class Accounts {
  page: any
  AMOUNT: Locator
  CONNECT: Locator
  SUBMIT_BUTTON: Locator
  CONFIRM_WITHDRAWAL_BUTTON: Locator
  constructor(page) {
    this.page = page
    this.CONFIRM_WITHDRAWAL_BUTTON = page.locator('text="Confirm Withdrawal"')
    this.SUBMIT_BUTTON = page.locator('[type="submit"]')
    this.CONNECT = page.locator(accountsTab.buttons.CONNECT)
    this.AMOUNT = page.locator(accountsTab.fields.AMOUNT)
  }

  tokenDepositRequest = async () => {
    await click(accountsTab.buttons.DEPOSIT, this.page)
    await click(accountsTab.listBox.TOKEN, this.page)
    await click(accountsTab.listBox.TOKEN_VALUE, this.page)
    await waitForText(this.page, '0.0.609610')
  }
  tokenWithdrawalRequest = async () => {
    await click(accountsTab.buttons.WITHDRAW_SECTON, this.page)
    await click(accountsTab.listBox.TOKEN, this.page)
    await click(accountsTab.listBox.TOKEN_VALUE, this.page)
    await typeText(accountsTab.fields.WALLET, '0.0.609610', this.page)
    await click(accountsTab.fields.AMOUNT, this.page)
    await typeText(accountsTab.fields.AMOUNT, '1', this.page)
    await click(accountsTab.buttons.CONFIRM, this.page)
    await waitForText(this.page, 'Success')
  }

  fillAccountInfoForm = async () => {
    await click(accountsTab.buttons.ADD_BANK_ACCOUNT, this.page)
    await typeText(accountsTab.fields.BANK_NAME, 'BANK_NAME', this.page)
    await typeText(accountsTab.fields.ACCOUNT_HOLDER_NAME, 'ACCOUNT_HOLDER_NAME', this.page)
    await typeText(accountsTab.fields.BANK_ACCOUNT_NUMBER, randomString(1) + '937', this.page)
    await typeText(accountsTab.fields.SWIFT_CODE, '123123', this.page)
    await click(accountsTab.listBox.CURRENCY, this.page)
    await click(accountsTab.listBox.CURRENCY_VALUE_SGD, this.page)
  }

  fillBankAddressForm = async () => {
    await typeText(accountsTab.fields.ADDRESS_LINE, 'shevchenko 250', this.page)
    await typeText(accountsTab.fields.CITY, 'lviv', this.page)
    await typeText(accountsTab.fields.STATE, 'lviv', this.page)
    await typeText(accountsTab.fields.POSTAL_CODE, '18000', this.page)
    await click(accountsTab.listBox.COUNTRY, this.page)
    await click(accountsTab.listBox.COUNTRY_VALUE, this.page)
    await click(accountsTab.fields.BANK_NAME, this.page)
    await click(accountsTab.buttons.SUBMIT_ACCOUNT, this.page)
    const exist = await shouldExist(accountsTab.buttons.MORE, this.page)
    return exist
  }
  editBankAccount = async () => {
    const randomName = 'newHolderName' + randomString()
    await click(accountsTab.buttons.MORE, this.page)
    await click(accountsTab.buttons.EDIT, this.page)
    await clearAndTypeText(accountsTab.fields.ACCOUNT_HOLDER_NAME, randomName, this.page)
    return randomName
  }
  viewBankAccount = async () => {
    await click(accountsTab.buttons.MORE, this.page)
    await click(accountsTab.buttons.VIEW_ACCOUNT, this.page)
    await shouldExist(accountsTab.ACCOUNT_INFORMATION, this.page)
  }

  removeBankAccount = async () => {
    await click(accountsTab.buttons.MORE, this.page)
    await click(accountsTab.buttons.REMOVE, this.page)
    const code = await this.page.$$('input')
    for (const digit of code) {
      await digit.fill('1')
    }
    await click(accountsTab.buttons.CONFIRM, this.page)
    await waitForResponseInclude(this.page, '/remove')
    await shouldNotExist(accountsTab.buttons.MORE, this.page)
  }

  createWithdrawalsRequest = async (amaunt = '10000', isApprove = true) => {
    await click(accountsTab.listBox.TO_BANK_ACCOUNT, this.page)
    const locator = await this.page.locator(accountsTab.listBox.BANK)
    await locator.last().click()
    await typeText(accountsTab.fields.AMOUNT, amaunt, this.page)
    if (isApprove) {
      await click(accountsTab.buttons.CONFIRMATION_WITHDRAWAL, this.page)
      const code = await this.page.$$('[role="dialog"] input')
      for (const digit of code) {
        await digit.fill('1')
      }
      await click(accountsTab.buttons.WITHDRAW, this.page)
    }
  }

  getBalances = async email => {
    const { cookies, request } = await getCookies(email)
    const id = (await request.json()).data._id
    const resp = await getRequest(cookies, `virtual-accounts/` + id)
    const availableUSD = resp.data[0].documents[0].balance
    const availableSGD = resp.data[0].documents[1].balance
    return { availableSGD, availableUSD }
  }
}

export { Accounts }
