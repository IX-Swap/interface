import React, { ReactNode, useMemo } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient, createWagmiConfig } from './wagmi'
import { ConnectionProvider } from 'hooks/useConnect'

export default function Web3Provider({ children }: { children: ReactNode }) {
  const wagmiConfig = useMemo(() => createWagmiConfig(), [])

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectionProvider>{children}</ConnectionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
