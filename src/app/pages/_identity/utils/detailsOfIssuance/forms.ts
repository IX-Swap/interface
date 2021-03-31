import { DetailsOfIssuance } from 'types/detailsOfIssuance'

export const getIssuerDetailsFormValues = (data: DetailsOfIssuance) => {
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
