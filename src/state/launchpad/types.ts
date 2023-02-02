import { OfferTokenType } from 'components/LaunchpadIssuance/IssuanceForm/Information/types'
import { IssuanceStatus } from 'components/LaunchpadIssuance/types'
import { User } from 'state/admin/actions'

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
  other = 'other',
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

export enum IssunaceOfferStatus {
  pre = 'pre',
  live = 'live',
  ended = 'ended',
}

export interface Asset {
  id: number
  public: string
  name: string
  publicUrl: string
  mimeType: string
}

export interface OfferTimeframe {
  closed: Date
  claim: Date
  preSale: Date
  sale: Date
  whitelist: Date
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
  id?: number
  type: OfferFileType
  videoUrl: string
  file: Asset
}

export enum InvestmentStatus {
  pending = 'pending',
  done = 'done',
  failed = 'failed',
}

export enum OfferInvestmentStructure {
  equity = 'equity',
  debt = 'debt',
  hybrid = 'hybrid',
  other = 'others',
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

  investmentType: OfferInvestmentStructure

  capitalStructure: OfferCapitalStructure

  country: string

  socialMedia: OfferSocialMediaLinks

  tokenName: string
  tokenTicker: string
  tokenPrice: string
  tokenStandart: OfferTokenStandart
  tokenType: OfferTokenType

  investingTokenAddress: string
  investingTokenSymbol: string

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

  profilePicture: Asset
  cardPicture: Asset

  timeframe: OfferTimeframe
  terms: OfferTerms

  daysTillSale?: number
  daysTillClosed?: number
  hoursTillClosed?: number
  totalInvestment: number

  members: OfferTeamMember[]
  faq: OfferFAQ[]

  changesRequested?: string
  reasonRequested?: string

  createdAt: Date
  updatedAt: Date
  deletedAt?: Date

  files: OfferFile[]
  investments: OfferInvestment[]
  payments: OfferPayment[]
  subscriptions: OfferSubscription[]
  whitelists: OfferWhitelist[]
}

export interface IssuanceVettingDocuments {
  pitchDeck: Asset
  certificateOfIncorporation: Asset
  certificateOfIncumbency: Asset
  shareDirectorRegistry: Asset
  auditedFinancials: Asset
  memorandumArticle: Asset
  ownershipStructure: Asset
  resolutionAuthorizedSignatory: Asset
}

export interface IssuanceVettingDirector {
  id: number
  fullName: string
  proofOfIdentity: Asset
  proofOfAddress: Asset
}

export interface IssuanceFundingDocument {
  id: number
  document: Asset
}

export interface IssuanceOffer {
  id: number
  status: IssuanceStatus
  startDate: Date
}

export interface IssuanceVetting {
  id: number
  status: IssuanceStatus

  applicantFullName: string
  email: string
  companyName: string
  companyWebsite: string
  description: string

  document: IssuanceVettingDocuments

  fundingDocuments: IssuanceFundingDocument[]

  beneficialOwners: IssuanceVettingDirector[]
  directors: IssuanceVettingDirector[]
  offer?: IssuanceOffer

  changesRequested?: string
}

export interface Issuance {
  id: number
  name: string

  vetting?: IssuanceVetting
}

export interface DashboardOffer {
  id: number
  issuanceId: number
  issuanceName: string
  hardCap: number
  closeDate: Date
  status: OfferTimeframeType
  softCapReached: boolean
  hardCapReached: boolean
  investingTokenSymbol: string
  countInvestors: number
  commitment: number
  progress: number
  progressPercent: number
  isMine: boolean
}

export type IssuancePlain = Pick<Issuance, 'name' | 'id'>
