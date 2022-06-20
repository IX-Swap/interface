export const adminEl = {
  SECTION: '[href="/app/admin"]',
  BANNERS_PAGE: '[href="/app/admin/banner"]',
  IDENTITIES_PAGE: '[href="/app/admin/identities"]',
  ACCESS_REPORTS_PAGE: '[href="/app/admin/identities"]',
  CUSTODY_MANAGEMENT: '[href="/app/admin/custody-management"]',
  USERS_PAGE: '[href="/app/admin/users"]',
  VIRTUAL_ACCOUNT: '[href="/app/admin/virtualAccount"]',
  UNASSIGNED_SUCCESSFULLY: 'text="Virtual account unassigned successfully!"',
  FUNDS_MANAGEMENT_SECTION: '[href="/app/funds-management"]',
  TABLE: '[data-testid="table"] > tbody tr',
  SETTINGS: '[href="/app/settings"]',

  buttons: {
    FIRST_IN_TABLE: '//td//input',
    PROFILE_VIEW: '[aria-controls="profile-menu"]',
    DISABLE_THIS_USER: 'button >> text="DISABLE THIS USER"',
    DISABLE: 'button >> text="DISABLE"',
    ENABLE_THIS_USER: 'button >> text="ENABLE THIS USER"',
    ENABLE: 'button >> text="ENABLE"',
    CREATE_IDENTITY: 'text="Create Identity"',
    ADD_ACCOUNTS: 'BUTTON >> text="ADD ACCOUNTS"',
    CONFIRM: 'text="Confirm"',
    AVAILABLE_ACCOUNTS: 'button>>text="Available Accounts"',
    SAVE: 'button >> text="Save"',
    OK: '[role="dialog"] >> text="Ok"'
  },

  fields: {
    COUNT_FROM: '[name="from"]',
    COUNT_TO: '[name="to"]',
    BANNER_IMG: 'input[id="banner"]'
  },

  checkBox: { CREATED_BY_ADMIN: '[name="createdByAdmin"]' },

  dropDown: {
    NO_IDENTITY: 'text="No Identity Created Yet"',
    IDENTITY_TYPE: '[aria-haspopup="listbox"]',
    INDIVIDUAL_VALUE: '[data-value="individual"]',
    CORPORATE_VALUE: '[data-value="corporate"]',

    ISSUER_RIGHTS: '[data-value="issuer"]',
    AUTHORIZER_RIGHTS: '[data-value="authorizer"]',
    FUNDMANAGER_RIGHTS: '[data-value="fundmanager"]',
    CURRENCY: '[id="currency"]',
    CURRENCY_USD: '[data-value="USD"]'
  }
}
