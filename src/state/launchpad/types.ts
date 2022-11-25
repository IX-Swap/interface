import { User } from "state/admin/actions"

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
  name: string
}

export interface OfferTimeframe {
  type: OfferTimeframeType
  startDate: Date
  endDate: Date
}

export interface OfferTerms {
  grossIrr: string
  dividentYield: string
  investmentStructure: string
  investmentPeriod: number
  distributionFrequency: OfferDistributionFrequency
}

export interface OfferTeamMember {
  avatar: Asset
  name: string
  title: string
  description: string
}

export interface OfferFAQ {
  question: string
  answer: string
}

export interface OfferFile {
  type: OfferFileType
  videoUrl: string
  file: Asset
}

export enum InvestmentStatus {
  pending = 'pending',
  done = 'done',
  failed = 'failed',
}

export interface OfferInvestment {
  id: number

  amount: string
  token: string

  tokenAddress: string

  usdtValue: string

  stage: InvestmentStage
  status: InvestmentStatus

  offerId: number

  userId: number

  transactionId: number

  user: User

  // transaction: EthTransaction
}

interface OfferPayment {
  id: string
  type: PaymentType
  amount: string
  user: User
}

interface OfferSubscription {
  id: string
  email: string
}

interface OfferWhitelist {
  status: WhitelistStatus
  isInterested: boolean
  amount: string
  user: User
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
  issuerIdentificationNumber: string

  tokenAddress: string
  tokenSymbol: string

  industry: OfferIndustry

  investmentType: string

  capitalStructure: OfferCapitalStructure


  country: string

  socialMedia: OfferSocialMediaLinks

  tokenName: string

  tokenTicker: string
  tokenUsdValue: string
  tokenStandart: OfferTokenStandart
  decimals: number

  softCap: string
  hardCap: string
  
  softCapReached: boolean
  hardCapReached: boolean

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

  contractAddress: string

  profilePictureId: number
  cardPictureId: number

  ownerId: number

  profilePicture: Asset
  cardPicture: Asset

  timeframes: OfferTimeframe[]
  terms: OfferTerms

  daysTillSale?: number
  totalInvestment: number
  
  members: OfferTeamMember[]
  faq: OfferFAQ[]

  createdAt: Date
  updatedAt: Date
  deletedAt?: Date

  owner: User
  files: OfferFile[];
  investments: OfferInvestment[];
  payments: OfferPayment[];
  subscriptions: OfferSubscription[];
  whitelists: OfferWhitelist[];
}

export function isWithinTimeframe(frame: OfferTimeframe, date: Date = new Date()) {
  return date >= frame.startDate && date <= frame.endDate
}
