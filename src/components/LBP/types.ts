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
}

export interface LbpFile {
  mimeType: string | undefined
  name: string
  public?: string
  id?: number
  file?: File
}

export interface LbpFormValues {
  [x: string]: any
  id?: number
  name: string
  title: string
  description: string
  officialWebsite: string
  socialMedia: INameValue[]
  whitePaper: INameValue[]
  logoId?: number
  bannerId?: number
  additionalDocumentIds: number[]
  LBPLogo: LbpFile
  LBPBanner: LbpFile
  uploadDocs: LbpFile[]
  contractAddress?: string 
  shareAddress: string
  shareAmount: number
  shareMaxSupply: number
  assetTokenId?: number
  assetTokenAmount: number
  startWeight: number
  endWeight: number
  startDate: string
  endDate: string
  minPrice: number
  maxPrice: number
  creatorId?: number
  status?: LbpStatus
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  banner?: any
  logo?: any
  assetTokenSymbol?: any 
}

export interface TokenomicsProps {
  shareAddress: string
  contractAddress?: string
  assetTokenAddress: string
  assetTokenSymbol: string
  shareInput: number
  maxSupply: number
  assetInput: number
  startWeight: number
  endDate: string
  minPrice: number
  maxPrice: number
  startDate: string
  endWeight: number
}

export interface ProjectInfoProps {
  name: string
  title: string
  description: string
  website: string
  socialLinks: INameValue[]
  whitepapers: INameValue[]
  uploadDocs: LbpFile[]
}

export interface BrandingProps {
  LBPLogo: LbpFile
  LBPBanner: LbpFile
}

export interface MarketData {
  circMarketCapUSD: string;
  currentAssetPriceUSD: string;
  currentAssetReserve: string;
  currentAssetWeight: string;
  currentSharePriceUSD: string;
  currentShareReserve: string;
  currentShareWeight: string;
  fdvMarketCapUSD: string;
  liquidityUSD: string;
}

