import { QueryClient } from '@tanstack/react-query'
import { createClient } from 'viem'
import { createConfig, http } from 'wagmi'
import { connect } from 'wagmi/actions'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'
import { baseSepolia, base, mainnet, polygon, polygonAmoy } from 'wagmi/chains'

import { injectedWithFallback } from './injectedWithFallback'
import { WC_PARAMS } from './walletConnect'

// @ts-ignore
export const wagmiConfig = createConfig({
  chains: [baseSepolia, base, mainnet, polygon, polygonAmoy],
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
      batch: { multicall: true },
      pollingInterval: 12_000,
      transport: http(chain.rpcUrls.default.http[0]),
    })
  },
})

export const queryClient = new QueryClient()

// Automatically connect if running in Cypress environment
if ((window as any).Cypress?.eagerlyConnect) {
  connect(wagmiConfig, { connector: injected() })
}
