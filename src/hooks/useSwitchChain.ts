import { t } from '@lingui/macro'
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback } from 'react'
import { switchToNetwork } from './switchToNetwork'

export const CHAIN_SWITCH_MAP: { [key in SupportedChainId]: SupportedChainId } = {
  [SupportedChainId.MAINNET]: SupportedChainId.MATIC,
  [SupportedChainId.KOVAN]: SupportedChainId.MUMBAI,
  [SupportedChainId.MATIC]: SupportedChainId.MAINNET,
  [SupportedChainId.MUMBAI]: SupportedChainId.KOVAN,
}

export const CHAIN_SWITCH_STRINGS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: t`Polygon`,
  [SupportedChainId.KOVAN]: t`Polygon`,
  [SupportedChainId.MATIC]: t`Ethereum`,
  [SupportedChainId.MUMBAI]: t`Ethereum`,
}

export default function useSwitchChain(): {
  addChain: () => void
} {
  const { library, chainId } = useActiveWeb3React()
  const addChain = useCallback(async () => {
    if (
      library &&
      library.provider.isMetaMask &&
      library.provider.request &&
      chainId &&
      ALL_SUPPORTED_CHAIN_IDS.includes(chainId)
    ) {
      try {
        const selectedChain = CHAIN_SWITCH_MAP[chainId as SupportedChainId]
        await switchToNetwork({ chainId: selectedChain, library })
      } catch (e) {}
    }
  }, [library, chainId])

  return { addChain }
}
