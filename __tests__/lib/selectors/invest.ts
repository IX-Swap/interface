export const invest = {
  INVEST_TAB: '[href="/app/invest"]',
  PRIMARY_SECTION: '[href="/app/invest"] >> text="Primary"',

  buttons: {
    INVEST: '[data-testid="otc-card-link"]',
    VIEW_INVEST: '[data-testid="view-button"]',
    DOWNLOAD_DOC: 'text="Download Subscription Document"',
    CREATE_CUSTODY_ADDRESS: 'text="Create custody withdrawal address"',
    SUBMIT_INVEST: 'button >> text="Invest"',
    INVEST_ACCOUNT:
      '[href="/app/invest/offerings/617699e04f2dcc0e7d304e4d/6185361bf251660e58fd5ed0/view/make-investment"]'
  },
  fields: {
    SEARCH: '[placeholder="Search Offers"]',
    UPLOAD_SIGNED_DOC: '[name="signedSubscriptionDocument"]',
    NUMBER_UNITS: '[id="numberOfUnits"]',
    OTP: '[id="otp"]'
  },
  listBox: {
    DESTINATION_WALLET_ADDRESS: '[id="withdrawalAddress"]',
    WALLET_ADDRESS_AQA_VALUE: '[data-value="6184dfe93899410e58bbe013"]'
  }
}
