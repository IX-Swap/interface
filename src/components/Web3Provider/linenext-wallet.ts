import { Wallet, getWalletConnectConnector } from '@rainbow-me/rainbowkit'
import { coinbaseWallet } from 'wagmi/connectors'
import { rainbowWallet } from '@rainbow-me/rainbowkit/dist/wallets/walletConnectors'

import { injectedWallet } from '@rainbow-me/rainbowkit/wallets'
import { WalletConnectWalletOptions } from '@rainbow-me/rainbowkit/dist/wallets/walletConnectors/walletConnectWallet/walletConnectWallet'
import { CreateConnector, WalletDetailsParams } from '@rainbow-me/rainbowkit/dist/wallets/Wallet'
import DappPortalSDK from '@linenext/dapp-portal-sdk'
import { CreateConnectorFn, createConnector } from 'wagmi'
import { kaia, kairos } from 'viem/chains'
import { Address } from 'cluster'
import { WalletEvent } from 'utils/event-logs'

let sdkInstance: DappPortalSDK | null = null

/**
 * Initializes or retrieves the reusable SDK instance.
 * @returns {Promise<DappPortalSDK>} The initialized SDK instance.
 */
async function getSDKInstance(): Promise<DappPortalSDK> {
  if (!sdkInstance) {
    sdkInstance = await DappPortalSDK.init({
      clientId: 'bab621cd-1d1e-45ef-8b42-c2b0917c645a',
      chainId: '1001',
    })
    console.info('SDK Initialized', sdkInstance)
  }
  return sdkInstance
}

export const lineNextWallet = ({ projectId, options }: WalletConnectWalletOptions): Wallet => ({
  id: 'linenextWallet',
  name: 'Kaia Dapp Portal',
  iconUrl: 'https://vos.line-scdn.net/kaia-wallet-web-prod/wallet-web/assets/media/img_kaia.67d45f7d.svg',
  iconBackground: '#0c2f78',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=my.wallet',
    ios: 'https://apps.apple.com/us/app/my-wallet',
    chrome: 'https://chrome.google.com/webstore/detail/my-wallet',
    qrCode: 'https://my-wallet/qr',
  },
  mobile: {
    getUri: (uri: string) => uri,
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://my-wallet/learn-more',
      steps: [
        {
          description: 'We recommend putting My Wallet on your home screen for faster access to your wallet.',
          step: 'install',
          title: 'Open the My Wallet app',
        },
        {
          description: 'After you scan, a connection prompt will appear for you to connect your wallet.',
          step: 'scan',
          title: 'Tap the scan button',
        },
      ],
    },
  },
  extension: {
    instructions: {
      learnMoreUrl: 'https://my-wallet/learn-more',
      steps: [
        {
          description: 'We recommend pinning My Wallet to your taskbar for quicker access to your wallet.',
          step: 'install',
          title: 'Install the My Wallet extension',
        },
        {
          description:
            'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
          step: 'create',
          title: 'Create or Import a Wallet',
        },
        {
          description: 'Once you set up your wallet, click below to refresh the browser and load up the extension.',
          step: 'refresh',
          title: 'Refresh your browser',
        },
      ],
    },
  },
  createConnector: getLineConnector({
    projectId,
    walletConnectParameters: options,
  }),
})

export function getLineConnector({ projectId, walletConnectParameters }: any): CreateConnector {
  // Return a function that merges additional wallet details with `CreateConnectorFn`.
  return (walletDetails: WalletDetailsParams) => {
    console.log('Wallet details', walletDetails)
    return lineNextConnector(walletDetails)
  }
}

export function lineNextConnector(walletDetails: any): CreateConnectorFn {
  return createConnector((config) => ({
    id: 'linenextWallet',
    name: 'Linenext Wallet',
    type: 'wallet',
    ...walletDetails.rkDetails,
    connect: async (params) => {
      console.info('Config lINEXT NEXT', config)
      const sdk = await getSDKInstance()
      const provider = sdk.getWalletProvider()
      console.info('provider lINEXT NEXT', provider)
      const accounts = (await provider.request({ method: 'kaia_requestAccounts' })) as string[]

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found')
      }

      new WalletEvent('Line Liff connector').walletAddress(accounts[0]).info('Connecting...')
      return { accounts, chainId: kairos.id }
    },
    disconnect: async () => {
      console.info('Disconnect is currently not supported for Linenext Wallet.')
    },
    getAccounts: async () => {
      const sdk = await getSDKInstance()
      const provider = sdk.getWalletProvider()
      const accounts = (await provider.request({ method: 'eth_accounts' })) as string[]

      if (!accounts || accounts.length === 0) {
        throw new Error('Wallet not connected')
      }

      return accounts
    },
    getChainId: async () => {
      const sdk = await getSDKInstance()
      const provider = sdk.getWalletProvider()
      const chainId = await provider.request({ method: 'eth_chainId' })
      console.info('provider chain ID', Number(chainId))
      return Number(chainId)
    },
    getProvider: async () => {
      const sdkInstance = await DappPortalSDK.init({
        clientId: 'bab621cd-1d1e-45ef-8b42-c2b0917c645a',
        chainId: '1001',
      })
      const sdk = await getSDKInstance()
      return sdkInstance.getWalletProvider()
    },
    isAuthorized: async () => {
      const sdk = await getSDKInstance()
      const provider = sdk.getWalletProvider()
      const accounts = (await provider.request({ method: 'eth_accounts' })) as string[]
      return accounts.length > 0
    },
    switchChain: async (params) => {
      const sdk = await getSDKInstance()
      const provider = sdk.getWalletProvider()
      const chain = config.chains.find((x) => x.id === params.chainId)
      console.info('switch ching chain', chain)

      await provider.request({
        method: 'wallet_switchKaiaChain',
        params: [{ chainId: `0x${params.chainId.toString(16)}` }],
      })

      // Do nothing, only support Kaia
      return

      // if (!chain) {
      //   throw new Error(`Chain ${params.chainId} not supported`)
      // }

      // await provider.request({
      //   method: 'wallet_switchEthereumChain',
      //   params: [{ chainId: `0x${params.chainId.toString(16)}` }],
      // })

      // return chain
    },
    onAccountsChanged: async (handler) => {
      // Add implementation when supported
    },
    onChainChanged: async (handler) => {
      // Add implementation when supported
    },
    isRainbowKitConnector: true,
    onDisconnect: async (handler) => {
      // Add implementation when supported
    },
  }))
}
