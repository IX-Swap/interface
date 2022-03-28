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
  const splittedFunds = sourceOfFunds.split(',').map((label: string) => label.trim())
  const funds = splittedFunds.includes('Others') ? splittedFunds.slice(0, -1) : splittedFunds

  return {
    ...data,
    typeOfLegalEntity: legalEntityTypes[typeOfLegalEntity - 1],
    countryOfIncorporation: { value: 0, label: countryOfIncorporation },
    authorizationDocuments: documents.filter(({ type }: any) => type === 'authorization'),
    line1: address.line1,
    line2: address.line2,
    country: { value: 0, label: address.country },
    city: address.city,
    residentialAddressLine1: residentialAddress.line1,
    residentialAddressLine2: residentialAddress.line2,
    residentialAddressCountry: { value: 0, label: residentialAddress.country },
    residentialAddressCity: residentialAddress.city,
    sourceOfFunds: funds.filter((fund: string) => fund !== ''),
    isUSTaxPayer: usTin ? 1 : 0,
    otherFunds: splittedFunds.includes('Others') ? splittedFunds[splittedFunds.length - 1] : '',
    taxCountry: { value: 0, label: taxCountry },
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
    // evidenceOfAccreditation: documents.filter(({ type }: any) => type === 'accreditation'),
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
    typeOfLegalEntity: typeOfLegalEntity.value,
    sourceOfFunds: [...sourceOfFunds, otherFunds].join(', '),
    countryOfIncorporation: countryOfIncorporation.label,
    country: country.label,
    residentialAddressCountry: residentialAddressCountry.label,
    taxCountry: taxCountry.label,
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

export const individualTransformApiData = (data: any) => {
  const { sourceOfFunds, address, documents, usTin, citizenship, employmentStatus, gender, nationality, income } = data
  const splittedFunds = sourceOfFunds.split(',').map((label: string) => label.trim())
  const funds = splittedFunds.includes('Others') ? splittedFunds.slice(0, -1) : splittedFunds

  return {
    ...data,
    sourceOfFunds: funds.filter((fund: string) => fund !== ''),
    isUSTaxPayer: usTin ? 1 : 0,
    otherFunds: splittedFunds.includes('Others') ? splittedFunds[splittedFunds.length - 1] : '',
    line1: address.line1,
    line2: address.line2,
    country: { value: 0, label: address.country },
    city: address.city,
    proofOfAddress: documents.filter(({ type }: any) => type === 'address'),
    proofOfIdentity: documents.filter(({ type }: any) => type === 'identity'),
    // evidenceOfAccreditation: documents.filter(({ type }: any) => type === 'accreditation'),
    citizenship: { value: 0, label: citizenship },
    employmentStatus: { value: 0, label: employmentStatus },
    gender: { value: 0, label: gender },
    nationality: { value: 0, label: nationality },
    income: { value: 0, label: income },
    removedDocuments: [],
  }
}

export const individualTransformKycDto = (values: any) => {
  const {
    dateOfBirth,
    sourceOfFunds,
    otherFunds,
    citizenship,
    nationality,
    country,
    employmentStatus,
    gender,
    income,
    isUSTaxPayer,
  } = values

  return {
    ...values,
    dateOfBirth: typeof dateOfBirth === 'string' ? dateOfBirth : dateOfBirth.format(),
    sourceOfFunds: [...sourceOfFunds, otherFunds].join(', '),
    citizenship: citizenship.label,
    nationality: nationality.label,
    country: country.label,
    employmentStatus: employmentStatus.label,
    gender: gender.label,
    income: income.label,
    isUSTaxPayer: isUSTaxPayer ? true : false,
  }
}
