import { useAccount } from 'hooks/useAccount'
import { useEthersProvider } from 'hooks/useEthersProvider'
import { useMemo } from 'react'
import { ChainId } from 'types/chains'
import { Web3Provider } from '@ethersproject/providers'

export function useWeb3React() {
  const account = useAccount()
  const chainId = account?.chain?.id ?? ChainId.Base
  const provider = useEthersProvider({ chainId })
  // Fallback to a wallet provider (e.g., MetaMask) if available for sending transactions
  const walletProvider = typeof window !== 'undefined' && window.ethereum ? new Web3Provider(window.ethereum) : provider

  return useMemo(
    () => ({
      account: account.address,
      chainId,
      provider: walletProvider,
    }),
    [account.address, account.chainId, provider]
  )
}
