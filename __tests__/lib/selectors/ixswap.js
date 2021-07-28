const { getTestAttribute } = require('../helpers/helpers')

module.exports = {
  swap: {
    field: {
      CURRENCY_OUTPUT: '//*[@id="swap-currency-output"]//INPUT',
      CURRENCY_INPUT: '//*[@id="swap-currency-input"]//INPUT',
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
      SUPPLY: getTestAttribute('supply'),
      CREATE_OR_SUPPLY: getTestAttribute('create-or-supply'),
    },
    field: { TOKEN_AMOUNT: '[class*="token-amount-input"]' },
  },
}
