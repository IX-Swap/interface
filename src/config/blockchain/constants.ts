import ethereumLogoUrl from 'assets/images/ethereum.svg'
import polygonLogoUrl from 'assets/images/polygon.svg'

export const NetworkContextName = 'NETWORK'
export enum SupportedChainId {
  MAINNET = 1,
  GOERLI = 5,
  RINKEBY = 4,
  KOVAN = 42,
  MATIC = 137,
  MUMBAI = 80001
}

export const NETWORK_LABELS: { [chainId: number]: string } = {
  1: 'Ethereum',
  4: 'Rinkeby',
  5: 'Goerli',
  42: 'Kovan',
  80001: 'Polygon Mumbai',
  137: 'Polygon'
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
  SupportedChainId.MATIC,
  SupportedChainId.MUMBAI
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
  gasTrackerUrl: string
}

export interface ChainInfoMap {
  readonly [chainId: number]: ChainInfo
}
const ethereumGasTracker =
  'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=key'
export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.MAINNET]: {
    blockExplorerUrls: ['https://etherscan.io/'],
    chainName: 'Ethereum',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    logoUrl: ethereumLogoUrl,
    gasTrackerUrl: ethereumGasTracker
  },
  [SupportedChainId.GOERLI]: {
    blockExplorerUrls: ['https://goerli.etherscan.io/'],
    chainName: 'Goerli',
    nativeCurrency: { name: 'Goerli ETH', symbol: 'kovETH', decimals: 18 },
    logoUrl: ethereumLogoUrl,
    gasTrackerUrl: ethereumGasTracker
  },
  [SupportedChainId.RINKEBY]: {
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
    chainName: 'Rinkeby',
    nativeCurrency: { name: 'Rinkeby ETH', symbol: 'rinETH', decimals: 18 },
    logoUrl: ethereumLogoUrl,
    gasTrackerUrl: ethereumGasTracker
  },
  [SupportedChainId.KOVAN]: {
    blockExplorerUrls: ['https://kovan.etherscan.io/'],
    chainName: 'Kovan',
    nativeCurrency: { name: 'Ropsten ETH', symbol: 'ropETH', decimals: 18 },
    logoUrl: ethereumLogoUrl,
    gasTrackerUrl: ethereumGasTracker
  },
  [SupportedChainId.MATIC]: {
    chainName: 'Polygon',
    gasTrackerUrl:
      'https://gpoly.blockscan.com/gasapi.ashx?apikey=key&method=pendingpooltxgweidata',
    nativeCurrency: {
      name: 'Matic Token',
      symbol: 'MATIC',
      decimals: 18
    },
    logoUrl: polygonLogoUrl,
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: [
      'https://polygonscan.com/',
      'https://rpc-mainnet.matic.network',
      'https://matic-mainnet.chainstacklabs.com',
      'https://rpc-mainnet.maticvigil.com',
      'https://rpc-mainnet.matic.quiknode.pro',
      'https://matic-mainnet-full-rpc.bwarelabs.com'
    ]
  },
  [SupportedChainId.MUMBAI]: {
    chainName: 'Mumbai Testnet',
    gasTrackerUrl:
      'https://gpoly.blockscan.com/gasapi.ashx?apikey=key&method=pendingpooltxgweidata',
    nativeCurrency: {
      name: 'Matic Token',
      symbol: 'MATIC',
      decimals: 18
    },
    logoUrl: polygonLogoUrl,
    rpcUrls: [
      'https://matic-mumbai.chainstacklabs.com/',
      'https://rpc-mumbai.matic.today'
    ],
    blockExplorerUrls: [
      'https://mumbai.polygonscan.com/',
      'https://explorer-mumbai.maticvigil.com/'
    ]
  }
}
