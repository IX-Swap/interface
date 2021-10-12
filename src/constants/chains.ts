export enum SupportedChainId {
  MAINNET = 1,
  KOVAN = 42,
  MATIC = 137,
  MUMBAI = 80001,
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
  blockExplorerUrls: string[]
}

export type ChainInfoMap = { readonly [chainId: number]: ChainInfo }

export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.MAINNET]: {
    blockExplorerUrls: ['https://etherscan.io/'],
    chainName: 'Ethereum',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.KOVAN]: {
    blockExplorerUrls: ['https://kovan.etherscan.io/'],
    chainName: 'Kovan',
    nativeCurrency: { name: 'Kovan ETH', symbol: 'kovETH', decimals: 18 },
  },
  [SupportedChainId.MATIC]: {
    chainName: 'Polygon',
    nativeCurrency: {
      name: 'Matic Token',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  [SupportedChainId.MUMBAI]: {
    chainName: 'Mumbai Testnet',
    nativeCurrency: {
      name: 'Matic Token',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mumbai.matic.today'],
    blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com/'],
  },
}
