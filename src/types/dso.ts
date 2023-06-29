import { Asset } from './asset'
import { DataroomFile, FormArray } from './dataroomFile'
import { AuthorizableWithIdentity } from './authorizer'
import { Network } from './networks'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import { ObjectSchema, Shape } from 'yup'
import { CreateModeRedirect } from 'app/components/FormStepper/FormStepper'
import * as H from 'history'

export interface DsoTeamMember {
  _id?: string
  name: string
  position: string
  about: string
  photo: string
}

export interface DsoFAQItem {
  _id?: string
  question?: string
  answer?: string
}

export interface DsoVideo {
  _id?: string
  title?: string
  link?: string
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

export const capitalStructureWithFunds = [
  'Fund - Feeder/Sub-Fund',
  'Fund',
  'Fund - Standalone'
]

export interface BaseDigitalSecurityOffering extends AuthorizableWithIdentity {
  _id: string
  minimumInvestment: number | null
  deleted: boolean
  createdBy: string
  issuerName: string
  launchDate: string
  releaseDate: string
  classification: string
  productType: string
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
  decimals?: number
  decimalPlaces?: number
  uniqueIdentifierCode?: string | null
  dealStatus?: string
  marketType?: string
  dso?: string
  productSpecification?: string
  step: number
  listingType?: string
  maximumTradeUnits?: number
  minimumTradeUnits?: number
  raisedAmount?: number
  expectedReturn?: number
  coverImg?: string
}

export interface NewBaseDigitalSecurityOffering
  extends AuthorizableWithIdentity {
  _id: string
  issuerName: string
  capitalStructure: string
  tokenName: string
  tokenSymbol: string
  uniqueIdentifierCode?: string | null
  currency: string
  network: string
  logo: string
  minimumInvestment: number | null
  launchDate: string
  releaseDate: string
  classification: string
  productType: string
  completionDate: string
  pricePerUnit: number
  totalFundraisingAmount: number | null
  corporate: CorporateIdentity | string
  investmentPeriod?: number
  dividendYield?: number
  grossIRR?: number
  investmentStructure?: string
  equityMultiple?: number
  distributionFrequency?: string
  interestRate?: number
  leverage?: number
  productSpecification?: string
  step?: number
  decimalPlaces: number
  expectedReturn?: number
  coverImg?: string
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
  investable: boolean
  expectedReturn: number
  promoted: boolean
  disabled: boolean
  isStarred: boolean
  documents: DataroomFile[]
  currency: Asset
  insight: DSOInsight
  network?: Network
}

export interface NewDigitalSecurityOffering
  extends BaseDigitalSecurityOffering {
  promoted: boolean
  disabled: boolean
  isStarred: boolean
  documents: DataroomFile[]
  currency: Asset
  insight: DSOInsight
  network?: Network
}

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
  | 'insight'
  | 'disabled'
> & {
  subscriptionDocument?: DataroomFile
  status?: string
  currency: string
  network?: string
  corporate: any
  documents: FormArray<DataroomFile>
  team: DsoTeamMember[]
  faqs: DsoFAQItem[]
  videos: DsoVideo[]
  uidCode?: string
  step?: number
}

export type DSOBaseFormValues = Omit<
  NewBaseDigitalSecurityOffering,
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
  | 'corp'
  | 'useOfProceeds'
  | 'introduction'
  | 'businessModel'
  | 'fundraisingMilestone'
>

export type DSORequestArgsStep1 = Partial<
  Omit<
    DSOBaseFormValues,
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
    | 'corp'
  >
>

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
  | 'expectedReturn'

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

export interface DepositAddress {
  account_id: number
  wallet_name: string
  asset_ticker: string
  deposit_address: string
  hd_path: string
  depositQRCodeUrl: string
}

export interface DSOFormActionsProps {
  dso: DigitalSecurityOffering | undefined
  schema: ObjectSchema<Shape<object | undefined, DSOFormValues>, object>
}
export interface RedirectArgs {
  createModeRedirect: CreateModeRedirect
  data?: any
  dsoId: string
  issuerId: string
  history: H.History
}
export interface RedirectOnSaveArgs {
  createModeRedirect: CreateModeRedirect
  data: any
  nextLocation: H.Location<unknown> | undefined
  setIsRedirecting: any
}

export interface RedirectSaveArgs {
  createModeRedirect: CreateModeRedirect
  data?: any
  nextLocation: H.Location<unknown> | undefined
  setIsRedirecting: any
  dsoId: string
  issuerId: string
  history: H.History
}
