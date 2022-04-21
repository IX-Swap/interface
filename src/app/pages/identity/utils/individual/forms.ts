import {
  IndividualDocumentsFormValues,
  IndividualFinancialInfoFormValues,
  IndividualIdentity,
  IndividualInvestorDeclarationFormValues,
  IndividualPersonalInfoFormValues,
  IndividualTaxDeclarationFormValues
} from 'app/pages/identity/types/forms'

export const getPersonalInfoFormValues = (
  data: IndividualIdentity
): IndividualPersonalInfoFormValues => {
  return {
    photo: data?.photo,
    firstName: data?.firstName,
    middleName: data?.middleName,
    lastName: data?.lastName,
    dob: data?.dob,
    email: data?.email,
    contactNumber: data?.contactNumber,
    nationality: data?.nationality,
    gender: data?.gender,
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
  const result: Partial<IndividualTaxDeclarationFormValues> = {}

  if (data === undefined) {
    return result
  }

  const { taxResidencies, declarations } = data

  if (taxResidencies !== undefined && taxResidencies.length > 0) {
    result.taxResidencies = taxResidencies.map(({ _id, ...rest }: any) => rest)
    result.singaporeOnly =
      taxResidencies.length === 1 &&
      Boolean(taxResidencies[0].residentOfSingapore)
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
  if (data === undefined) {
    return {
      evidenceOfAccreditation: [],
      proofOfAddress: [],
      proofOfIdentity: []
    }
  }

  return data.documents.reduce((result: any, document) => {
    const { evidenceOfAccreditation, proofOfAddress, proofOfIdentity } = result

    if (document.type === 'Evidence of Accreditation') {
      return {
        ...result,
        evidenceOfAccreditation: Array.isArray(evidenceOfAccreditation)
          ? [...evidenceOfAccreditation, { value: document }]
          : [{ value: document }]
      }
    }

    if (document.type === 'Proof of Address') {
      return {
        ...result,
        proofOfAddress: Array.isArray(proofOfAddress)
          ? [...proofOfAddress, { value: document }]
          : [{ value: document }]
      }
    }

    if (document.type === 'Proof of Identity') {
      return {
        ...result,
        proofOfIdentity: Array.isArray(proofOfIdentity)
          ? [...proofOfIdentity, { value: document }]
          : [{ value: document }]
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
