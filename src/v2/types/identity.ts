import { DataroomFile, FileGuide } from './dataroomFile'
import { DeclarationValue } from 'v2/app/pages/identity/const/declarations'
import { Authorizable } from './authorizer'
import { PaginationArgs } from 'v2/services/api/types'
import {
  CorporateIdentityFormValues,
  IndividualIdentityFormValues
} from 'v2/app/pages/identity/components/types'

export interface IdentityState {
  dataroom: Array<DataroomFile | FileGuide>
  corporateDataroom: Array<DataroomFile | FileGuide>
  identity: IndividualIdentity | {}
  corporate: CorporateIdentity | {}
  status: string
  shouldCreateNew: boolean
  editMode: boolean
  error: {
    save: string | null
    get: string | null
  }
  type?: 'individual' | 'corporate'
}

export interface IdentityAddress {
  line1: string
  line2?: string
  city: string
  postalCode?: string
  state: string
  countryOfResidence?: string // for individual
  country?: string // for corporate
}

export interface IdentityProfile {
  firstName: string
  middleName: string
  lastName: string
  photo: string
  dob: string
  gender: 'M' | 'F' | undefined
  nationality: string
  countryOfResidence: string
  maritalStatus: 'Single' | 'Married' | undefined
  contactNumber: string
  address: Omit<IdentityAddress, 'countryOfResidence'>
  email?: string
}

export interface IdentityFinancials {
  annualIncome: string
  bankAccountName: string
  bankAccountNumber: string
  bankName: string
  employer: string
  employmentStatus: string
  houseHoldIncome: string
  industryOfEmployment: string
  occupation: string
  // politicallyExposed: boolean
  sourceOfWealth: string
  toArrangeCustody: boolean
}

export interface CorporateFields {
  logo: string
  email: string
  contactNumber: string
  companyLegalName: string
  registrationNumber: string
  countryOfFormation: string
  dateOfIncorporation: string
  companyAddress: IdentityAddress
  representatives: IdentityProfile[]
  directors: IdentityProfile[]
  beneficialOwners: IdentityProfile[]
  toArrangeCustody: boolean
}

export interface Declaration {
  [key: string]: DeclarationValue | undefined
}

export interface BaseIdentity {
  _id: string
  status: 'Rejected' | 'Authorized' | 'Submitted' | undefined
  user: string
  createdAt: string
  updatedAt: string
  documents?: DataroomFile[]
  declarations: Declaration[]
  walletAddress: string
}

export interface DeclarationTemplate {
  key: string
  content: string
  value?: boolean | null
  header?: string
  footer?: string | string[]
  answerable?: boolean
  lastLine?: boolean
  subLevel?: boolean
}

export type IndividualIdentity = BaseIdentity &
  IdentityProfile &
  IdentityFinancials &
  Authorizable

export type CorporateIdentity = BaseIdentity & CorporateFields & Authorizable

export interface GetIndividualIdentityArgs {
  userId: string
}

export interface GetAllCorporateIdentities extends PaginationArgs {
  userId: string
}

export type CreateOrUpdateIndividualIdentityArgs = (
  | Omit<IndividualIdentityFormValues, 'documents'>
  | Omit<CorporateIdentityFormValues, 'documents'>
) & {
  documents?: string[]
  userId: string
}

export type CreateCorporateIdentityArgs = Omit<
  CorporateIdentityFormValues,
  'documents'
> & {
  documents?: string[]
  userId: string
}

export type UpdateCorporateIdentityArgs = Omit<
  CorporateIdentityFormValues,
  'documents'
> & {
  documents?: string[]
}
