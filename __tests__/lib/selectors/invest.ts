export const invest = {
  PRIMARY_CARD: '[data-testid="icon-button"]',
  TABLE: '[data-testid="table"]',
  ROW: 'tbody tr',
  TOAST_NOTIFICATIONS: '[data-testid="notification-inner"]',
  INVEST_TAB: '[href="/app/invest"]',
  PRIMARY_SECTION: '[href="/app/invest"] >> text="Primary"',
  LANDING_TABLES_PANEL: '[role="tabpanel"]',
  OVERVIEW_PAGE: '[href="/app/invest/overview"]',
  SECOND_MARKET: '[href="/app/otc-market"]',
  CHECKBOX: '[type="checkbox"]',
  GRAPH: '[data-testid="pairName"]',
  ACCOUNTS_COMMITMENTS: '[href="/app/invest/commitments"]',
  ISSUANCE_COMMITMENTS: '[href="/app/issuance/commitments/:issuerId/:dsoId"]',
  OFFERS: '[href*="/app/invest/offerings/"]',

  buttons: {
    INVEST: '[data-testid="otc-card-link"]',
    VIEW_INVEST: '[data-testid="view-button"]',
    CANCEL_ORDER: '[data-testid="table"] >> text="Cancel"',
    PLACE_ORDER: '[data-testid="submit"]',
    DOWNLOAD_DOC: 'text="Download Subscription Document"',
    CREATE_CUSTODY_ADDRESS: 'text="Create custody withdrawal address"',
    SUBMIT_INVEST: 'button >> text="Invest"',
    LEARN_MORE: 'span >> text="Learn More"',
    INVEST_LANDING: '[href*="/view/make-investment"]',
    I_AGREE: 'button >> text="I Agree"',
    DECLINE: 'button >> text="Decline"',
    SELL: 'button >> text="SELL"',
    VIEW_SECOND_DSO:
      '[href="/app/invest/commitments/618e3111cc078c0e59014af5/view"]',
    INVEST_ACCOUNT:
      '[href="/app/invest/offerings/61c1ca2956e67e0e60c340f5/61c1e3e356e67e0e60c35854/view/make-investment"]'
  },
  fields: {
    SEARCH: '[placeholder="Search"]',
    PRICE: '[id="price"]',
    AMOUNT: '[id="amount"]',
    // SEARCH: '[placeholder="Search Offers"]',
    UPLOAD_SIGNED_DOC: '[name="signedSubscriptionDocument"]',
    NUMBER_UNITS: '[id="numberOfUnits"]',
    OTP: '[id="otp"]'
  },
  listBox: {
    DESTINATION_WALLET_ADDRESS: '[id="withdrawalAddress"]',
    WALLET_ADDRESS_AQA_VALUE: '[data-value="6184dfe93899410e58bbe013"]',
    IXPS_SGD_PAIR: '[href="/app/otc-market/market/61a71463ad10390e378804e3"]',
    PAIR_NAME: '[data-testid="pairName"]',
    PAIR_NAME_VALUE: 'a >> text="AQA##/SGD"'
  }
}
