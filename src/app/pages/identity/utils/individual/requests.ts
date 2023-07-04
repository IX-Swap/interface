import {
  IndividualAgreementsFormValues,
  IdentityDocumentsFormValues,
  IndividualFinancialInfoFormValues,
  IndividualInvestorDeclarationFormValues,
  FinancialAndTaxDeclarationFormValues,
  IndividualPersonalInfoFormValues,
  IndividualTaxDeclarationFormValues
} from 'app/pages/identity/types/forms'
import { DataroomFile } from 'types/dataroomFile'

export const getPersonalInfoRequestPayload = (
  values: IndividualPersonalInfoFormValues
) => {
  const { proofOfIdentity, proofOfAddress, evidenceOfAccreditation, ...rest } =
    values
  if (values.dob === null || values.dob === undefined) {
    delete values.dob
  }

  const documents = Object.values(values).reduce<
    Array<{ value: DataroomFile }>
  >((result, docs) => {
    if (Array.isArray(docs)) {
      return [...result, ...docs.map(document => document.value?._id)]
    }

    return result
  }, [])

  return {
    ...rest,
    nric: values.nationality === 'Singapore' ? values.nric : undefined,
    documents: documents.filter(doc => doc !== undefined)
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
  const {
    applyingAs,
    evidenceOfAccreditation,
    proofOfIdentity,
    proofOfAddress,
    ...rest
  } = values

  const documents = Object.values(values).reduce<
    Array<{ value: DataroomFile }>
  >((result, docs) => {
    if (Array.isArray(docs)) {
      return [...result, ...docs.map(document => document.value?._id)]
    }

    return result
  }, [])

  return {
    applyingAs: [applyingAs],
    declarations: {
      investorsStatus: rest
    },
    documents: documents.filter(doc => doc !== undefined)
  }
}

export const getDocumentsRequestPayload = (
  values: IdentityDocumentsFormValues
) => {
  const documents = {
    documents: Object.values(values).reduce<string[]>((result, documents) => {
      if (Array.isArray(documents)) {
        return [...result, ...documents.map(document => document.value?._id)]
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

export const getIndividualAccreditationSubmitPayload = (values: any) => {
  return {
    documents: values.documents.map((item: { _id: any }) => item._id),
    declarations: values.declarations
  }
}
