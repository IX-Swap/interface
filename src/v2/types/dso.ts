import { Asset } from './asset'
import { DataroomFile, FormArray } from './dataroomFile'
import { Maybe } from './util'
import { CorporateIdentity } from './identity'
import { AuthorizableWithIdentity } from './authorizer'

export interface DsoTeamMember {
  _id?: string
  name: string
  position: string
  about: string
  photo: string
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
  createdAt: string
  asset: string
  deploymentInfo?: DeploymentInfo
  policyBuilder?: {}
  user: string
}

export interface DigitalSecurityOffering extends BaseDigitalSecurityOffering {
  documents: Maybe<DataroomFile[]>
  currency: Asset
  network: string
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
  | 'subscriptionDocument'
> & {
  subscriptionDocument?: DataroomFile
  status?: string
  currency: string
  corporate: string
  documents: FormArray<DataroomFile>
  team: DsoTeamMember[]
}

export type DSORequestArgs = Omit<
  DSOFormValues,
  'documents' | 'subscriptionDocument'
> & {
  subscriptionDocument?: string
  documents: string[]
}
