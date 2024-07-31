import React, { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { createWagmiConfig } from 'utils/wagmi'

// Create a client
const queryClient = new QueryClient()

const Providers: React.FC<React.PropsWithChildren<{ children: React.ReactNode }>> = ({ children }) => {
  const wagmiConfig = useMemo(() => createWagmiConfig(), [])

  return (
    <WagmiProvider reconnectOnMount config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default Providers
