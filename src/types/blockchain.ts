import { Web3Provider, ExternalProvider } from '@ethersproject/providers'

export type MetaDataField = [string, string, string]

export interface BlockchainNetwork {
  symbol: string
  name: string
  balance: string
  rpc: string

  walletAddress?: string
  ownerAddress?: string

  reserveAddress?: string
  reserveBalance?: string
}

export interface BlockchainSettings {
  networks: BlockchainNetwork[]
  metaDataFields: MetaDataField[] | null
  decimal: number
}

export enum BlockchainNetworks {
  ETH = 'Ethereum',
  XTZ = 'Tezos',
  HBAR = 'Hedera',
  ALGO = 'Algorand'
}
export interface ExternalProviderAx extends ExternalProvider {
  isWalletConnect?: boolean
}
export interface Web3ProviderAx extends Web3Provider {
  provider: ExternalProviderAx
}
