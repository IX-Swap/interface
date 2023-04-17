import { useMemo } from 'react'
import { NativeCurrency } from '@ixswap1/sdk-core'

import { SupportedChainId } from 'constants/chains'
import { nativeOnChain } from 'constants/tokens'

import { useActiveWeb3React } from './web3'

export const useNativeCurrency = (): NativeCurrency => {
  const { chainId } = useActiveWeb3React()
  return chainId
        ? nativeOnChain(chainId)
        : nativeOnChain(SupportedChainId.MAINNET)
}
