export enum OfferStatus {
  draft = 'draft',
  pendingApproval = 'pendingApproval',
  declined = 'declined',
  approved = 'approved',
  whitelist = 'whitelist',
  preSale = 'preSale',
  sale = 'sale',
  closed = 'closed',
  claim = 'claim',
}

export enum OfferNetwork {
  kovan = 'kovan',
  polygon = 'polygon',
  ethereum = 'ethereum',
}

export enum OfferCapitalStructure {
  equity = 'equity',
  debt = 'debt',
  hybrid = 'hybrid',
  crypto = 'crypto',
}
export enum OfferTimeframeType {
  whitelist = 'whitelist',
  preSale = 'preSale',
  sale = 'sale',
  closed = 'closed',
  claim = 'claim',
}

export enum OfferIndustry {
  technology = 'technology',
  finance = 'finance',
  blockchain = 'blockchain',
  realEstate = 'realEstate',
  gaming = 'gaming',
  energy = 'energy',
  healthcare = 'healthcare',
  other = 'other',
}

export enum OfferTokenStandart {
  erc20 = 'ERC20',
  xtokenlite = 'xtokenlite',
}

export enum OfferType {
  securityToken = 'securityToken',
  fNFT = 'fNFT',
  crypto = 'crypto',
}

export interface OfferSocialMediaLinks {
  twitter?: string
  telegram?: string
  linkedin?: string
  youtube?: string
  coinmarketcap?: string
  coingecko?: string
  discord?: string
  reddit?: string
}

export enum OfferDistributionFrequency {
  notApplicable = 'notApplicable',
  monthly = 'monthly',
  quarterly = 'quarterly',
  semiAnnually = 'semiAnnually',
  annually = 'annually',
}

export enum WhitelistStatus {
  pending = 'pending',
  accepted = 'accepted',
  declined = 'declined',
}

export enum OfferFileType {
  document = 'document',
  video = 'video',
  image = 'image',
}

export enum InvestmentStage {
  preSale = 'preSale',
  sale = 'sale',
}

export enum PaymentType {
  preSale = 'claim',
  sale = 'refund',
}

export interface Asset {
  public: string
}

export interface OfferTimeframe {
  type: OfferTimeframeType
  startDate: Date
  endDate: Date
}

export interface Offer {
  id: string

  title: string

  shortDescription: string
  longDescription: string

  status: OfferStatus
  type: OfferType

  network: OfferNetwork

  issuerName: string

  industry: OfferIndustry

  investmentType: string

  capitalStructure: OfferCapitalStructure

  issuerIdentificationNumber: string

  country: string

  socialMedia: OfferSocialMediaLinks

  tokenName: string

  tokenTicker: string
  tokenUsdValue: string
  tokenStandart: OfferTokenStandart
  decimals: number

  softCap: string
  hardCap: string

  minInvestment: string
  maxInvestment: string

  hasPresale: boolean

  presaleMinInvestment: string
  presaleMaxInvestment: string
  presaleAlocated: string

  contactUsEmail: string
  issuerWebsite: string
  whitepaperUrl: string

  isMain: boolean
  allowOnlyAccredited: boolean
  closesSoon: boolean
  softCapReached: boolean
  hardCapReached: boolean

  contractAddress: string

  profilePictureId: number
  cardPictureId: number

  ownerId: number

  profilePicture: Asset;
  cardPicture: Asset;

  timeframes: OfferTimeframe[]

  daysTillSale?: number

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export function isWithinTimeframe(frame: OfferTimeframe, date: Date = new Date()) {
  return date >= frame.startDate && date <= frame.endDate
}