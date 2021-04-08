import {
  IssuerDetailsFormValues,
  IssuerDocumentsFormValues
} from 'app/pages/_identity/types/forms'

export const getIssuerDetailsRequestPayload = (
  values: IssuerDetailsFormValues
) => {
  return values
}

export const getIssuerDocumentsRequestPayload = (
  values: IssuerDocumentsFormValues
) => {
  const documents = Object.values(values).reduce<string[]>(
    (result, documents) => {
      if (Array.isArray(documents)) {
        return [...result, ...documents.map(document => document._id)]
      }

      return result
    },
    []
  )

  return { documents }
}
