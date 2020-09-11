import User from './user'
import { Document, DocumentGuide } from './document'
import { DeclarationValue } from 'v2/app/pages/identity/const/declarations'

export interface IdentityState {
  dataroom: Array<Document | DocumentGuide>
  corporateDataroom: Array<Document | DocumentGuide>
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
  line2: string
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
  companyLegalName: string
  registrationNumber: string
  countryOfFormation: string
  dateOfIncorporation: string
  companyAddress: IdentityAddress
  representatives: IdentityProfile[]
  directors: IdentityProfile[]
  beneficialOwners: IdentityProfile[]
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
  documents?: Document[]
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
  IdentityFinancials

export type CorporateIdentity = BaseIdentity & CorporateFields
