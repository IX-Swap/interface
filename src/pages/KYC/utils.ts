import { legalEntityTypes } from './mock'

export const corporateTransformApiData = (data: any) => {
  const {
    typeOfLegalEntity,
    countryOfIncorporation,
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

  return {
    ...data,
    typeOfLegalEntity: legalEntityTypes[typeOfLegalEntity - 1],
    countryOfIncorporation: { id: 0, name: countryOfIncorporation },
    authorizationDocuments: documents.filter(({ type }: any) => type === 'authorization'),
    line1: address.line1,
    line2: address.line2,
    country: { id: 0, name: address.country },
    city: address.city,
    residentialAddressLine1: residentialAddress.line1,
    residentialAddressLine2: residentialAddress.line2,
    residentialAddressCountry: { id: 0, name: residentialAddress.country },
    residentialAddressCity: residentialAddress.city,
    sourceOfFunds: funds.filter((fund: string) => fund !== ''),
    isUSTaxPayer: usTin ? 1 : 0,
    otherFunds: splittedFunds.includes('Others') ? splittedFunds[splittedFunds.length - 1] : '',
    taxCountry: { id: 0, name: taxCountry },
    beneficialOwners:
      beneficialOwners.length > 0
        ? beneficialOwners.map(({ id, fullName, shareholding, proofOfAddress, proofOfIdentity }: any) => ({
            id,
            fullName,
            shareholding,
            proofOfAddress,
            proofOfIdentity,
          }))
        : [{ fullName: '', shareholding: '', proofOfAddress: null, proofOfIdentity: null }],
    corporateDocuments: documents.filter(({ type }: any) => type === 'corporate'),
    financialDocuments: documents.filter(({ type }: any) => type === 'financial'),
    evidenceOfAccreditation: documents.filter(({ type }: any) => type === 'accreditation'),
    removedDocuments: [],
    removedBeneficialOwners: [],
  }
}

export const corporateTransformKycDto = (values: any) => {
  const {
    typeOfLegalEntity,
    countryOfIncorporation,
    country,
    residentialAddressCountry,
    sourceOfFunds,
    otherFunds,
    isUSTaxPayer,
    taxCountry,
    beneficialOwners,
  } = values

  return {
    ...values,
    typeOfLegalEntity: typeOfLegalEntity.id,
    sourceOfFunds: [...sourceOfFunds, otherFunds].join(', '),
    countryOfIncorporation: countryOfIncorporation.name,
    country: country.name,
    residentialAddressCountry: residentialAddressCountry.name,
    taxCountry: taxCountry.name,
    isUSTaxPayer: isUSTaxPayer ? true : false,
    beneficialOwners: JSON.stringify(
      beneficialOwners.map(({ id, fullName, shareholding, proofOfAddress, proofOfIdentity }: any) => ({
        id: id || null,
        fullName,
        shareholding: +shareholding,
        proofOfAddress: proofOfAddress?.id || null,
        proofOfIdentity: proofOfIdentity?.id || null,
      }))
    ),
    beneficialOwnersIdentity: beneficialOwners.map(({ proofOfIdentity }: any) => proofOfIdentity),
    beneficialOwnersAddress: beneficialOwners.map(({ proofOfAddress }: any) => proofOfAddress),
  }
}
