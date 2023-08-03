import {
  IdentityDocumentsFormValues,
  IndividualFinancialInfoFormValues,
  IndividualIdentity,
  IndividualInvestorDeclarationFormValues,
  IndividualPersonalInfoFormValues,
  IndividualTaxDeclarationFormValues
} from 'app/pages/identity/types/forms'
import { titleCase } from 'app/pages/identity/utils/shared'
import { isEmpty } from 'lodash'
import { DataroomFile } from 'types/dataroomFile'

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
    nric: data?.uinfin ?? data?.nric,
    address: {
      line1: data?.address?.line1,
      line2: data?.address?.line2,
      state: data?.address?.state,
      postalCode: data?.address?.postalCode,
      country,
      city: data?.address?.city
    },
    ...getDocumentsFormValues(data)
  }
}

export const getFinancialInfoFormValues = (
  data: IndividualIdentity
): Partial<IndividualFinancialInfoFormValues> => {
  const sourceOfFund = Array.isArray(data?.sourceOfFund)
    ? undefined
    : data?.sourceOfFund

  return {
    occupation: data?.occupation,
    employer: data?.employer,
    employmentStatus: data?.employmentStatus,
    sourceOfFund: sourceOfFund,
    annualIncome: data?.annualIncome,
    ...getTaxDeclarationFormValues(data)
  }
}

export const getTaxDeclarationFormValues = (
  data: IndividualIdentity
): Partial<IndividualTaxDeclarationFormValues> => {
  const result: Partial<IndividualTaxDeclarationFormValues> = {}
  const isSingPass = data?.uinfin !== undefined

  if (data === undefined) {
    return result
  }

  const { taxResidencies, declarations } = data

  if (
    isSingPass ||
    (taxResidencies !== undefined && taxResidencies.length > 0)
  ) {
    result.taxResidencies = isSingPass
      ? [
          {
            residentOfSingapore: true,
            countryOfResidence: titleCase(data?.address.country),
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
    if (declarations.tax.fatca) {
      result.usTin = declarations.tax.usTin
    }
  }

  return result
}

export const getInvestorDeclarationFormValues = (
  data: IndividualIdentity
): IndividualInvestorDeclarationFormValues => {
  return {
    ...data?.declarations?.investorsStatus,
    ...getDocumentsFormValues(data),
    applyingAs: data.applyingAs[0]
  }
}

export const getDocumentsFormValues = (
  data: IndividualIdentity
): Partial<IdentityDocumentsFormValues> => {
  if (data === undefined || isEmpty(data)) {
    return {
      evidenceOfAccreditation: [],
      proofOfAddress: [],
      proofOfIdentity: []
    }
  }

  return data.documents.reduce(
    (result: any, document, index, documentsArray) => {
      const { evidenceOfAccreditation, proofOfAddress, proofOfIdentity } =
        result

      if (document.type.startsWith('Evidence of ')) {
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
        interface DocumentItem {
          value?: DataroomFile
          front?: DataroomFile
          back?: DataroomFile
        }
        const documentItem: DocumentItem = {}

        if (document.feature === 'back') {
          return result
        } else if (document.feature === 'front') {
          documentItem.front = document

          if (documentsArray[index + 1]?.feature === 'back') {
            documentItem.back = documentsArray[index + 1]
          }
        } else {
          documentItem.value = document
        }

        return {
          ...result,
          proofOfIdentity: Array.isArray(proofOfIdentity)
            ? [...proofOfIdentity, documentItem]
            : [documentItem]
        }
      }

      return result
    },
    {}
  )
}

export const getAgreementsAndDisclosuresFormValues = (
  data: IndividualIdentity
) => {
  return data.declarations.agreements
}
