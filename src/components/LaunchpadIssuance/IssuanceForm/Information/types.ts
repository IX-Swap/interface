import { OfferIndustry, OfferInvestmentStructure, OfferNetwork, OfferTokenStandart } from "state/launchpad/types"
import { DateSchema } from "yup"

export enum OfferTokenType {
  WIXS,
  WBTC,
  WETH,
  MATIC,
  USDC,
  USDT
}

export enum SocialMediaType {
  twitter = 'twitter',
  telegram = 'telegram',
  linkedIn = 'linkedIn',
  discord = 'discord',
  reddit = 'reddit',
  youTube = 'youTube',
  coinMarketCap = 'coinMarketCap',
  coinGecko = 'coinGecko'
}

export interface VideoLink {
  title: string
  url: string
}

export interface InformationFormValues {
  profilePicture: File
  cardPicture: File

  shortDescription: string
  longDescription: string

  name: string
  companyIdNumber: string

  industry: OfferIndustry
  investmentStructure: OfferInvestmentStructure

  country: string

  tokenName: string
  tokenTicker: string
  tokenType: string

  network: OfferNetwork

  hardCap: string
  softcap: string

  pricePerToken: number

  tokenStandart: OfferTokenStandart

  minInvestment: string
  maxInvestment: string

  hasPresale: boolean
  presaleAlocated: string
  presaleMinInvestment: string
  presaleMaxInvestment: string

  images: File[]
  videos: VideoLink[]
  additionalDocuments: AdditionalDocument[]

  members: TeamMember[]

  faq: FAQEntry[]

  terms: {
    whitelist: Date
    presale: Date
    sale: Date
    closed: Date
    claim: Date
  }

  social: SocialMediaLink[]
}

export interface SocialMediaLink {
  type: SocialMediaType
  url: string
}

export interface AdditionalDocument {
  name: string
  file: File
}

export interface FAQEntry {
  question: string
  answer: string
}

export interface TeamMember {
  photo: File
  name: string
  role: string
  about: string
}

export interface DateRange {
  start: Date
  end: Date
}