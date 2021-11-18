export const bankAccounts = {
  ACCOUNTS_SECTION: '[href="/app/accounts"]',
  BANK_ACCOUNTS: '[href="/app/accounts/bank-accounts"]',
  ACCOUNT_INFORMATION: '[role="dialog"]',

  buttons: {
    ADD_BANK_ACCOUNT: '[href="/app/accounts/bank-accounts/create"]',
    MORE: '[data-testid="more-button"]',
    VIEW_ACCOUNT: '[data-testid="dropdown"] >> text="View"',
    REMOVE: '[data-testid="dropdown"] >> text="Remove"',
    EDIT: '[data-testid="dropdown"] >> text="Edit"',
    SAVE: 'button >> text="Save"',
    SUBMIT_ACCOUNT: 'button >> text="Add Bank Account"',
    CONFIRM: 'button >> text="Confirm"'
  },
  fields: {
    BANK_NAME: "[id='bankName']",
    ACCOUNT_HOLDER_NAME: '[id="accountHolderName"]',
    BANK_ACCOUNT_NUMBER: '[id="bankAccountNumber"]',
    SWIFT_CODE: '[id="swiftCode"]',
    ADDRESS_LINE: '[id="address.line1"]',
    ADDRESS_LINE2: '[id="address.line2"]',

    CITY: '[id="address.city"]',
    STATE: '[id="address.state"]',
    POSTAL_CODE: '[id="address.postalCode"]'
  },
  listBox: {
    CURRENCY: '[id="asset"]',
    CURRENCY_VALUE_SGD: '[data-value="5fa95e07231c63088311b178"]',

    COUNTRY: '[id="address.country"]',
    COUNTRY_VALUE: '[data-value="Ukraine"]'
  }
}
