import {
  IndividualAgreementsFormValues,
  IdentityDocumentsFormValues,
  IndividualFinancialInfoFormValues,
  IndividualInvestorDeclarationFormValues,
  FinancialAndTaxDeclarationFormValues,
  IndividualPersonalInfoFormValues,
  IndividualTaxDeclarationFormValues
} from 'app/pages/identity/types/forms'
import { DataroomFile, FormArrayElement } from 'types/dataroomFile'

export const getPersonalInfoRequestPayload = (
  values: IndividualPersonalInfoFormValues
) => {
  if (values.dob === null || values.dob === undefined) {
    delete values.dob
  }
  return {
    ...values,
    nric: values.nationality === 'Singapore' ? values.nric : undefined
  }
}

export const getFinancialInfoRequestPayload = (
  values: IndividualFinancialInfoFormValues & IndividualTaxDeclarationFormValues
) => {
  const { fatca, usTin, ...rest } = values

  return {
    ...rest,
    declarations: {
      tax: {
        fatca: fatca === 'yes',
        usTin: usTin
      }
    }
  }
}

export const getTaxDeclarationRequestPayload = (
  values: IndividualTaxDeclarationFormValues
) => {
  const { taxResidencies, singaporeOnly, fatca } = values
  const payload: any = {
    declarations: {
      tax: {
        fatca: fatca === 'yes'
      }
    }
  }

  if (taxResidencies !== undefined) {
    payload.taxResidencies = taxResidencies.map(taxResidency => {
      const payload = taxResidency

      payload.residentOfSingapore = singaporeOnly === 'yes'

      for (const [key, value] of Object.entries(payload)) {
        if (typeof value === 'string' && value.trim() === '') {
          delete payload[key as keyof typeof payload] // eslint-disable-line
        }
      }

      return payload
    })
  }

  return payload
}

export const getFinancialAndTaxDeclarationRequestPayload = (
  values: FinancialAndTaxDeclarationFormValues
) => {
  const { taxResidencies, singaporeOnly, fatca, usTin, ...other } = values
  const payload = getTaxDeclarationRequestPayload(values)
  payload.declarations.tax.usTin = usTin

  return { ...payload, ...other }
}

export const getInvestorDeclarationRequestPayload = (
  values: IndividualInvestorDeclarationFormValues & IdentityDocumentsFormValues
) => {
  const { evidenceOfAccreditation, proofOfIdentity, proofOfAddress, ...rest } =
    values

  const getDocuments = (documents: Array<FormArrayElement<DataroomFile>>) =>
    documents.map(doc => doc.value._id).filter(doc => doc !== undefined)

  return {
    declarations: {
      investorsStatus: rest
    },
    documents: [
      ...getDocuments(evidenceOfAccreditation),
      ...getDocuments(proofOfAddress),
      ...getDocuments(proofOfIdentity)
    ]
  }
}

export const getDocumentsRequestPayload = (
  values: IdentityDocumentsFormValues
) => {
  const documents = {
    documents: Object.values(values).reduce<string[]>((result, documents) => {
      if (Array.isArray(documents)) {
        return [...result, ...documents.map(document => document.value._id)]
      }

      return result
    }, [])
  }
  return documents.documents.length > 0 ? documents : {}
}

export const getAgreementsRequestPayload = (
  values: IndividualAgreementsFormValues
) => {
  return {
    declarations: {
      agreements: values
    }
  }
}
