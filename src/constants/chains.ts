import ethereumLogoUrl from 'assets/images/ethereum-logo.png'
import polygonLogoUrl from 'assets/images/polygon.svg'
import baseLogoUrl from 'assets/images/base.svg'
import ozeanLogoUrl from 'assets/images/chains/ozean.png'
import kaiaLogoUrl from 'assets/images/chains/kaia.png'
import { InterfaceChainId } from 'types/chains'

export enum SupportedChainId {
  MAINNET = 1,
  KOVAN = 42,
  MATIC = 137,
  MUMBAI = 80001,
  AMOY = 80002,
  BASE = 8453,
  BASE_SEPOLIA = 84532,
  OZEAN_TESTNET = 7849306,
  KAIROS_TESTNET = 1001,
  KAIA = 8217,
  RED_BELLY = 152,
  RED_BELLY_TESNET = 153,
}

export const NETWORK_LOGOS: { [chainName: string]: string } = {
  ethereum: ethereumLogoUrl,
  polygon: polygonLogoUrl,
  base: baseLogoUrl,
  ozean: ozeanLogoUrl,
  kaia: kaiaLogoUrl,
}

export const NETWORK_LABELS: { [chainId: number]: string } = {
  [1]: 'Ethereum',
  [4]: 'Rinkeby',
  [3]: 'Ropsten',
  [5]: 'Görli',
  [42]: 'Kovan',
  [80001]: 'Polygon Mumbai',
  [80002]: 'Polygon Amoy',
  [137]: 'Polygon',
  [84532]: 'Base Sepolia',
  [8453]: 'Base',
  [7849306]: 'Ozean Testnet',
  [1001]: 'Kairos Testnet',
  [8217]: 'Kaia',
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.KOVAN,
  SupportedChainId.MATIC,
  SupportedChainId.MUMBAI,
]

export interface ChainInfo {
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls?: string[]
  logoUrl?: string
  blockExplorerUrls: string[]
}

export type ChainInfoMap = { readonly [chainId: number]: ChainInfo }

export const nameChainMap = {
  polygon: SupportedChainId.MATIC,
  kovan: SupportedChainId.KOVAN,
  ethereum: SupportedChainId.MAINNET,
  base: SupportedChainId.BASE,

}

export const getChainFromName = (name: string, isTestnet = false): SupportedChainId => {
  const chainByName = {
    polygon: isTestnet ? SupportedChainId.AMOY : SupportedChainId.MATIC,
    base: isTestnet ? SupportedChainId.BASE_SEPOLIA : SupportedChainId.BASE,
    kaia: isTestnet ? SupportedChainId.KAIROS_TESTNET : SupportedChainId.KAIA,
    ozean: isTestnet ? SupportedChainId.OZEAN_TESTNET : SupportedChainId.OZEAN_TESTNET,
  } as any

  return chainByName[name]
}

export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.MAINNET]: {
    blockExplorerUrls: ['https://etherscan.io/'],
    chainName: 'Ethereum',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    logoUrl: ethereumLogoUrl,
  },
  [SupportedChainId.KOVAN]: {
    blockExplorerUrls: ['https://kovan.etherscan.io/'],
    chainName: 'Kovan',
    nativeCurrency: { name: 'Kovan ETH', symbol: 'kovETH', decimals: 18 },
    logoUrl: ethereumLogoUrl,
  },
  [SupportedChainId.MATIC]: {
    chainName: 'Polygon',
    nativeCurrency: {
      name: 'Matic Token',
      symbol: 'MATIC',
      decimals: 18,
    },
    logoUrl: polygonLogoUrl,
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: [
      'https://polygonscan.com/',
      'https://rpc-mainnet.matic.network',
      'https://matic-mainnet.chainstacklabs.com',
      'https://rpc-mainnet.maticvigil.com',
      'https://rpc-mainnet.matic.quiknode.pro',
      'https://matic-mainnet-full-rpc.bwarelabs.com',
    ],
  },
  [SupportedChainId.MUMBAI]: {
    chainName: 'Mumbai Testnet',
    nativeCurrency: {
      name: 'Matic Token',
      symbol: 'MATIC',
      decimals: 18,
    },
    logoUrl: polygonLogoUrl,
    rpcUrls: ['https://rpc-mumbai.matic.today'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/', 'https://explorer-mumbai.maticvigil.com/'],
  },
  [SupportedChainId.AMOY]: {
    chainName: 'Amoy Testnet',
    nativeCurrency: {
      name: 'Matic Token',
      symbol: 'MATIC',
      decimals: 18,
    },
    logoUrl: polygonLogoUrl,
    rpcUrls: ['https://rpc-amoy.polygon.technology/'],
    blockExplorerUrls: ['https://amoy.polygonscan.com/'],
  },
  [SupportedChainId.BASE]: {
    chainName: 'Base',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    logoUrl: baseLogoUrl,
    rpcUrls: ['	https://mainnet.base.org/'],
    blockExplorerUrls: ['https://basescan.org/'],
  },
  [SupportedChainId.BASE_SEPOLIA]: {
    chainName: 'Base Sepolia',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    logoUrl: baseLogoUrl,
    rpcUrls: ['https://sepolia.base.org/'],
    blockExplorerUrls: ['https://sepolia.basescan.org/'],
  },
  [SupportedChainId.OZEAN_TESTNET]: {
    chainName: 'Ozean Testnet',
    nativeCurrency: {
      name: 'USDX',
      symbol: 'USDX',
      decimals: 18,
    },
    logoUrl: ozeanLogoUrl,
    rpcUrls: ['https://ozean-testnet.rpc.caldera.xyz/http'],
    blockExplorerUrls: ['https://ozean-testnet.explorer.caldera.xyz'],
  },
  [SupportedChainId.KAIROS_TESTNET]: {
    chainName: 'Base Sepolia',
    nativeCurrency: {
      name: 'Kairos KAIA',
      symbol: 'KAIA',
      decimals: 18,
    },
    logoUrl: kaiaLogoUrl,
    rpcUrls: ['https://public-en-kairos.node.kaia.io'],
    blockExplorerUrls: ['https://kairos.kaiascan.io'],
  },
  [SupportedChainId.KAIA]: {
    chainName: 'Kaia',
    nativeCurrency: {
      name: 'Kaia',
      symbol: 'KAIA',
      decimals: 18,
    },
    logoUrl: kaiaLogoUrl,
    rpcUrls: ['https://public-en.node.kaia.io'],
    blockExplorerUrls: ['https://kaiascan.io'],
  },
}

export type SupportedInterfaceChainId = InterfaceChainId
