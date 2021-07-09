import { getTestAttribute } from '../helpers/helpers'

module.exports = {
  swap: {
    field: {
      CURRENCY_OUTPUT: '//*[@id="swap-currency-output"]//INPUT',
      CURRENCY_INPUT: '//*[@id="swap-currency-input"]//INPUT',
      // FIRST_NAME:'[name="firstName"]',
      // LAST_NAME:'[name="lastName"]',
      // EMAIL_ADDRESS:'[name="email"]',
      // PHONE_NUMBER:'[name="whatsappPhone"]',
      // COMPANY_NAME:'[name="company"]',
      // ETH_ADDRESS:'[name="ethWalletAddress"]'
    },
    button: {
      ADD_CURRENCY_TO_MASK: getTestAttribute('add-currency-to-metamask'),
      CLOSE_ADD_CURRENCY_POPOVER: getTestAttribute('return-close'),
      SWAP: '[id="swap-button"]',
      CONFIRM_SWAP: 'text="Confirm Swap"',
      CONNECT_WALLET: "//button[text()='Connect Wallet']",
      VIEW_ON_ETHERSCAN: "text='View on Etherscan'",
      METAMASK_CONNECT: '[id="connect-METAMASK"]',
      OUT_CURRENCY: '//*[@id="swap-currency-output"]//button',
      IN_CURRENCY: '//*[@id="swap-currency-input"]//button',
      DAI_CRYPTO: '[alt="DAI logo"]',
      ETH_CRYPTO: '[title="Ether"]',
    },
  },
}
