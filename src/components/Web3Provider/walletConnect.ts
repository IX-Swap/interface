if (process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID === undefined) {
  throw new Error('REACT_APP_WALLET_CONNECT_PROJECT_ID must be a defined environment variable')
}
const WALLET_CONNECT_PROJECT_ID = <string>process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID

export const WC_PARAMS = {
  projectId: WALLET_CONNECT_PROJECT_ID,
  metadata: {
    name: 'IX Swap',
    description: 'IX Swap',
    url: 'https://app.ixswap.io/',
    icons: ['https://app.ixswap.io/favicon.png'],
  },
  qrModalOptions: {
    themeVariables: {
      '--wcm-font-family': '"Inter custom", sans-serif',
      '--wcm-z-index': '1060',
    },
  },
}
