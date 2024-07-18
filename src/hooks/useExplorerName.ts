import { BASE_TGE_CHAINS, MATIC_TGE_CHAINS } from 'constants/addresses'
import { SupportedChainId } from 'constants/chains'
import { useMemo } from 'react'
import { useActiveWeb3React } from './web3'

export function getExplorerName(chainId?: number) {
  if (MATIC_TGE_CHAINS.includes(chainId as SupportedChainId)) {
    return 'Polyscan'
  } else if (BASE_TGE_CHAINS.includes(chainId as SupportedChainId)) {
    return 'Basescan'
  } else {
    return 'Explorer'
  }
}

export function useExplorerName() {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    return getExplorerName(chainId)
  }, [chainId])
}
