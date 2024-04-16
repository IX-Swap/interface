export enum LbpStatus {
  draft = 'draft',
  pending = 'pending',
  live = 'live',
  closed = 'closed',
  paused = 'paused',
  ended = 'ended',
}

export interface INameValue {
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
  id?: number
  file: File
}

export interface LbpFormValues {
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
  startDate: Date
  endDate: Date
  minPrice: number
  maxPrice: number
  creatorId?: number
  status?: LbpStatus
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
