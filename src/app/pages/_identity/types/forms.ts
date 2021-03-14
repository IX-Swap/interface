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
  logo?: string
  companyLegalName: string
  registrationNumber: string
  legalEntityStatus: string
  countryOfFormation: string
  companyAddress: Address
  mailingAddress: Address
  isMailingAddressSame: boolean
  representatives: RepresentativeFormValues[]
  otherLegalEntityStatus?: string
}

export interface InvestorDirectorsAndBeneficialOwnersFormValues {
  directors: DirectorFormValues[]
  beneficialOwners: BeneficialOwnerFormValues[]
}

export interface CorporateInvestorTaxDeclarationFormValues {
  taxResidencies: TaxResidencies
}

export interface CorporateInvestorDeclarationFormValues {
  assets: boolean
  trustee: boolean
  accreditedShareholders: boolean
  partnership: boolean
  accreditedBeneficiaries: boolean
  accreditedSettlors: boolean

  consent: boolean
  consequencesOfQualification: boolean
  rightToOptOut: boolean
}

export interface CorporateInvestorDocumentsFormValues {
  evidenceOfAccreditation: DataroomFile[]
  corporateDocuments: DataroomFile[]
  financialDocuments: DataroomFile[]
}

export interface RepresentativeFormValues {
  fullName: string
  designation: string
  email: string
  contactNumber: string
  documents: DataroomFile[]
}
export interface DirectorFormValues {
  fullName: string
  designation: string
  email: string
  contactNumber: string
  address: Address
  documents: {
    proofOfIdentity: DataroomFile[]
    proofOfAddress: DataroomFile[]
  }
}

export interface BeneficialOwnerFormValues {
  fullName: string
  percentageShareholding: number
  documents: {
    proofOfIdentity: DataroomFile[]
    proofOfAddress: DataroomFile[]
  }
}
export interface CorporateInvestorAgreementsFormValues {
  investor: boolean
  custody: boolean
  disclosure: boolean
}
