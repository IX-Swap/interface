const { getTestAttribute } = require('../../helpers/helpers')

module.exports = {
  swap: {
    TRANSACTION_POPUP: '[data-testid="TransactionPopup"]',
    field: {
      CURRENCY_OUTPUT: '//*[@id="swap-currency-output"]//INPUT',
      CURRENCY_INPUT: '//*[@id="swap-currency-input"]//INPUT',
      SEARCH_INPUT: '[id="token-search-input"]',
    },
    button: {
      ADD_CURRENCY_TO_MASK: getTestAttribute('add-currency-to-metamask'),
      CLOSE_ADD_CURRENCY_POPOVER: getTestAttribute('return-close'),
      SWAP: '[id="swap-button"]',
      CONFIRM_SWAP: getTestAttribute('confirm-swap'),
      CONNECT_WALLET: "//button[text()='Connect Wallet']",
      VIEW_ON_ETHERSCAN: "text='View on Etherscan'",
      METAMASK_CONNECT: '[id="connect-METAMASK"]',
      OUT_CURRENCY: '//*[@id="swap-currency-output"]//button',
      IN_CURRENCY: '//*[@id="swap-currency-input"]//button',
      DAI_CRYPTO: '[alt="DAI logo"]',
      ETH_CRYPTO: '[title="Ether"]',
      REPLACE_CRYPTO: getTestAttribute('currencyReplace'),
      TABLE_ROW: getTestAttribute('tableRow'),
      CLOSE_POPUP: getTestAttribute('close'),
      MAX: 'button >> text="Max"',
      CHOOSE_TOKEN: "text ='Choose token'",
      MANAGE_LIST_TOKEN: getTestAttribute('list-token-manage-button'),
      VIEW_ON_EXPLORER: "text='View on Explorer'",
      MY_ACCOUNT: '[id="web3-status-connected"]',
      CLEAR_ALL: 'button >> text="Clear all"',
    },
  },
  pool: {
    button: {
      POOL_SECTION: '[id="pool-nav-link"]',
      OPEN_TABLE: getTestAttribute('openTable'),
      ADD_LIQUIDITY: getTestAttribute('add-liquidity'),
      REMOVE_LIQUIDITY: getTestAttribute('remove-liquidity'),
      MAX_PERCENTAGE: getTestAttribute('percentage_100'),
      APPROVE_REMOVE_LIQUIDITY: getTestAttribute('approve-currency-a-remove'),
      REMOVE: getTestAttribute('approve-currency-b-remove'),
      CONFIRM_REMOVE: getTestAttribute('confirm-remove'),
      ADD_TO_LIQUIDITY: getTestAttribute('add-to-liquidity'),
      IMPORT: getTestAttribute('find-pool-button'),
      SUPPLY: getTestAttribute('supply'),
      CREATE_OR_SUPPLY: getTestAttribute('create-or-supply'),
    },
    field: { TOKEN_AMOUNT: '[class*="token-amount-input"]' },
  },
  settings: { button: { OPEN_SETTINGS: '[id="open-settings-dialog-button"]' } },
  securityToken: {
    TABLE_ROW: getTestAttribute('row'),
    DEPOSIT_POPUP: getTestAttribute('depositPopup'),

    button: {
      OPEN_SECURITY: '[id="stake-nav-link"]',
      TOKEN_ROW: getTestAttribute('custodian-sec-token-info'),
      ACCREDITATION: getTestAttribute('pass-kyc-and-accreditation'),
      DEPOSIT: getTestAttribute('deposit'),
      WITHDRAW: getTestAttribute('withdraw'),
      CREATE_DEPOSIT: 'text="Create deposit request"',
      WITHDRAW_APPROVE: 'text="Send"',

      CANCEL: getTestAttribute('cancel'),
    },
  },
}
