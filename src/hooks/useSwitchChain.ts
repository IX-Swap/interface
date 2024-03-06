import { t } from '@lingui/macro'
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from 'constants/chains'
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { switchToNetwork } from './switchToNetwork'

export const CHAIN_SWITCH_MAP: { [key in SupportedChainId]: SupportedChainId } = {
  [SupportedChainId.MAINNET]: SupportedChainId.MATIC,
  [SupportedChainId.KOVAN]: SupportedChainId.MUMBAI,
  [SupportedChainId.MATIC]: SupportedChainId.MAINNET,
  [SupportedChainId.MUMBAI]: SupportedChainId.KOVAN,
}

export const CHAIN_SWITCH_STRINGS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `Polygon`,
  [SupportedChainId.KOVAN]: `Polygon`,
  [SupportedChainId.MATIC]: `Ethereum`,
  [SupportedChainId.MUMBAI]: `Ethereum`,
}

export default function useSwitchChain(): {
  addChain: () => void
} {
  const { provider, chainId } = useWeb3React()
  const addChain = useCallback(async () => {
    if (
      provider &&
      provider.provider.isMetaMask &&
      provider.provider.request &&
      chainId &&
      ALL_SUPPORTED_CHAIN_IDS.includes(chainId)
    ) {
      try {
        const selectedChain = CHAIN_SWITCH_MAP[chainId as SupportedChainId]
        await switchToNetwork({ chainId: selectedChain, provider })
      } catch (e) {}
    }
  }, [provider, chainId])

  return { addChain }
}
