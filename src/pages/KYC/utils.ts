import { entityTypes, legalEntityTypes } from './mock'

export const transformApiData = (data: any) => {
  const {
    typeOfLegalEntity,
    countryOfIncorporation,
    entityType,
    documents,
    address,
    residentialAddress,
    taxCountry,
    sourceOfFunds,
    beneficialOwners,
    usTin,
  } = data
  const splittedFunds = sourceOfFunds.split(',').map((name: string) => name.trim())
  const funds = splittedFunds.includes('Others') ? splittedFunds.slice(0, -1) : splittedFunds
  console.log('data', data)

  return {
    ...data,
    typeOfLegalEntity: legalEntityTypes[typeOfLegalEntity - 1],
    countryOfIncorporation: { id: 0, name: countryOfIncorporation },
    entityType: entityTypes[entityType - 1],
    authorizationDocuments: documents.filter(({ type }: any) => type === 'authorization'),
    line1: address.line1,
    line2: address.line2,
    country: { id: 0, name: address.country },
    city: address.city,
    residentialAddressLine1: residentialAddress.line1,
    residentialAddressLine2: residentialAddress.line2,
    residentialAddressCountry: { id: 0, name: residentialAddress.country },
    residentialAddressCity: residentialAddress.city,
    sourceOfFunds: funds,
    isUSTaxPayer: usTin ? 1 : 0,
    otherFunds: splittedFunds.includes('Others') ? splittedFunds[splittedFunds.length - 1] : '',
    taxCountry: { id: 0, name: taxCountry },
    beneficialOwners: beneficialOwners.map(({ fullName, shareholding, proofOfAddress, proofOfIdentity }: any) => ({
      fullName,
      shareholding,
      proofOfAddress,
      proofOfIdentity,
    })),
    corporateDocuments: documents.filter(({ type }: any) => type === 'corporate'),
    financialDocuments: documents.filter(({ type }: any) => type === 'financial'),
    evidenceOfAccreditation: documents.filter(({ type }: any) => type === 'accreditation'),
  }
}
