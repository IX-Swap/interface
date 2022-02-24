import { DataroomFile } from 'types/dataroomFile'
import { Network } from 'types/networks'
import { DistributionFrequency } from 'types/distributionFrequency'
import { DigitalSecurityOffering, DsoTeamMember } from 'types/dso'
import User from 'types/user'
import {
  CorporateFields,
  CorporateIdentity
} from 'app/pages/identity/types/forms'
import { Asset } from 'types/asset'
import { Market } from 'types/market'

export interface ListingFormValues {
  logo: string
  corporate: string
  network: string
  tokenName: string
  tokenSymbol: string
  decimals?: number | null
  minimumTradeUnits: number | null
  maximumTradeUnits: number | null
  raisedAmount: number | null
  capitalStructure: string
  investmentPeriod: number | null
  dividendYield?: number | null
  interestRate?: number | null
  grossIRR?: number | null
  investmentStructure: string
  distributionFrequency?: string
  leverage?: number | null
  equityMultiple?: number | null
  currency: string
  team: DsoTeamMember[]
  incomeStatement: DataroomFile[]
  cashFlow: DataroomFile[]
  balanceSheet: DataroomFile[]
  launchDate: Date | string
  completionDate: Date | string
  introduction: string
  marketType: string
  asset: string
  dso: string
}

export interface Currency {
  _id: string
  currency: string
}

export interface Listing {
  _id: string
  createdBy: string
  user: User
  dso: DigitalSecurityOffering
  corporate: CorporateIdentity
  logo: string
  banner: DataroomFile
  tokenName: string
  tokenSymbol: string
  decimals: number
  launchDate: Date
  completionDate: Date
  network: Network
  minimumTradeUnits: number
  maximumTradeUnits: number
  deleted: boolean
  asset: string
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
  exchange: [
    {
      markets: Market[]
      listing: Listing
    }
  ]
  markets: Currency[]
  team: DsoTeamMember[]
  promoted: boolean
  disabled: boolean
}

export interface ListingFormValuesForSubmit {
  _id: string
  createdBy: string
  user: User
  dso: string
  corporate: CorporateFields
  logo: DataroomFile
  banner: DataroomFile
  tokenName: string
  tokenSymbol: string
  decimals: string
  launchDate: Date
  completionDate: Date
  network: Network
  minimumTradeUnits: number
  maximumTradeUnits: number
  deleted: boolean
  asset: string
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

export type ListingRequestArgs = Partial<
  Omit<ListingFormValues, 'incomeStatement' | 'cashFLow' | 'balanceSheet'> & {
    documents: string[]
  }
>
