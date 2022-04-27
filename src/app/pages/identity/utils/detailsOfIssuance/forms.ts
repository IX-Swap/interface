import { DetailsOfIssuance } from 'types/detailsOfIssuance'

export const getIssuerDetailsFormValues = (data?: DetailsOfIssuance) => {
  return {
    fullName: data?.fullName,
    companyName: data?.companyName,
    companyRegistrationNumber: data?.companyRegistrationNumber,
    contactNumber: data?.contactNumber,
    email: data?.email,
    industry: data?.industry,
    fundRaisingAmount: data?.fundRaisingAmount,
    detail: data?.detail
  }
}

export const getIssuerDocumentsFormValues = (data?: DetailsOfIssuance) => {
  return data?.documents.reduce((result: any, document) => {
    const { companyRelated, issuanceRelated, financial } = result

    if (document.type === 'Company-Related Documents') {
      return {
        ...result,
        companyRelated: Array.isArray(companyRelated)
          ? [...companyRelated, { value: document }]
          : [{ value: document }]
      }
    }

    if (document.type === 'Issuance-Related Documents') {
      return {
        ...result,
        issuanceRelated: Array.isArray(issuanceRelated)
          ? [...issuanceRelated, { value: document }]
          : [{ value: document }]
      }
    }

    if (document.type === 'Financial Documents') {
      return {
        ...result,
        financial: Array.isArray(financial)
          ? [...financial, { value: document }]
          : [{ value: document }]
      }
    }

    return result
  }, {})
}
