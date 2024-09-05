import type { AddEthereumChainParameter } from '@web3-react/types'
import { SupportedChainId } from 'constants/chains'
import { isProd, isStaging } from 'utils/isEnvMode'
import { capitalizeWords } from 'utils/strings'
import polygonLogoUrl from 'assets/images/polygon.svg'
import baseLogoUrl from 'assets/images/base.svg'

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
}

const MATIC: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Matic',
  symbol: 'MATIC',
  decimals: 18,
}

const CELO: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Celo',
  symbol: 'CELO',
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId]
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    }
  } else {
    return chainId
  }
}

const getAlchemyUrlFor = (network: string) =>
  process.env.REACT_APP_ALCHEMY_KEY ? `https://${network}.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}` : ''

type ChainConfig = { [chainId: number]: BasicChainInformation | ExtendedChainInformation }

export const MAINNET_CHAINS: ChainConfig = {
  1: {
    urls: [getAlchemyUrlFor('eth-mainnet'), 'https://cloudflare-eth.com'].filter(Boolean),
    name: 'Mainnet',
  },
  10: {
    urls: [getAlchemyUrlFor('opt-mainnet'), 'https://mainnet.optimism.io'].filter(Boolean),
    name: 'Optimism',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  42161: {
    urls: [getAlchemyUrlFor('arb-mainnet'), 'https://arb1.arbitrum.io/rpc'].filter(Boolean),
    name: 'Arbitrum One',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://arbiscan.io'],
  },
  137: {
    urls: [getAlchemyUrlFor('polygon-mainnet'), 'https://polygon-rpc.com'].filter(Boolean),
    name: 'Polygon Mainnet',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  8453: {
    urls: [getAlchemyUrlFor('base-mainnet'), 'https://basechain.infura.io'],
    name: 'Base',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://basescan.org'],
  },
}

export const TESTNET_CHAINS: ChainConfig = {
  420: {
    urls: [getAlchemyUrlFor('opt-sepolia'), 'https://goerli.optimism.io'].filter(Boolean),
    name: 'Optimism Goerli',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://goerli-explorer.optimism.io'],
  },
  421613: {
    urls: [getAlchemyUrlFor('arb-sepolia'), 'https://goerli-rollup.arbitrum.io/rpc'].filter(Boolean),
    name: 'Arbitrum Goerli',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://testnet.arbiscan.io'],
  },
  80001: {
    urls: ['https://rpc-mumbai.maticvigil.com'].filter(Boolean),
    name: 'Polygon Mumbai',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  },
  80002: {
    urls: [getAlchemyUrlFor('polygon-amoy'), 'https://rpc-amoy.polygon.technology/'].filter(Boolean),
    name: 'Polygon Amoy',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://amoy.polygonscan.com/'],
  },
  84532: {
    urls: [getAlchemyUrlFor('base-sepolia'), 'https://sepolia.basechain.infura.io'],
    name: 'Base Sepolia',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://sepolia.basescan.org'],
  },
}

export const CHAINS: ChainConfig = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
}

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>(
  (accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls

    if (validURLs.length) {
      accumulator[Number(chainId)] = validURLs
    }

    return accumulator
  },
  {}
)

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

export const getTokenLogoUrl = (network: string | undefined) => {
  if (network === NetworkName.BASE) {
    return baseLogoUrl
  } else if (network === NetworkName.POLYGON) {
    return polygonLogoUrl
  }
  return null
}

export const getPayoutTokenLogoUrl = (chainId: number | undefined) => {
  const networkName = chainIdToNetworkName(chainId || 1)
  return getTokenLogoUrl(networkName)
}
