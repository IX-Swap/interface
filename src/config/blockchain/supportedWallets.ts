import { AbstractConnector } from '@web3-react/abstract-connector'
import METAMASK_ICON_URL from 'assets/images/metamask.svg'
import WALLETCONNECT_ICON_URL from 'assets/images/walletConnectIcon.svg'
import { injected, walletconnect } from './connectors'

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconURL: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconURL: METAMASK_ICON_URL,
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconURL: METAMASK_ICON_URL,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconURL: WALLETCONNECT_ICON_URL,
    description:
      'Connect to MetaMask, Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
    mobileOnly: true
  }
}
