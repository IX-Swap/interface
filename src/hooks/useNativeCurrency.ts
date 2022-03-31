import { useMemo } from 'react'
import { NativeCurrency } from '@ixswap1/sdk-core'

import { SupportedChainId } from 'constants/chains'
import { nativeOnChain } from 'constants/tokens'

import { useActiveWeb3React } from './web3'

export const useNativeCurrency = (): NativeCurrency => {
  const { chainId } = useActiveWeb3React()
  return useMemo(
    () =>
      chainId
        ? nativeOnChain(chainId)
        : // display mainnet when not connected
          nativeOnChain(SupportedChainId.MAINNET),
    [chainId]
  )
}
