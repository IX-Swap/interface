export interface ISelect {
  value: string
  label: string
}

export interface ITokenData {
  id?: string
  ticker: string
  logo: any
  companyName: string
  description: string
  url: string
  industry: ISelect | null
  country: ISelect | null
  brokerDealerId: string | number
  active: boolean
  featured: boolean
  allowDeposit: boolean
  allowWithdrawal: boolean
  chainId: number
  whitelistPlatform: ISelect | null
  needsWhitelisting: boolean
  originalSymbol: string
  originalName: string
  originalDecimals: number | string
  originalAddress: string
  originalNetwork: ISelect | null
  symbol: string
  decimals: number | string
  custodyVaultId: number | string
  custodyAssetId: number | string
  custodyAssetAddress: string
  withdrawFee: number | string
  withdrawFeeAddress: string
  kycType: any
  whitelistFunction: string
  platformId: number
}
