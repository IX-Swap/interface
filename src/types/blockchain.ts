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
