import { FundSource, TaxResidencies } from 'types/identity'

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
}

export interface IndividualTaxDeclarationFormValues {
  singaporeOnly: 'yes' | 'no'
  declarations: {
    fatca: 'yes' | 'no'
  }
  taxResidencies: TaxResidencies
}
