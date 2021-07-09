module.exports = {
  auth: {
    buttons: {
      GET_STARTED: '//button',
      IMPORT_WALLET: '[class="button btn-primary first-time-flow__button"]',
      I_AGREE: '[data-testid="page-container-footer-next"]',
      LOGOUT: '[data-placement="bottom-end"]',
      SUBMIT: "[type='submit']",
      QR_POPOVER_CLOSE: '[data-testid="popover-close"]',
      ETH_ENV: 'text="Ethereum Mainnet"',
      RINKEBY_ENV: 'text="Rinkeby Test Network"',
      NEXT: '//button[text()="Next"]',
      CONFIRM_CONNECTION: '[data-testid="page-container-footer-next"]',
      ADD_TOKEN: 'text="Add Token"',
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
