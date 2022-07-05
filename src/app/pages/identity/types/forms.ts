import { DataroomFile, FormArray, FormArrayElement } from 'types/dataroomFile'
import User from 'types/user'
import {
  CorporateDeclarations,
  DeclarationValue,
  IndividualDeclarations
} from 'app/pages/identity/const/declarations'
import { AuthorizableStatus, Maybe } from 'types/util'
import { Authorizable } from 'types/authorizer'
import Cynopsis from 'types/cynopsis'

export interface Address {
  line1: string
  line2?: string
  city: string
  postalCode?: string
  state?: string
  country: string
  countryOfResidence?: string // for individual
}

export interface IndividualPersonalInfoFormValues {
  photo?: string
  firstName: string
  middleName?: string
  lastName: string
  dob?: string
  nationality: string
  email?: string
  contactNumber: string
  address: Address
  gender: string
  nric?: string
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
  uinfin?: string
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
  gender: string
  nric?: string
}

export type IndividualPersonalInformation = Omit<
  PersonalProfile,
  'countryOfResidence'
>

export interface PersonalProfileWithAddress extends PersonalProfile {
  address: Omit<Address, 'countryOfResidence'>
}

export interface ExtendedIdentityProfile extends PersonalProfile {
  user: User
  cynopsis?: Cynopsis
}

export interface Personnel {
  fullName: string
  designation: string
  email: string
  contactNumber: string
  documents: DataroomFile[]
  address: Address
  percentageShareholding: number
  legalEntityStatus: string
  countryOfFormation: string
}

export interface IndividualFinancialInfoFormValues {
  sourceOfFund: string | FundSource[]
  occupation: string
  employer: string
  employmentStatus: string
}

export interface IndividualTaxDeclarationFormValues {
  singaporeOnly: 'yes' | 'no'
  fatca: 'yes' | 'no'
  taxResidencies: TaxResidencies
  uinfin?: string
  usTin?: string
}

export interface FinancialAndTaxDeclarationFormValues
  extends IndividualFinancialInfoFormValues,
    IndividualTaxDeclarationFormValues {}

export interface IndividualInvestorDeclarationFormValues
  extends IdentityDocumentsFormValues,
    IndividualInvestorStatus,
    OptOutRequirements,
    OptInAgreements {}

export interface IdentityDocumentsFormValues {
  evidenceOfAccreditation: DataroomFile[]
  proofOfIdentity: DataroomFile[]
  proofOfAddress: DataroomFile[]
}

export interface IndividualAgreementsFormValues {
  investor: boolean
  custody: boolean
  disclosure: boolean
}

export interface InvestorCorporateInfoFormValues {
  logo?: DataroomFile | string
  companyLegalName: string
  registrationNumber: string
  legalEntityStatus: string
  countryOfFormation: string
  companyAddress: Address
  mailingAddress?: Address
  isMailingAddressSame: boolean
  representatives: RepresentativeFormValues[]
  otherLegalEntityStatus?: string
  numberOfBusinessOwners: string
  businessActivity: string
  sourceOfFund: string
}

export interface InvestorDirectorsAndBeneficialOwnersFormValues {
  directors: DirectorFormValues[]
  beneficialOwners: BeneficialOwnerFormValues[]
}

export interface CorporateInvestorTaxDeclarationFormValues {
  taxResidencies: TaxResidencies
}

export interface CorporateInvestorDeclarationFormValues
  extends CorporateInvestorStatus,
    OptInAgreements,
    OptOutRequirements {
  isInstitutionalInvestor: boolean
}

