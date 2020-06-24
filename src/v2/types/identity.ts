import User from './user'

export interface DocumentGuide {
  title: string
  label: string
  type: string
};

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
};

export interface IdentityAddress {
  line1: string
  line2: string
  city: string
  postalCode?: string
  state: string
  countryOfResidence?: string // for individual
  country?: string // for corporate
};

export interface IdentityProfile {
  firstName: string
  middleName: string
  lastName: string
  dob: string
  gender: 'M' | 'F'
  nationality: string
  countryOfResidence: string
  maritalStatus: 'Single' | 'Married'
  contactNumber: string
  address: IdentityAddress
  email?: string
};

export interface IndentityFinancials {
  annualIncome: string
  bankAccountName: string
  bankAccountNumber: string
  bankName: string
  employer: string
  employmentStatus: string
  houseHoldIncome: string
  industryOfEmployment: string
  occupation: string
  politicallyExposed: boolean
  sourceOfWealth: string
  toArrangeCustody: boolean
};

export interface Document {
  _id: string
  user: string
  title: string
  type: string
  originalFileName: string
  checksum: string
  url: string
  createdAt: string
};

export interface CorporateFields {
  companyLegalName: string
  registrationNumber: string
  countryOfFormation: string
  dateOfIncorporation: string
  companyAddress: IdentityAddress
  representatives: IdentityProfile[]
  directors: IdentityProfile[]
  beneficialOwners: IdentityProfile[]
};

export interface BaseIdentity {
  _id: string
  status: 'Rejected' | 'Authorized' | 'Unauthorized'
  user: User
  createdAt: string
  updatedAt: string
  documents?: Document[]
  declarations: Array<{ [key: string]: 'Yes' | 'No' | null }>
  walletAddress: string
}

export interface DeclarationTemplate {
  key: string
  content: string
  value: boolean | null
  answerable?: boolean
  lastLine?: boolean
  sublevel?: boolean
}

export type IndividualIdentity = BaseIdentity & IdentityProfile & Partial<IndentityFinancials>

export type CorporateIdentity = BaseIdentity & CorporateFields
