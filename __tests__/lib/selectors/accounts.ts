export const bankAccounts = {
  ACCOUNTS_SECTION: '[href="/app/accounts"]',
  BANK_ACCOUNTS: '[href="/app/accounts/bank-accounts"]',
  ACCOUNT_INFORMATION: '[role="dialog"]',
  COMMITMENTS_PAGE: '[href="/app/accounts/commitments"]',
  CASH_WITHDRAWALS_PAGE: '[href="/app/accounts/cash-withdrawals"]',
  CASH_DEPOSITS_PAGE: '[href="/app/accounts/cash-deposits"]',
  ASSET_BALANCES_PAGE: '[href="/app/accounts/balances"]',
  DIGITAL_SECURITIES: '[href="/app/accounts/digital-security"]',
  TRANSACTIONS: '[href="/app/accounts/transactions"]',

  buttons: {
    SGD: "//*[contains(text(),'(SGD)')]",
    ADD_BANK_ACCOUNT: '[href="/app/accounts/bank-accounts/create"]',
    MORE: '[data-testid="more-button"]',
    VIEW_ACCOUNT: '[data-testid="dropdown"] >> text="View"',
    REMOVE: '[data-testid="dropdown"] >> text="Remove"',
    EDIT: '[data-testid="dropdown"] >> text="Edit"',
    SAVE: 'button >> text="Save"',
    CASH_DEPOSIT: 'button >> text="CASH DEPOSIT"',
    SUBMIT_ACCOUNT: 'button >> text="Add Bank Account"',
    CONFIRM: 'button >> text="Confirm"',
    CANCEL: 'a >> text="Cancel"',
    CONFIRMATION_WITHDRAWAL: 'BUTTON >> text="Confirm Withdrawal"',
    WITHDRAW: 'button >> text="Withdraw"',
    DEPOSIT: '[href="/app/accounts/digital-security/deposit"]',
    WITHDRAW_SECTON: '[href="/app/accounts/digital-security/withdraw"]'
  },
  fields: {
    BANK_NAME: "[id='bankName']",
    ACCOUNT_HOLDER_NAME: '[id="accountHolderName"]',
    BANK_ACCOUNT_NUMBER: '[id="bankAccountNumber"]',
    SWIFT_CODE: '[id="swiftCode"]',
    ADDRESS_LINE: '[id="address.line1"]',
    ADDRESS_LINE2: '[id="address.line2"]',
    AMOUNT: '[id="amount"]',
    CITY: '[id="address.city"]',
    STATE: '[id="address.state"]',
    POSTAL_CODE: '[id="address.postalCode"]',
    WALLET: '[id="newAddress"]'
  },
  listBox: {
    CURRENCY: '[id="asset"]',
    CURRENCY_VALUE_SGD: '[data-value="5fa95e07231c63088311b178"]',
    CURRENCY_VALUE_USD: '[data-value="5fc25b1f4f97ed7f3444cac3"]',

    COUNTRY: '[id="address.country"]',
    COUNTRY_VALUE: '[data-value="Ukraine"]',

    TO_BANK_ACCOUNT: '[id="bankAccountId"]',
    BANK: '[role="option"]',

    TOKEN: '[id="token"]',
    TOKEN_VALUE: '[data-value="IX-IXPS HHT"]'
  }
}
