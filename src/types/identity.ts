import { DataroomFile } from './dataroomFile'
import { DeclarationValue } from 'app/pages/identity/const/declarations'
import { Authorizable } from './authorizer'
import { PaginationArgs } from 'services/api/types'
import {
  CorporateIdentityFormValues,
  IndividualIdentityFormValues
} from 'app/pages/identity/components/types'
import User from 'types/user'
import { AuthorizableStatus } from 'types/util'

export interface IdentityAddress {
  line1: string
  line2?: string
  city: string
  postalCode?: string
  state?: string
  countryOfResidence?: string // for individual
  country: string // for corporate
}

export interface TaxResidency {
  residentOfSingapore: boolean
  countryOfResidence: string
  taxIdentificationNumber: string
  taxIdAvailable: boolean
  reason: 'A' | 'B' | 'C'
  customReason: string
}

export type TaxResidencies = Array<Partial<TaxResidency>>

export interface TaxDeclaration {
  taxResidencies: TaxResidencies
}
export interface TaxDeclarationFormData {
  taxResidencies?: TaxResidencies
  singaporeOnly?: 'yes' | 'no'
  taxIdAvailable?: boolean
  taxId?: string
  reasonUnavailable?: 'A' | 'B' | 'C'
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

export type IndividualPersonalInformation = Omit<
  PersonalProfile,
  'countryOfResidence'
>

export interface PersonalProfileWithAddress extends PersonalProfile {
  address: Omit<IdentityAddress, 'countryOfResidence'>
}

export interface ExtendedIdentityProfile extends PersonalProfile {
  user: User
}

export interface Personnel {
  fullName: string
  designation: string
  email: string
  contactNumber: string
  documents: DataroomFile[]
  address: IdentityAddress
  percentageShareholding: number
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
  sourceOfFund?: FundSource[]
  fundMajority?: boolean
}

export interface CorporateFields {
  logo?: string
  email: string
  contactNumber: string
  companyLegalName: string
  registrationNumber: string
  countryOfFormation: string
  companyAddress: IdentityAddress
  representatives: Personnel[]
  directors: Personnel[]
  beneficialOwners: Personnel[]
  legalEntityStatus: string
  taxResidencies: TaxResidencies
  mailingAddress: IdentityAddress
  isMailingAddressSame: boolean
  type: 'investor' | 'issuer'
}

export interface Declaration {
  [key: string]: DeclarationValue
}

export interface AgreementsAndDisclosures {
  declarations: {
    agreements: {
      investor: boolean
      custody: boolean
      disclosures: boolean
    }
  }
}

export interface OptOutRequirements {
  digitalSecurities: boolean
  primaryOfferingServices: boolean
  digitalSecuritiesIssuance: boolean
  allServices: boolean
}

export interface OptInAgreements {
  optInAgreements: boolean
}

export interface IndividualInvestorStatus {
  financialAsset: boolean
  income: boolean
  jointlyHeldAccount: boolean
  personalAssets: boolean
}
export interface CorporateInvestorStatus {
  assets: boolean
  trustee: boolean
  accreditedShareholders: boolean
  partnership: boolean
  accreditedBeneficiaries: boolean
  accreditedSettlors: boolean
}
export interface IdentityDeclarations {
  tax: { fatca: boolean }
  investorsStatus: IndividualInvestorStatus &
    CorporateInvestorStatus &
    OptInAgreements &
    OptOutRequirements
  agreements: {
    investor: boolean
    custody: boolean
    disclosure: boolean
  }
}

export interface BaseIdentity {
  _id: string
  status: AuthorizableStatus
  user: User
  createdAt: string
  updatedAt: string
  documents: DataroomFile[]
  declarations: IdentityDeclarations
  step?: number
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
  Authorizable &
  TaxDeclaration

export type CorporateIdentity = BaseIdentity &
  CorporateFields &
  Authorizable &
  TaxDeclaration

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
