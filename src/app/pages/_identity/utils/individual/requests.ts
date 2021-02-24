import {
  IndividualFinancialInfoFormValues,
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
  return values
}

export const getTaxDeclarationRequestPayload = (
  values: IndividualTaxDeclarationFormValues
) => {
  const { taxResidencies, singaporeOnly, declarations } = values

  return {
    declarations,
    taxResidencies: taxResidencies.map(taxResidency => {
      const payload = taxResidency

      payload.residentOfSingapore = singaporeOnly === 'yes' ? true : false

      for (let [key, value] of Object.entries(payload)) {
        if (typeof value === 'string' && value.trim() === '') {
          delete payload[key as keyof typeof payload]
        }
      }

      return payload
    })
  }
}
