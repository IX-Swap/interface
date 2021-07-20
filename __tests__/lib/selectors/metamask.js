const { getTestAttribute } = require('../helpers/helpers')

module.exports = {
  auth: {
    buttons: {
      GET_STARTED: '(//*[@id="app-content"]//button)',
      IMPORT_WALLET: '[class="button btn-primary first-time-flow__button"]',
      LOGOUT: '[data-placement="bottom-end"]',
      SUBMIT: "[type='submit']",
      QR_POPOVER_CLOSE: '[data-testid="popover-close"]',
      ETH_ENV: 'text="Ethereum Mainnet"',
      RINKEBY_ENV: 'text="Rinkeby Test Network"',
      NEXT: '//button[text()="Next"]',
      CONFIRM: '[data-testid="page-container-footer-next"]',
      ADD_TOKEN: 'text="Add Token"',
      CANCEL: getTestAttribute('page-container-footer-cancel'),
    },

    field: {
      SECRET_PHRASE: "[placeholder='Paste seed phrase from clipboard']",
      PASSWORD: '[id="password"]',
      PASSWORD_CONF: "[id='confirm-password']",
    },

    checkbox: {
      I_READ_AGREE: '[class="first-time-flow__checkbox first-time-flow__terms"]',
    },
  },
}
