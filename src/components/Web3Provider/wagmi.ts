import { QueryClient } from '@tanstack/react-query'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import * as wallets from '@rainbow-me/rainbowkit/wallets'

import { CHAINS, transports } from './constants'

const WALLET_CONNECT_PROJECT_ID = <string>process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID

export function createWagmiConfig() {
  indexedDB?.deleteDatabase('WALLET_CONNECT_V2_INDEXED_DB')

  const config = getDefaultConfig({
    appName: 'IXSwap',
    projectId: WALLET_CONNECT_PROJECT_ID,
    wallets: [
      {
        groupName: 'Popular',
        wallets: [wallets.coinbaseWallet, wallets.metaMaskWallet, wallets.walletConnectWallet],
      },
      {
        groupName: 'Others',
        wallets: [
          wallets.trustWallet,
          wallets.phantomWallet,
          wallets.braveWallet,
          wallets.uniswapWallet,
          wallets.rainbowWallet,
          wallets.zerionWallet,
          wallets.rabbyWallet,
          wallets.injectedWallet,
        ],
      },
    ],
    chains: CHAINS,
    transports,
  })

  return config
}

export const queryClient = new QueryClient()
