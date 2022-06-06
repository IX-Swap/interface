import { ALL_SUPPORTED_CHAIN_IDS } from 'config/blockchain/constants'
import { useCallback } from 'react'
import { switchToNetwork } from './switchToNetwork'
import { isMetamaskOrWalletConnect, useActiveWeb3React } from './web3'

export default function useSwitchChain(): {
  switchChain: (switchToChainId?: number) => void
} {
  const { library, chainId } = useActiveWeb3React()

  const switchChain = useCallback(
    async (switchToChainId): Promise<void> => {
      console.log({ library, provider: library?.provider })
      if (
        isMetamaskOrWalletConnect(library) &&
        library?.provider?.request != null &&
        chainId !== undefined &&
        ALL_SUPPORTED_CHAIN_IDS.includes(switchToChainId)
      ) {
        try {
          await switchToNetwork({ chainId: switchToChainId, library })
        } catch (e) {
          console.log('error switching network ', { e })
        }
      }
    },
    [library, chainId]
  )

  return { switchChain }
}
