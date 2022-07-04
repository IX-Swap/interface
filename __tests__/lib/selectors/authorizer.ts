export const authorizerEl = {
  AUTHORIZER: '[href="/app/authorizer"]',
  PENDING_ITEMS: '//*[text()="Pending Items"]',
  DROP_DOWN: '[data-testid="dropdown"]',

  viewProfileSection: {
    UPLOAD_DOCUMENT: '[id="documents[0].value"]',
    DELETE_DOCUMENT_BUTTON: '[aria-label="Delete File"]'
  },

  pages: {
    DASHBOARD: '[href="/app/authorizer"] >> nth=-1',
    BANK_ACCOUNTS: '[href="/app/authorizer/bank-accounts"]',
    CASH_WITHDRAWALS: '[href="/app/authorizer/cash-withdrawals"]',
    INDIVIDUAL_IDENTITIES: '[href="/app/authorizer/individuals"]',
    CORPORATE_IDENTITIES: '[href="/app/authorizer/corporates"]',
    ISSUANCE_OFFERINGS: '[href="/app/authorizer/offerings"]',
    COMMITMENTS: '[href="/app/authorizer/commitments"]',
    BLOCKCHAIN_ADDRESSES: '[href="/app/authorizer/withdrawal-addresses"]',
    PROPOSED_FUNDRAISING_DETAILS: '[href="/app/authorizer/issuance-details"]',
    LISTINGS: '[href="/app/authorizer/listings"]',
    VIRTUAL_ACCOUNT: '[href="/app/authorizer/virtual-accounts"]',
    TOKEN_DEPLOYMENT: '[href="/app/authorizer/token-deployment"]',
    OTC_TRADES: '[href="/app/authorizer/otc-trades"]'
  },

  buttons: {
    APPROVE: 'text="Approve"',
    REMOVE: 'span >> text="Remove"',
    MORE: '[data-testid="more-button"]',
    REJECT: 'text="Reject"',
    VIEW: 'text="View"',
    ALL: '[role="button"] >> text="All"'
  },
  fields: {}
}
