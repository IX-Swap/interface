import { QueryClient } from '@tanstack/react-query'
import { createClient } from 'viem'
import { http } from 'wagmi'

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { createWeb3Modal } from '@web3modal/wagmi/react'

import { WC_PARAMS } from './walletConnect'
import { CHAINS, CLIENT_CONFIG, PUBLIC_NODES } from './constants'

export function createWagmiConfig() {
  const wagmiConfig = defaultWagmiConfig({
    chains: CHAINS,
    projectId: WC_PARAMS.projectId,
    metadata: {
      name: 'Web3Modal React Example',
      description: 'Web3Modal React Example',
      url: '',
      icons: [],
    },
    client({ chain }: any) {
      return createClient({
        chain,
        ...CLIENT_CONFIG,
        transport: http(PUBLIC_NODES[chain.id][0] || chain.rpcUrls.default.http[0]),
      })
    },
  })

  createWeb3Modal({
    wagmiConfig,
    projectId: WC_PARAMS.projectId,
    themeMode: 'light',
    themeVariables: {
      '--w3m-color-mix': '#fff',
      '--w3m-color-mix-strength': 20,
    },
  })

  return wagmiConfig
}

export const queryClient = new QueryClient()
