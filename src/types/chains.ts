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

export type InterfaceChainId = SupportedChainId
