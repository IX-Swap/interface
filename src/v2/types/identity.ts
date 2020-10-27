import { DataroomFile, FileGuide } from './dataroomFile'
import { DeclarationValue } from 'v2/app/pages/identity/const/declarations'
import { Authorizable } from './authorizer'
import { PaginationArgs } from 'v2/services/api/types'
import {
  CorporateIdentityFormValues,
  IndividualIdentityFormValues
} from 'v2/app/pages/identity/components/types'
import User from 'v2/types/user'

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
  state?: string
  countryOfResidence?: string // for individual
  country: string // for corporate
}

export interface PersonalProfile {
  firstName: string
  middleName?: string
  lastName: string
  photo?: string
  dob: string
  gender: 'M' | 'F'
  nationality: string
  countryOfResidence: string
  maritalStatus: string
  contactNumber: string
  email?: string
}

export interface PersonalProfileWithAddress extends PersonalProfile {
  address: Omit<IdentityAddress, 'countryOfResidence'>
}

export interface ExtendedIdentityProfile extends PersonalProfile {
  user: User
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
  toArrangeCustody?: boolean
}

export interface CorporateFields {
  logo?: string
  email: string
  contactNumber: string
  companyLegalName: string
  registrationNumber: string
  countryOfFormation: string
  dateOfIncorporation: string
  companyAddress: IdentityAddress
  representatives: PersonalProfile[]
  directors: PersonalProfile[]
  beneficialOwners: PersonalProfile[]
  toArrangeCustody?: boolean
}

export interface Declaration {
  [key: string]: DeclarationValue
}

export interface BaseIdentity {
  _id: string
  status: 'Rejected' | 'Authorized' | 'Submitted' | undefined
  user: User
  createdAt: string
  updatedAt: string
  documents: DataroomFile[]
  declarations: Declaration[]
  walletAddress?: string
}

export interface DeclarationTemplate {
  key: string
  content: string
  value: DeclarationValue | null
  header?: string
  footer?: string | string[]
  answerable?: boolean
  lastLine?: boolean
  subLevel?: boolean
}

export type IndividualIdentity = BaseIdentity &
  PersonalProfileWithAddress &
  IdentityFinancials &
  Authorizable

export type CorporateIdentity = BaseIdentity & CorporateFields & Authorizable

export interface GetIndividualIdentityArgs {
  userId: string
}

export interface GetAllCorporateIdentities extends PaginationArgs {
  userId: string
}

export type CreateOrUpdateIndividualIdentityArgs = Omit<
  IndividualIdentityFormValues,
  'documents' | 'declarations'
> & {
  declarations: Declaration[]
  documents: string[]
  userId: string
}

export type CreateCorporateIdentityArgs = Omit<
  CorporateIdentityFormValues,
  'documents' | 'declarations'
> & {
  documents: string[]
  declarations: Declaration[]
  userId: string
}

export type UpdateCorporateIdentityArgs = Omit<
  CorporateIdentityFormValues,
  'documents' | 'declarations'
> & {
  documents: string[]
  declarations: Declaration[]
}
