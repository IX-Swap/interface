import { CorporateFields } from 'app/pages/identity/types/forms'
import { Asset } from './asset'
import { DataroomFile } from './dataroomFile'
import { DistributionFrequency } from './distributionFrequency'
import { DigitalSecurityOffering, DsoTeamMember } from './dso'
import { Market } from './market'
import { Network } from './networks'
import User from './user'

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
}
