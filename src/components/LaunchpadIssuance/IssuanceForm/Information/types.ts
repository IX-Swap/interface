import { OfferDistributionFrequency, OfferIndustry, OfferInvestmentStructure, OfferNetwork, OfferTokenStandart } from "state/launchpad/types"
import { DateSchema } from "yup"
import { IssuanceFile } from "../types"

export enum OfferTokenType {
  WIXS = 'WIXS',
  WBTC = 'WBTC',
  WETH = 'WETH',
  MATIC = 'MATIC',
  USDC = 'USDC',
  USDT = 'USDT'
}

export enum SocialMediaType {
  twitter = 'twitter',
  telegram = 'telegram',
  linkedIn = 'linkedin',
  discord = 'discord',
  reddit = 'reddit',
  youTube = 'youtube',
  coinMarketCap = 'coinmarketcap',
  coinGecko = 'coingecko'
}

export interface VideoLink {
  title?: string
  url: string
}

export interface InformationFormValues {
  id?: string

  profilePicture: IssuanceFile
  cardPicture: IssuanceFile

  shortDescription: string
  longDescription: string

  title: string
  issuerIdentificationNumber: string

  industry: OfferIndustry
  investmentType: OfferInvestmentStructure

  country: string

  tokenName: string
  tokenTicker: string
  tokenType: OfferTokenType
  tokenStandart: OfferTokenStandart
  tokenPrice: number

  network: OfferNetwork

  hardCap: string
  softCap: string

  allowOnlyAccredited: boolean

  minInvestment: string
  maxInvestment: string

  hasPresale: boolean
  presaleAlocated: string
  presaleMinInvestment: string
  presaleMaxInvestment: string

  email: string
  website: string
  whitepaper: string

  images: IssuanceFile[]
  videos: VideoLink[]
  additionalDocuments: AdditionalDocument[]

  members: TeamMember[]

  faq: FAQEntry[]

  terms: {
    investmentStructure: string
    dividentYield: string
    investmentPeriod: number
    grossIrr: string
    distributionFrequency: OfferDistributionFrequency
  }

  timeframe: {
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
  file: IssuanceFile
}

export interface FAQEntry {
  question: string
  answer: string
}

export interface TeamMember {
  photo: IssuanceFile
  name: string
  role: string
  about: string
}

export interface DateRange {
  start: Date
  end: Date
}