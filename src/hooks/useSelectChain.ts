import { useCallback } from 'react'
import { InterfaceChainId } from 'types/chains'
import { UserRejectedRequestError } from 'viem'
import useSwitchChain from './useSwitchChain'

export default function useSelectChain() {
  const switchChain = useSwitchChain()

  return useCallback(
    async (targetChain: InterfaceChainId) => {
      try {
        await switchChain(targetChain)

        return true
      } catch (error: any) {
        if (
          !error?.message?.includes("Request of type 'wallet_switchEthereumChain' already pending") &&
          !(error instanceof UserRejectedRequestError) /* request already pending */
        ) {
          console.log('useSelectChain', 'useSelectChain', error.message)
        }
        return false
      }
    },
    [switchChain]
  )
}
