import { DataroomFile } from './dataroomFile'
import { DeclarationValue } from 'app/pages/identity/const/declarations'
import { Authorizable } from './authorizer'
import { PaginationArgs } from 'services/api/types'
import {
  CorporateIdentityFormValues,
  IndividualIdentityFormValues
} from 'app/pages/identity/components/types'
import User from 'types/user'

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
  nationality: string
  countryOfResidence: string
  contactNumber: string
  email?: string
}

export interface PersonalProfileWithAddress extends PersonalProfile {
  address: Omit<IdentityAddress, 'countryOfResidence'>
}

export interface ExtendedIdentityProfile extends PersonalProfile {
  user: User
}

export interface FundSource {
  name: string
  checked: boolean
  value: number
}

export interface IdentityFinancials {
  annualIncome: string
  employer: string
  employmentStatus: string
  occupation: string
  sourceOfWealth: string
  fundSource?: FundSource[]
}

export interface CorporateFields {
  logo?: string
  email: string
  contactNumber: string
  companyLegalName: string
  registrationNumber: string
  countryOfFormation: string
  companyAddress: IdentityAddress
  representatives: PersonalProfile[]
  directors: PersonalProfile[]
  beneficialOwners: PersonalProfile[]
}

export interface Declaration {
  [key: string]: DeclarationValue
}

export interface AgreementsAndDisclosures {
  investorAgreement: boolean
  custodyAgreement: boolean
  disclosures: boolean
}

export interface BaseIdentity {
  _id: string
  status: 'Rejected' | 'Authorized' | 'Submitted' | undefined
  user: User
  createdAt: string
  updatedAt: string
  documents: DataroomFile[]
  declarations: Declaration[]
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
