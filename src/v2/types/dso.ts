import { Asset } from './asset'
import { DataroomFile, DataroomFileWithGuide } from './dataroomFile'
import { Maybe } from './util'
import { CorporateIdentity } from './identity'
import { AuthorizableWithIdentity } from './authorizer'

export interface DsoTeamMember {
  _id?: string
  name: string
  position: string
  about: string
  photo?: string
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
  corporate: CorporateIdentity
  logo: string
  capitalStructure: string
  pricePerUnit: number
  totalFundraisingAmount: number | null
  tokenName: string
  tokenSymbol: string
  investmentPeriod: number | null
  dividendYield: number | null
  grossIRR: number | null
  investmentStructure: string
  equityMultiple: number | null
  distributionFrequency: string
  interestRate: number | null
  leverage: number | null
  subscriptionDocument: DataroomFile
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
  documents: Maybe<DataroomFile[]>
  currency: Asset
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
  | 'corporate'
  | 'updatedAt'
  | 'identity'
  | 'authorizations'
  | 'authorization'
  | 'authorizationDocuments'
> & {
  status?: string
  currency: string
  corporate: string
  documents: DataroomFileWithGuide[]
  team: DsoTeamMember[]
}

export type DSORequestArgs = Omit<
  DSOFormValues,
  'documents' | 'subscriptionDocument'
> & {
  subscriptionDocument: string
  documents: string[]
}
