import { FundSource, TaxResidencies } from 'types/identity'
import { DataroomFile, FormArray } from '../../../../types/dataroomFile'

export interface IndividualAddress {
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
  address: IndividualAddress
}

export interface IndividualFinancialInfoFormValues {
  sourceOfFund: FundSource[]
  occupation: string
  employer: string
  employmentStatus: string
  sourceOfWealth: string
  annualIncome: string
  fundMajority: 'yes' | 'no'
}

export interface IndividualTaxDeclarationFormValues {
  singaporeOnly: 'yes' | 'no'
  declarations: {
    fatca: 'yes' | 'no'
  }
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
  documents: {
    evidenceOfAccreditation: DataroomFile[]
    proofOfIdentity: DataroomFile[]
    proofOfAddress: DataroomFile[]
  }
}
