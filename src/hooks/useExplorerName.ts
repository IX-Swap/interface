import { MATIC_TGE_CHAINS } from 'constants/addresses'
import { SupportedChainId } from 'constants/chains'
import { useMemo } from 'react'
import { useActiveWeb3React } from './web3'

export function useExplorerName() {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    if (MATIC_TGE_CHAINS.includes(chainId as SupportedChainId)) {
      return 'Polyscan'
    }
    return 'Etherscan'
  }, [chainId])
}
