import {
  IndividualAgreementsFormValues,
  IndividualDocumentsFormValues,
  IndividualFinancialInfoFormValues,
  IndividualInvestorDeclarationFormValues,
  IndividualPersonalInfoFormValues,
  IndividualTaxDeclarationFormValues
} from 'app/pages/_identity/types/forms'

export const getPersonalInfoRequestPayload = (
  values: IndividualPersonalInfoFormValues
) => {
  return values
}

export const getFinancialInfoRequestPayload = (
  values: IndividualFinancialInfoFormValues
) => {
  return {
    ...values,
    fundMajority: values.fundMajority === 'yes'
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
  values: IndividualDocumentsFormValues
) => {
  return {
    documents: Object.values(values).reduce<string[]>((result, documents) => {
      if (Array.isArray(documents)) {
        return [...result, ...documents.map(document => document._id)]
      }

      return result
    }, [])
  }
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
