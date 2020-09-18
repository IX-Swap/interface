import { Asset } from './asset'
import { Document } from './document'
import { Maybe } from './util'

export interface DsoTeamMember {
  _id?: string
  name: string
  position: string
  about: string
  photo?: string // documentId
}

export interface DeploymentInfo {
  _id: string
  createdBy: string
  transactionHash: string
  token: string
  owner: string
  name: string
  symbol: string
  decimals: number
  policyBuilder: string
  storageEngine: string
  controller: string
  documentController: string
  createdAt: string
  updatedAt: string
  __v: number
}

// export interface PolicyBuilder {}

export interface BaseDigitalSecurityOffering {
  _id: string
  minimumInvestment: number | null
  status: string
  deleted: boolean
  createdBy: string
  issuerName: string
  launchDate: string
  corporate: string
  logo?: string
  capitalStructure: string
  pricePerUnit: number | null
  totalFundraisingAmount: number | null
  tokenName: string
  tokenSymbol: string
  investmentPeriod: number | null
  dividendYield: number | null
  grossIRR: number | null
  investmentStructure: string
  equityMultiple: string
  distributionFrequency: string
  interestRate: number | null
  leverage: string
  subscriptionDocument: string
  introduction: string
  businessModel: string
  useOfProceeds: string
  fundraisingMilestone: string
  team: DsoTeamMember[]
  createdAt: string
  asset: string
  deploymentInfo?: DeploymentInfo
  policyBuilder?: {}
  user: string
}

export interface DigitalSecurityOffering extends BaseDigitalSecurityOffering {
  documents: Maybe<Document[]>
  currency: Array<Partial<Asset>> | Asset[]
}

export interface DsoRequest extends BaseDigitalSecurityOffering {
  documents: string[]
  currency: string
}

export const inititialValues: DigitalSecurityOffering = {
  _id: '',
  minimumInvestment: null,
  documents: [],
  status: '',
  deleted: false,
  createdBy: '',
  issuerName: '',
  launchDate: '06/06/2020',
  corporate: '',
  logo: '',
  capitalStructure: '',
  currency: [{ _id: '' }],
  pricePerUnit: null,
  totalFundraisingAmount: null,
  tokenName: '',
  tokenSymbol: '',
  investmentPeriod: null,
  dividendYield: null,
  grossIRR: null,
  investmentStructure: '',
  equityMultiple: '',
  distributionFrequency: '',
  interestRate: null,
  leverage: '',
  subscriptionDocument: '',
  introduction: '',
  businessModel: '',
  useOfProceeds: '',
  fundraisingMilestone: '',
  team: [
    {
      name: '',
      position: '',
      about: 'About the member'
    }
  ],
  asset: '',
  createdAt: '',
  user: ''
}
