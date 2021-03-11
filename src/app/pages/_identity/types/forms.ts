import { FundSource, TaxResidencies } from 'types/identity'
import { DataroomFile } from '../../../../types/dataroomFile'

export interface Address {
  line1: string
  line2?: string
  city: string
  postalCode?: string
  state?: string
  country: string
}

export interface IndividualPersonalInfoFormValues {
  photo?: string
  firstName: string
  middleName?: string
  lastName: string
  dob: string
  nationality: string
  email: string
  contactNumber: string
  address: Address
}

export interface IndividualFinancialInfoFormValues {
  sourceOfFund: FundSource[]
  occupation: string
  employer: string
  employmentStatus: string
  annualIncome: string
  fundMajority: 'yes' | 'no'
}

export interface IndividualTaxDeclarationFormValues {
  singaporeOnly: 'yes' | 'no'
  fatca: 'yes' | 'no'
  taxResidencies: TaxResidencies
}

export interface IndividualInvestorDeclarationFormValues {
  consent: boolean
  consequencesOfQualification: boolean
  financialAsset: boolean
  income: boolean
  jointlyHeldAccount: boolean
  personalAssets: boolean
  rightToOptOut: boolean
}

export interface IndividualDocumentsFormValues {
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
  companyLegalName: string
  registrationNumber: string
  legalEntityStatus: string
  countryOfFormation: string
  address: Address
  mailingAddress: Address
  mailingAddressSameAsRegistered: boolean
  representatives: any[]
}

export interface InvestorDirectorsAndBeneficialOwnersFormValues {
  directors: any[]
  beneficialOwners: any[]
}

export interface CorporateInvestorTaxDeclarationFormValues {
  taxResidencies: TaxResidencies
}

export interface CorporateInvestorDeclarationFormValues {
  consent: boolean
  consequencesOfQualification: boolean
  financialAsset: boolean
  income: boolean
  jointlyHeldAccount: boolean
  personalAssets: boolean
  rightToOptOut: boolean
}

export interface CorporateInvestorDocumentsFormValues {
  documents: {
    evidenceOfAccreditation: DataroomFile[]
    corporateDocuments: DataroomFile[]
    financialDocuments: DataroomFile[]
  }
}
