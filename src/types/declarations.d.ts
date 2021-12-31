/* eslint-disable */
import Web3 from 'web3'

const APP_VERSION: string

declare module 'material-ui-phone-number'

declare module '*.svg' {
  const contents: string
  export default contents
}

declare global {
  interface Window {
    ethereum: any
    web3: any
  }
}
