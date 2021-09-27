import { Asset } from './asset'
import { DataroomFile, FormArray } from './dataroomFile'
import { AuthorizableWithIdentity } from './authorizer'
import { Network } from './networks'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'

export interface DsoTeamMember {
  _id?: string
  name: string
  position: string
  about: string
  photo: string
}

export interface DsoFAQItem {
  _id?: string
  question: string
  answer: string
}

export interface DsoVideo {
  _id?: string
  title: string
  link: string
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

export interface BaseDigitalSecurityOffering extends AuthorizableWithIdentity {
  _id: string
  minimumInvestment: number | null
  deleted: boolean
  createdBy: string
  issuerName: string
  launchDate: string
  completionDate: string
  corporate: CorporateIdentity
  logo: string
  capitalStructure: string
  pricePerUnit: number
  totalFundraisingAmount: number | null
  tokenName: string
  tokenSymbol: string
  investmentPeriod?: number
  dividendYield?: number
  grossIRR?: number
  investmentStructure?: string
  equityMultiple?: number
  distributionFrequency?: string
  interestRate?: number
  leverage?: number
  subscriptionDocument?: DataroomFile
  introduction: string
  businessModel: string
  useOfProceeds: string
  fundraisingMilestone: string
  team: DsoTeamMember[]
  faqs: DsoFAQItem[]
  videos: DsoVideo[]
  createdAt: string
  asset: string
  deploymentInfo?: DeploymentInfo
  policyBuilder?: {}
  user: string
  decimalPlaces?: number
  dealStatus?: string
}

export interface DSOInsight {
  activityCount: number
  approvedcommitmentCount: number
  collectedOn: string
  commitmentCount: number
  commitmentTotal: number
  investorCount: number
  raisedMax: number
  raisedMin?: number
  raisedTotal: number
}

export interface DigitalSecurityOffering extends BaseDigitalSecurityOffering {
  promoted: boolean
  disabled: boolean
  isStarred: boolean
  documents: DataroomFile[]
  currency: Asset
  insight: DSOInsight
  network?: Network
}

export type DeploymentInfoFormValues = Omit<
  DeploymentInfo,
  '_id' | 'createdBy' | 'createdAt' | 'updatedAt' | '__v'
>

export type DSOFormValues = Omit<
  DigitalSecurityOffering,
  | '_id'
  | 'deleted'
  | 'createdBy'
  | 'createdAt'
  | 'user'
  | 'deploymentInfo'
  | 'documents'
  | 'asset'
  | 'status'
  | 'team'
  | 'currency'
  | 'network'
  | 'corporate'
  | 'updatedAt'
  | 'identity'
  | 'insight'
  | 'isStarred'
  | 'promoted'
  | 'authorizations'
  | 'authorization'
  | 'authorizationDocuments'
  | 'subscriptionDocument'
  | 'insight'
  | 'disabled'
  | 'decimalPlaces'
> & {
  subscriptionDocument?: DataroomFile
  status?: string
  currency: string
  network?: string
  corporate: string
  documents: FormArray<DataroomFile>
  team: DsoTeamMember[]
  faqs: DsoFAQItem[]
  videos: DsoVideo[]
}

export type DSORequestArgs = Partial<
  Omit<DSOFormValues, 'documents' | 'subscriptionDocument'> & {
    subscriptionDocument?: string
    documents: string[]
  }
>

export type DSOLaunchStatus = 'live' | 'completed' | 'upcoming'

export type DSOTableColumn =
  | 'favorite'
  | 'completionDate'
  | 'tokenName'
  | 'insight'
  | 'pricePerUnit'
  | 'totalFundraisingAmount'
  | 'minimumInvestment'
  | 'distributionFrequency'
  | 'interestRate'

export interface DSOActivity {
  _id: string
  invariant: string
  createdAt: string
  user: string
  identity: {
    individual: IndividualIdentity
    corporates: CorporateIdentity[]
  }
}

export interface CloseDealArgs {
  otp: string
}
