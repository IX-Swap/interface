import { base, mainnet } from 'wagmi/chains'
import { createConfig, http } from 'wagmi'
import { coinbaseWallet, injected, safe } from 'wagmi/connectors'

export const injectedConnector = injected({
  shimDisconnect: false,
})
export const coinbaseConnector = coinbaseWallet({
  appName: 'PancakeSwap',
  appLogoUrl: 'https://pancakeswap.com/logo.png',
})
export const metaMaskConnector = injected({ target: 'metaMask', shimDisconnect: false })
export const trustConnector = injected({ target: 'trust', shimDisconnect: false })

export function createWagmiConfig() {
  // @ts-ignore
  return createConfig({
    chains: [mainnet, base],
    transports: {
      [mainnet.id]: http(),
      [base.id]: http(),
    },
    batch: {
      multicall: {
        batchSize: 1024 * 200,
        wait: 16,
      },
    },
    pollingInterval: 6_000,
    connectors: [
      metaMaskConnector,
      injectedConnector,
      safe(),
      coinbaseConnector,
      trustConnector,
    ],
  })
}
