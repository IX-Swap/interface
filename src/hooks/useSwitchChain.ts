import { useSwitchChain as useSwitchChainWagmi } from 'wagmi'

import { useAccount } from 'hooks/useAccount'
import { useCallback } from 'react'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { InterfaceChainId, SupportedChainId } from 'types/chains'

export const CHAIN_SWITCH_STRINGS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.POLYGON]: `Polygon`,
  [SupportedChainId.MAINNET]: `Ethereum`,
  [SupportedChainId.AMOY]: `Ethereum`,
  [SupportedChainId.BASE]: `Base`,
  [SupportedChainId.BASE_SEPOLIA]: `Base`,
} as any

export default function useSwitchChain() {
  const { switchChain } = useSwitchChainWagmi()
  const { connector } = useAccount()

  return useCallback(
    (chainId: InterfaceChainId) => {
      const isSupportedChain = ENV_SUPPORTED_TGE_CHAINS?.includes(chainId)
      if (!isSupportedChain) {
        throw new Error(`Chain ${chainId} not supported for connector (${connector?.name})`)
      }
      return new Promise<void>((resolve, reject) => {
        switchChain(
          { chainId },
          {
            onSuccess() {
              console.log('switchChain success')
            },
            onSettled(_, error) {
              if (error) {
                reject(error)
              } else {
                resolve()
              }
            },
          }
        )
      })
    },
    [connector?.name, switchChain]
  )
}
