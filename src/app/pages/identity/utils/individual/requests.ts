import {
  IndividualAgreementsFormValues,
  IdentityDocumentsFormValues,
  IndividualInvestorDeclarationFormValues,
  IndividualPersonalInfoFormValues,
  FinancialAndTaxDeclarationFormValues,
  IndividualTaxDeclarationFormValues,
  IndividualFinancialInfoFormValues
} from 'app/pages/identity/types/forms'

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
  values: IndividualFinancialInfoFormValues
) => {
  return {
    ...values
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
  const payload: any = {
    declarations: {
      tax: {
        fatca: fatca === 'yes',
        usTin
      }
    },
    ...other
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

export const getInvestorDeclarationRequestPayload = (
  values: IndividualInvestorDeclarationFormValues
) => {
  return {
    declarations: {
      investorsStatus: values
    }
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
