import { DetailsOfIssuance } from 'types/detailsOfIssuance'

export const getIssuerDetailsFormValues = (data: DetailsOfIssuance) => {
  return {
    fullName: data?.fullName,
    companyName: data?.companyName,
    companyRegistrationNumber: data?.registrationNumber,
    contactNumber: data?.contactNumber,
    email: data?.emailAddress,
    industry: data?.industry,
    fundRaisingAmount: data?.fundrasingAmount,
    detail: data?.detailsOfIssuance
  }
}
