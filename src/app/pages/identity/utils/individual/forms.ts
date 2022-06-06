import {
  IndividualDocumentsFormValues,
  IndividualFinancialInfoFormValues,
  IndividualIdentity,
  IndividualInvestorDeclarationFormValues,
  IndividualPersonalInfoFormValues,
  IndividualTaxDeclarationFormValues
} from 'app/pages/identity/types/forms'
import { titleCase } from 'app/pages/identity/utils/shared'

export const getPersonalInfoFormValues = (
  data: IndividualIdentity
): IndividualPersonalInfoFormValues => {
  const country = titleCase(data?.address?.country)
  const nationality = titleCase(data?.nationality)

  return {
    photo: data?.photo,
    firstName: data?.firstName,
    middleName: data?.middleName,
    lastName: data?.lastName,
    dob: data?.dob,
    email: data?.email,
    contactNumber: data?.contactNumber,
    nationality,
    gender: data?.gender,
    address: {
      line1: data?.address?.line1,
      line2: data?.address?.line2,
      state: data?.address?.state,
      postalCode: data?.address?.postalCode,
      country,
      city: data?.noa_basic !== undefined ? country : data?.address?.city
    }
  }
}

export const getFinancialInfoFormValues = (
  data: IndividualIdentity
): Partial<IndividualFinancialInfoFormValues> => {
  return {
    occupation: data?.occupation,
    employer: data?.employer,
    employmentStatus: data?.employmentStatus,
    annualIncome: data?.annualIncome,
    sourceOfFund: data?.sourceOfFund
  }
}

export const getTaxDeclarationFormValues = (
  data: IndividualIdentity
): Partial<IndividualTaxDeclarationFormValues> => {
  const { taxResidencies, declarations } = data
  const result: Partial<IndividualTaxDeclarationFormValues> = {}
  const isSingPass = data?.uinfin !== undefined

  if (
    isSingPass ||
    (taxResidencies !== undefined && taxResidencies.length > 0)
  ) {
    result.taxResidencies = isSingPass
      ? [
          {
            residentOfSingapore: true,
            countryOfResidence: data?.address.country,
            taxIdentificationNumber: data?.uinfin,
            taxIdAvailable: true
          }
        ]
      : taxResidencies.map(({ _id, ...rest }: any) => rest)
    result.singaporeOnly =
      (taxResidencies.length === 1 &&
        Boolean(taxResidencies[0].residentOfSingapore)) ||
      (isSingPass && taxResidencies.length < 1)
        ? 'yes'
        : 'no'
  }

  if (declarations?.tax?.fatca !== undefined) {
    result.fatca = declarations.tax.fatca ? 'yes' : 'no'
  }

  return result
}

export const getInvestorDeclarationFormValues = (
  data: IndividualIdentity
): IndividualInvestorDeclarationFormValues => {
  return data?.declarations?.investorsStatus
}

export const getDocumentsFormValues = (
  data: IndividualIdentity
): IndividualDocumentsFormValues => {
  return data.documents.reduce((result: any, document) => {
    const { evidenceOfAccreditation, proofOfAddress, proofOfIdentity } = result

    if (document.type === 'Evidence of Accreditation') {
      return {
        ...result,
        evidenceOfAccreditation: Array.isArray(evidenceOfAccreditation)
          ? [...evidenceOfAccreditation, document]
          : [document]
      }
    }

    if (document.type === 'Proof of Address') {
      return {
        ...result,
        proofOfAddress: Array.isArray(proofOfAddress)
          ? [...proofOfAddress, document]
          : [document]
      }
    }

    if (document.type === 'Proof of Identity') {
      return {
        ...result,
        proofOfIdentity: Array.isArray(proofOfIdentity)
          ? [...proofOfIdentity, document]
          : [document]
      }
    }

    return result
  }, {})
}

export const getAgreementsAndDisclosuresFormValues = (
  data: IndividualIdentity
) => {
  return data.declarations.agreements
}
