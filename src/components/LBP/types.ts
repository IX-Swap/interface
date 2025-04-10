import { Asset } from 'state/launchpad/types'

export enum LbpStatus {
  draft = 'draft',
  pending = 'pending',
  live = 'live',
  closed = 'closed',
  paused = 'paused',
  ended = 'ended',
}

export interface INameValue {
  url?: unknown
  name: string
  value: string
}

export interface DashboardLbp {
  id: number
  name: string
  title: string
  description: string
  officialWebsite: string
  socialMedia: INameValue[]
  logoId: number
  bannerId: number
  contractAddress: string
  shareAddress: string
  network: string
  shareAmount: number
  shareMaxSupply: number
  assetTokenId: number
  assetTokenAmount: number
  startWeight: number
  endWeight: number
  startDate: Date
  endDate: Date
  minPrice: number
  maxPrice: number
  creatorId: number
  status: LbpStatus
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  logo: any
}

export interface LbpFile {
  mimeType: string | undefined
  name: string
  id: number
  file?: File
  uuid: number
  createdAt: string
}

export interface LbpFormValues {
  [x: string]: any
  id?: number
  title: string
  description: string
  officialWebsite: string
  socialMedia: INameValue[]
  whitePaper: INameValue[]
  logoId?: number
  bannerId?: number
  additionalDocumentIds: number[]
  LBPLogo: Asset
  LBPBanner: LbpFile
  uploadDocs: LbpFile[]
  contractAddress?: string
  shareAddress: string
  shareAmount: number
  shareMaxSupply?: number | string
  assetTokenAddress: string
  assetTokenAmount: number
  startWeight: number
  endWeight: number
  startDate: string
  endDate: string
  maxPrice?: number | string
  creatorId?: number
  status?: LbpStatus
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  banner?: any
  logo?: any
  assetTokenSymbol?: any
  allowSlippage?: boolean
  network: string
}

export interface TokenomicsProps {
  shareAddress: string
  xTokenLiteProxyAddress: string
  contractAddress?: string
  assetTokenAddress: string
  assetTokenSymbol: string
  shareInput: number
  maxSupply?: number | string
  assetInput: number
  startWeight: number
  endDate: string
  maxPrice?: number | string
  startDate: string
  endWeight: number
  network: string
}

export interface ProjectInfoProps {
  title: string
  description: string
  website: string
  socialLinks: INameValue[]
  whitepapers: INameValue[]
  uploadDocs: LbpFile[]
}

export interface BrandingProps {
  LBPLogo: Asset
  LBPBanner: LbpFile
}

export interface MarketData {
  circMarketCapUSD: string
  currentAssetPriceUSD: string
  currentAssetReserve: string
  currentAssetWeight: string
  currentSharePriceUSD: string
  currentShareReserve: string
  currentShareWeight: string
  fdvMarketCapUSD: string
  liquidityUSD: string
}
