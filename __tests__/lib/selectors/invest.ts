export const invest = {
  PRIMARY_CARD: '[data-testid="icon-button"]',
  TABLE: '[data-testid="table"]',
  ROW: 'tbody tr',
  TOAST_NOTIFICATIONS: '[data-testid="notification-inner"]',
  INVEST_TAB: '[href="/app/invest"]',
  PRIMARY_SECTION: '[href="/app/invest"] >> text="Primary"',
  LANDING_TABLES_PANEL: '[role="tablist"]',
  OVERVIEW_PAGE: '[href="/app/invest/overview"]',
  SECOND_MARKET: '[href="/app/otc-market"]',
  CHECKBOX: '[type="checkbox"]',
  GRAPH: '[data-testid="pairName"]',
  ACCOUNTS_COMMITMENTS: '[href="/app/invest/commitments"]',
  ISSUANCE_COMMITMENTS: '[href="/app/issuance/commitments/:issuerId/:dsoId"]',
  OFFERS: '[href*="/app/invest/offerings/"]',

  buttons: {
    COMMITMENTS_TAB: 'button >> text="Commitments"',
    INVEST: '[data-testid="otc-card-link"]',
    VIEW_INVEST: '[data-testid="view-button"]',
    CANCEL_ORDER: '[data-testid="table"] >> text="Cancel"',
    PLACE_ORDER: '[data-testid="submit"]',
    // DOWNLOAD_DOC: 'text="Download Subscription Document"',
    DOWNLOAD_DOC: `//*[contains(text(),'Download')]`,
    CLICKABLE_ETH_ADDRESS: '[data-testid="FileCopyOutlinedIcon"]',
    METAMASK_ICON: '[aria-label="add-to-metamask"]',
    CONNECT_TO_METAMASK: '[id="connect-METAMASK"]',
    CREATE_CUSTODY_ADDRESS: 'text="Create custody withdrawal address"',
    SUBMIT_INVEST: 'button >> text="Invest"',
    SUBMIT_COMMIT: '[data-type="commit"]',
    LEARN_MORE: 'a >> text="Learn More"',
    INVEST_LANDING: '[href*="/view/make-investment"]',
    I_AGREE: 'button >> text="I Agree"',
    DECLINE: 'button >> text="Decline"',
    SELL: 'button >> text="SELL"',
    VIEW_SECOND_DSO: '[href*="/app/invest/commitments/"]'
  },
  fields: {
    SEARCH: '[placeholder="Search"]',
    PRICE: '[id="price"]',
    AMOUNT: '[id="amount"]',
    SEARCH_DSO: '[placeholder="Search Offers"]',
    UPLOAD_SIGNED_DOC: '[name="signedSubscriptionDocument"]',
    NUMBER_UNITS: '[id="numberOfUnits"]',
    TOTAL_AMOUNT: '[id="totalAmount"]',
    PRICEPER_UNIT: '[id="pricePerUnit"]',
    OTP: '[id="otp"]'
  },
  listBox: {
    DESTINATION_WALLET_ADDRESS: '[id="withdrawalAddress"]',
    WALLET_ADDRESS_AQA_VALUE: '[data-value="6184dfe93899410e58bbe013"]',
    IXPS_SGD_PAIR: '[href="/app/otc-market/market/61a71463ad10390e378804e3"]',
    PAIR_NAME: '[data-testid="pairName"]',
    PAIR_NAME_VALUE: 'a >> text="AQA##/SGD"'
  },

  checkBox: { I_HAVE_READ: '[name="tnc"]' }
}