export interface CorporateInvestorDocumentsFormValues {
  evidenceOfAccreditation: Array<FormArrayElement<DataroomFile>>
  corporateDocuments: Array<FormArrayElement<DataroomFile>>
  financialDocuments: Array<FormArrayElement<DataroomFile>>
  institutionalInvestorDocuments: Array<FormArrayElement<DataroomFile>>
}
export interface DocumentFieldArrayItemValue {
  value: DataroomFile
}
export interface RepresentativeFormValues {
  fullName: string
  designation: string
  email: string
  contactNumber: string
  documents: DocumentFieldArrayItemValue[]
}
export interface DirectorFormValues {
  fullName: string
  designation: string
  email: string
  contactNumber: string
  address: Address
  legalEntityStatus: string
  countryOfFormation: string
  proofOfIdentity?: DocumentFieldArrayItemValue[]
  proofOfAddress?: DocumentFieldArrayItemValue[]
}

export interface BeneficialOwnerFormValues {
  fullName: string
  percentageShareholding: number
  proofOfIdentity?: DocumentFieldArrayItemValue[]
  proofOfAddress?: DocumentFieldArrayItemValue[]
}
export interface CorporateInvestorAgreementsFormValues {
  investor: boolean
  custody: boolean
  disclosure: boolean
}

export interface IssuerDetailsFormValues {
  fullName: string
  companyName: string
  companyRegistrationNumber: string
  contactNumber?: string
  email: string
  industry: string
  fundRaisingAmount: number
  detail: string
}

export interface IssuerDocumentsFormValues {
  companyRelated: DataroomFile[]
  issuanceRelated: DataroomFile[]
  financial: DataroomFile[]
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
  sourceOfFund?: string | FundSource[]
}

export interface CorporateFields {
  logo?: string
  email: string
  cynopsis?: Cynopsis
  contactNumber: string
  companyLegalName: string
  registrationNumber: string
  countryOfFormation: string
  companyAddress: Address
  representatives: Personnel[]
  directors: Personnel[]
  beneficialOwners: Personnel[]
  legalEntityStatus: string
  taxResidencies: TaxResidencies
  mailingAddress: Address
  isMailingAddressSame: boolean
  numberOfBusinessOwners: string
  businessActivity: string
  sourceOfFund: string
  isInstitutionalInvestor: boolean
  type:
    | 'investor'
    | 'issuer'
    | 'Fund Manager'
    | 'Fund Administrator'
    | 'Portfolio Manager'
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
  digitalSecurities?: boolean
  primaryOfferingServices?: boolean
  digitalSecuritiesIssuance?: boolean
  allServices?: boolean
}

export interface OptInAgreements {
  optInAgreements?: boolean
  optInAgreementsSafeguards?: boolean
  optInAgreementsOptOut?: boolean
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
  tax: { fatca: boolean; usTin?: string }
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
  createdBy: string
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

export interface Noa {
  noa_basic: {
    assessable_income?: string
    noa_type?: string
    year_of_assessment?: string
  }
}

export type IndividualIdentity = BaseIdentity &
  PersonalProfileWithAddress &
  IdentityFinancials &
  Authorizable &
  TaxDeclaration &
  Noa

export type CorporateIdentity = BaseIdentity &
  CorporateFields &
  Authorizable &
  TaxDeclaration

export interface GetIndividualIdentityArgs {
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

export type IndividualIdentityFormValues = PersonalProfileWithAddress &
  IdentityFinancials &
  TaxDeclarationFormData &
  Omit<
    BaseIdentity,
    | '_id'
    | 'status'
    | 'user'
    | 'createdAt'
    | 'updatedAt'
    | 'documents'
    | 'declarations'
  > & {
    documents: FormArray<Maybe<DataroomFile>>
    declarations: IndividualDeclarations
    investorAgreement: boolean
    custodyAgreement: boolean
    disclosures: boolean
  }

export type CreateOrUpdateIndividualIdentityArgs = Omit<
  IndividualIdentityFormValues,
  'documents' | 'declarations'
> & {
  declarations: Declaration[]
  documents: string[]
  userId: string
}

export type CorporateIdentityFormValues = CorporateFields & {
  documents: FormArray<Maybe<DataroomFile>>
  declarations: CorporateDeclarations
}
