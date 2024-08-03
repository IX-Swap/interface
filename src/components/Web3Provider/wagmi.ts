import { QueryClient } from '@tanstack/react-query'
import { createClient } from 'viem'
import { createConfig, http } from 'wagmi'
import { connect } from 'wagmi/actions'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

import { injectedWithFallback } from './injectedWithFallback'
import { WC_PARAMS } from './walletConnect'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { WAGMI_CHAIN_INFO } from './constants'


// @ts-ignore
export const wagmiConfig = createConfig({
  // @ts-ignore
  chains: [...ENV_SUPPORTED_TGE_CHAINS.map((chain) => WAGMI_CHAIN_INFO[chain])],
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
