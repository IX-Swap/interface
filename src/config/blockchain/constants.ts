import ethereumLogoUrl from 'assets/images/ethereum.svg'
import polygonLogoUrl from 'assets/images/polygon.svg'
import baseLogoUrl from 'assets/images/base.svg'

export const NetworkContextName = 'NETWORK'
export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  MATIC = 137,
  MUMBAI = 80001,
  BASE_GOERLI = 84531
}

export const NETWORK_LABELS: { [chainId: number]: string } = {
  1: 'Ethereum',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Eth Goerli',
  42: 'Kovan',
  137: 'Polygon',
  80001: 'Polygon Mumbai',
  84531: 'Base Goerli'
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
  SupportedChainId.MATIC,
  SupportedChainId.MUMBAI,
  SupportedChainId.BASE_GOERLI
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
const maticGasTracker =
  'https://gpoly.blockscan.com/gasapi.ashx?apikey=key&method=pendingpooltxgweidata'

export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.MAINNET]: {
    blockExplorerUrls: ['https://etherscan.io/'],
    chainName: 'Ethereum',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
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
  [SupportedChainId.GOERLI]: {
    blockExplorerUrls: ['https://goerli.etherscan.io/'],
    chainName: 'Goerli',
    nativeCurrency: { name: 'Goerli ETH', symbol: 'kovETH', decimals: 18 },
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
  [SupportedChainId.MUMBAI]: {
    chainName: 'Mumbai Testnet',
    gasTrackerUrl: maticGasTracker,
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
  },
  [SupportedChainId.MATIC]: {
    chainName: 'Polygon',
    gasTrackerUrl: maticGasTracker,
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
  [SupportedChainId.BASE_GOERLI]: {
    blockExplorerUrls: ['https://goerli.basescan.org/'],
    chainName: 'Base Goerli',
    nativeCurrency: { name: 'Goerli ETH', symbol: 'GoETH', decimals: 18 },
    logoUrl: baseLogoUrl,
    gasTrackerUrl: ethereumGasTracker
  }
}
