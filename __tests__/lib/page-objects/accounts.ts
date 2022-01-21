import { bankAccounts } from '../selectors/accounts'
import { text } from '../helpers/text'
import { baseCreds } from '../helpers/creds'

import {
  click,
  typeText,
  waitForText,
  shouldNotExist,
  shouldExist,
  clearAndTypeText,
  waitForResponseInclude
} from '../helpers/helpers'

class BankAccounts {
  page: any
  constructor(page) {
    this.page = page
  }

  fillAccountInfoForm = async () => {
    await click(bankAccounts.buttons.ADD_BANK_ACCOUNT, this.page)
    await typeText(bankAccounts.fields.BANK_NAME, 'BANK_NAME', this.page)
    await typeText(
      bankAccounts.fields.ACCOUNT_HOLDER_NAME,
      'ACCOUNT_HOLDER_NAME',
      this.page
    )
    await typeText(bankAccounts.fields.BANK_ACCOUNT_NUMBER, '937', this.page)
    await typeText(bankAccounts.fields.SWIFT_CODE, '123123', this.page)
    await click(bankAccounts.listBox.CURRENCY, this.page)
    await click(bankAccounts.listBox.CURRENCY_VALUE_SGD, this.page)
  }

  fillBankAddressForm = async () => {
    await typeText(
      bankAccounts.fields.ADDRESS_LINE,
      'shevchenko 250',
      this.page
    )
    await typeText(bankAccounts.fields.CITY, 'lviv', this.page)
    await typeText(bankAccounts.fields.STATE, 'lviv', this.page)
    await typeText(bankAccounts.fields.POSTAL_CODE, '18000', this.page)
    await click(bankAccounts.listBox.COUNTRY, this.page)
    await click(bankAccounts.listBox.COUNTRY_VALUE, this.page)
    await click(bankAccounts.fields.BANK_NAME, this.page)
    await click(bankAccounts.buttons.SUBMIT_ACCOUNT, this.page)
    const exist = await shouldExist(bankAccounts.buttons.MORE, this.page)
    return exist
  }
  editBankAccount = async () => {
    await click(bankAccounts.buttons.MORE, this.page)
    await click(bankAccounts.buttons.EDIT, this.page)
    await typeText(
      bankAccounts.fields.ADDRESS_LINE2,
      'ADDRESS_LINE2',
      this.page
    )
    await clearAndTypeText(
      bankAccounts.fields.ACCOUNT_HOLDER_NAME,
      'newHolderName',
      this.page
    )
    await click(bankAccounts.buttons.SAVE, this.page)
    await waitForText(this.page, 'newHolderName')
  }
  viewBankAccount = async () => {
    await click(bankAccounts.buttons.MORE, this.page)
    await click(bankAccounts.buttons.VIEW_ACCOUNT, this.page)
    await shouldExist(bankAccounts.ACCOUNT_INFORMATION, this.page)
  }

  removeBankAccount = async () => {
    await click(bankAccounts.buttons.MORE, this.page)
    await click(bankAccounts.buttons.REMOVE, this.page)
    const code = await this.page.$$('input')
    for (const digit of code) {
      await digit.fill('1')
    }
    await click(bankAccounts.buttons.CONFIRM, this.page)
    await waitForResponseInclude(this.page, '/remove')
    await shouldNotExist(bankAccounts.buttons.MORE, this.page)
  }
}

export { BankAccounts }
