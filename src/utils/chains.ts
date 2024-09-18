import { SupportedChainId } from 'constants/chains'
import { isProd, isStaging } from 'utils/isEnvMode'
import { capitalizeWords } from 'utils/strings'
import polygonLogoUrl from 'assets/images/polygon.svg'
import baseLogoUrl from 'assets/images/base.svg'

export enum NetworkName {
  BASE = 'base',
  POLYGON = 'polygon',
}

// chainIdToNetworkName covert chainId to network name regardless of whether it is testnet or mainnet
export const chainIdToNetworkName = (chainId: number): string => {
  for (const [network, chains] of Object.entries(Chains)) {
    if (chains.includes(chainId)) {
      return network
    }
  }

  return ''
}

export const Chains = {
  // network name : tesnet, mainnet
  [NetworkName.BASE]: [SupportedChainId.BASE_SEPOLIA, SupportedChainId.BASE],
  [NetworkName.POLYGON]: [SupportedChainId.AMOY, SupportedChainId.MATIC],
}

export const findChainName = (chainId: number): string | null => {
  for (const [network, chains] of Object.entries(Chains)) {
    if (chains.includes(chainId)) {
      return capitalizeWords(network)
    }
  }

  return null
}

export const checkWrongChain = (
  chainId: any,
  network: string
): {
  isWrongChain: boolean
  expectChain: number | null
} => {
  const expectedChains = Chains[network as NetworkName] || [] // Default to an empty array if network is not found
  if (!expectedChains.length) {
    return {
      isWrongChain: false,
      expectChain: null,
    }
  }
  const [testChain, mainChain] = expectedChains
  if (isProd || isStaging) {
    return {
      isWrongChain: chainId != mainChain,
      expectChain: mainChain,
    }
  }

  return {
    isWrongChain: chainId != testChain,
    expectChain: testChain,
  }
}

export const getChainLogoUrl = (network: string | undefined) => {
  if (network === NetworkName.BASE) {
    return baseLogoUrl
  } else if (network === NetworkName.POLYGON) {
    return polygonLogoUrl
  }
  return null
}

export const getChainLogoByChainId = (chainId: number | undefined) => {
  const networkName = chainIdToNetworkName(chainId || 0)
  return getChainLogoUrl(networkName)
}