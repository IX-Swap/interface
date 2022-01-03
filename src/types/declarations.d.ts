/* eslint-disable */
import Web3 from 'web3'

const APP_VERSION: string

declare module 'material-ui-phone-number'

declare global {
  interface Window {
    ethereum: any
    web3: any
  }

  namespace NodeJS {
    interface ProcessEnv {
      PUBLIC_URL: string
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}
