// eslint-disable-next-line no-restricted-imports
import { CurrencyAmount, Token } from '@ixswap1/sdk-core'
import { Chain as WagmiChain } from 'wagmi/chains'

export enum SupportedChainId {
  MAINNET = 1,
  POLYGON = 137,
  AMOY = 80002,
  BASE = 8453,
  BASE_SEPOLIA = 84532,
}

export enum ChainId {
  Mainnet = SupportedChainId.MAINNET,
  Polygon = SupportedChainId.POLYGON,
  Base = SupportedChainId.BASE,
  Amoy = SupportedChainId.AMOY,
  BaseSepolia = SupportedChainId.BASE_SEPOLIA,
}

export interface RetryOptions {
  n: number
  minWait: number
  maxWait: number
}

export enum NetworkLayer {
  L1,
  L2,
}

export interface SupportedChainInfo extends WagmiChain {
  readonly id: ChainId
  readonly sdkId: SupportedChainId
  readonly assetRepoNetworkName: string | undefined // Name used to index the network on this repo: https://github.com/Uniswap/assets/
  readonly backendChain: any
  readonly blockPerMainnetEpochForChainId: number
  readonly blockWaitMsBeforeWarning: number | undefined
  readonly bridge?: string
  readonly chainPriority: number // Higher priority chains show up first in the chain selector
  readonly docs: string
  readonly elementName: any
  readonly explorer: {
    name: string
    url: string
    apiURL?: string
  }
  readonly helpCenterUrl: string | undefined
  readonly infoLink: string
  readonly infuraPrefix: string | undefined
  readonly interfaceName: string
  readonly label: string
  readonly logo?: any
  readonly nativeCurrency: {
    name: string // 'Goerli ETH',
    symbol: string // 'gorETH',
    decimals: number // 18,
    address: string // '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    explorerLink?: string // Special override for native ETH explorer link
  }
  readonly networkLayer: NetworkLayer
  readonly pendingTransactionsRetryOptions: RetryOptions | undefined
  readonly spotPriceStablecoinAmount: CurrencyAmount<Token>
  readonly stablecoins: Token[]
  readonly statusPage?: string
  readonly supportsClientSideRouting: boolean
  readonly supportsGasEstimates: boolean
  readonly urlParam: string
  readonly wrappedNativeCurrency: {
    name: string // 'Wrapped Ether',
    symbol: string // 'WETH',
    decimals: number // 18,
    address: string // '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'
  }
}

export type InterfaceChainId = SupportedChainId
