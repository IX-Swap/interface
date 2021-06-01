import {
  CorporateFields,
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import { Asset } from './asset'
import { DataroomFile } from './dataroomFile'
import { DistributionFrequency } from 'types/distributionFrequency'
import { DigitalSecurityOffering, DsoTeamMember } from './dso'
import { Market } from 'types/market'
import { Network } from 'types/networks'
import User from 'types/user'

export interface Listing {
  _id: string
  createdBy: string
  user: User
  dso: DigitalSecurityOffering
  corporate: CorporateFields
  logo: DataroomFile
  banner: DataroomFile
  tokenName: string
  tokenSymbol: string
  decimalPlaces: string
  launchDate: Date
  completionDate: Date
  network: Network
  minimumTradeUnits: number
  maximumTradeUnits: number
  deleted: boolean
  asset: Asset
  description: string
  companyName: string
  explorer: string
  createdAt: string
  updatedAt: string
  status: 'Draft' | 'Submitted' | 'Approved'
  availableMarket: string
  raisedAmount: number
  capitalStructure: string
  investmentPeriod: number
  dividendYield: number
  interestRate: number
  grossIRR: number
  investmentStructure: string
  distributionFrequency: keyof typeof DistributionFrequency
  leverage: number
  equityMultiple: number
  documents: DataroomFile[]
  introduction: string
  exchange: {
    markets: Market[]
    listing: Listing
  }
  markets: Asset[]
  team: DsoTeamMember[]
  promoted: boolean
  disabled: boolean
  marketType: string
}

export interface ListingView {
  _id: string
  createdBy: string
  user: string
  dso?: DigitalSecurityOffering
  corporate: CorporateFields
  logo: string
  banner: string
  tokenName: string
  tokenSymbol: string
  decimalPlaces: string
  launchDate: string
  completionDate: string
  network: Network
  minimumTradeUnits: number
  maximumTradeUnits: number
  deleted: boolean
  asset?: Asset
  description?: string
  companyName?: string
  explorer?: string
  createdAt: string
  updatedAt: string
  status: 'Draft' | 'Submitted' | 'Approved'
  availableMarket?: string
  raisedAmount: number
  capitalStructure: string
  investmentPeriod: number
  dividendYield: number
  interestRate: number
  grossIRR: number
  investmentStructure: string
  distributionFrequency: string
  leverage: number
  equityMultiple: number
  documents: DataroomFile[]
  introduction?: string
  exchange: {
    markets: ExchangeMarket[]
  }
  markets: Array<{
    _id: string
    currency: string
  }>
  authorizations: []
  authorizationDocuments: Document[]
  team: DsoTeamMember[]
  promoted: boolean
  disabled: boolean
  marketType: string
  identity: {
    corporates: CorporateIdentity[]
    individual: IndividualIdentity
  }
}

export interface ExchangeMarket {
  _id: string
  deleted: boolean
  createdBy: string
  name: string
  listing: string
  quote: string
}
