import React, { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient, wagmiConfig } from './wagmi'
import { ConnectionProvider } from 'hooks/useConnect'

export default function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectionProvider>
          {children}
        </ConnectionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}