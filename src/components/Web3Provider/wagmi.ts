import { QueryClient } from '@tanstack/react-query'
import { createClient } from 'viem'
import { createConfig, http } from 'wagmi'
import { coinbaseWallet, walletConnect } from 'wagmi/connectors'

import { injectedWithFallback } from './injectedWithFallback'
import { WC_PARAMS } from './walletConnect'
import { CHAINS, CLIENT_CONFIG, transports } from './constants'

export function createWagmiConfig() {
  // @ts-ignore
  return createConfig({
    chains: CHAINS,
    ssr: true,
    syncConnectedChain: true,
    transports,
    ...CLIENT_CONFIG,
    connectors: [
      injectedWithFallback(),
      walletConnect(WC_PARAMS),
      coinbaseWallet({
        appName: 'IX Swap',
        appLogoUrl: 'https://app.ixswap.io/favicon.png',
        reloadOnDisconnect: false,
        enableMobileWalletLink: true,
      }),
    ],
    // @ts-ignore
    client({ chain }) {
      return createClient({
        chain,
        ...CLIENT_CONFIG,
        transport: http(chain.rpcUrls.default.http[0]),
      })
    },
  })
}

export const queryClient = new QueryClient()
