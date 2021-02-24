import { getFundSource, getFundSourceDefaults } from 'app/pages/identity/utils'
import {
  IndividualFinancialInfoFormValues,
  IndividualPersonalInfoFormValues,
  IndividualTaxDeclarationFormValues
} from 'app/pages/_identity/types/forms'
import { IndividualIdentity } from 'types/identity'

export const getPersonalInfoFormValues = (
  data: IndividualIdentity
): IndividualPersonalInfoFormValues => {
  return {
    photo: data?.photo,
    firstName: data?.firstName,
    middleName: data?.middleName,
    lastName: data?.lastName,
    dob: data?.dob,
    email: data?.email ?? '',
    contactNumber: data?.contactNumber,
    nationality: data?.nationality,
    address: {
      line1: data?.address?.line1,
      line2: data?.address?.line2,
      state: data?.address?.state,
      postalCode: data?.address?.postalCode,
      country: data?.address?.country,
      city: data?.address?.city
    }
  }
}

export const getFinancialInfoFormValues = (
  data: IndividualIdentity
): IndividualFinancialInfoFormValues => {
  return {
    occupation: data?.occupation,
    employer: data?.employer,
    employmentStatus: data?.employmentStatus,
    annualIncome: data?.annualIncome,
    sourceOfWealth: data?.sourceOfWealth,
    sourceOfFund: getFundSource(data)
  }
}

export const getTaxDeclarationFormValues = (
  data: IndividualIdentity
): IndividualTaxDeclarationFormValues => {
  return {
    taxResidencies: data?.taxResidencies ?? [],
    singaporeOnly:
      data.taxResidencies?.length === 1 &&
      data.taxResidencies[0].residentOfSingapore
        ? 'yes'
        : 'no',
    declarations: { fatca: 'no' }
  }
}

export const getInvestorDeclarationFormValues = (data: IndividualIdentity) => {}

export const getDocumentsFormValues = (data: IndividualIdentity) => {}

export const getAgreementsAndDisclosuresFormValues = (
  data: IndividualIdentity
) => {}
