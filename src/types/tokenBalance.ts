export interface Network {
  name: string
  supportsEvm: boolean
  _id: string
}

export interface Asset {
  name: string
  network: Network
  symbol: string
  type: string
  _id: string
}

export interface TokenBalance {
  _id?: string
  onHold: number
  available: number
  asset: Asset
}
