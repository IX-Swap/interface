import {
  IndividualDocumentsFormValues,
  IndividualFinancialInfoFormValues,
  IndividualInvestorDeclarationFormValues,
  IndividualPersonalInfoFormValues,
  IndividualTaxDeclarationFormValues
} from 'app/pages/_identity/types/forms'
import { AgreementsAndDisclosures } from '../../../../../types/identity'

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
  const { taxResidencies, singaporeOnly, declarations } = values
  const payload: any = {
    declarations
  }

  if (taxResidencies !== undefined) {
    payload.taxResidencies = taxResidencies.map(taxResidency => {
      const payload = taxResidency

      payload.residentOfSingapore = singaporeOnly === 'yes'

      for (const [key, value] of Object.entries(payload)) {
        if (typeof value === 'string' && value.trim() === '') {
          delete payload[key as keyof typeof payload]
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
    documents: Object.values(values.documents).reduce<string[]>(
      (result, documents) => {
        if (Array.isArray(documents)) {
          return [...result, ...documents.map(document => document._id)]
        }

        return result
      },
      []
    )
  }
}

export const getAgreementsRequestPayload = (
  values: AgreementsAndDisclosures
) => {
  return values
}
