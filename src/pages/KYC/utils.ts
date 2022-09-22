import { IdentityDocumentType } from './enum'
import { legalEntityTypes } from './mock'

const filterFields = ['investorDeclarationStatus', 'investorDeclarationId', 'acceptOfQualification', 'acceptRefusalRight']

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
  const [funds, otherFunds = ''] = sourceOfFunds.split(', Others, ')

  return {
    ...data,
    typeOfLegalEntity: {
      value: legalEntityTypes.find(({ label }) => label === typeOfLegalEntity)?.value || 0,
      label: typeOfLegalEntity,
    },
    countryOfIncorporation: { value: 0, label: countryOfIncorporation },
    authorizationDocuments: documents.filter(({ type }: any) => type === 'authorization'),
    address: address.address,
    postalCode: address.postalCode,
    country: { value: 0, label: address.country },
    city: address.city,
    residentialAddressAddress: residentialAddress.address,
    residentialAddressPostalCode: residentialAddress.postalCode,
    residentialAddressCountry: { value: 0, label: residentialAddress.country },
    residentialAddressCity: residentialAddress.city,
    sourceOfFunds: otherFunds.length ? [...funds.split(', '), 'Others'] : funds.split(', '),
    isUSTaxPayer: usTin ? 1 : 0,
    otherFunds,
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
    incorporationDate,
    incorporationExpiryDate,
  } = values

  return {
    ...values,
    ...(!isUSTaxPayer && { usTin: '' }),
    incorporationDate:
      typeof incorporationDate === 'string' ? incorporationDate : incorporationDate.format('MM/DD/YYYY'),
    incorporationExpiryDate:
      typeof incorporationExpiryDate === 'string'
        ? incorporationExpiryDate
        : incorporationExpiryDate.format('MM/DD/YYYY'),
    typeOfLegalEntity: typeOfLegalEntity.label,
    sourceOfFunds: [...sourceOfFunds, ...(sourceOfFunds.includes('Others') ? [otherFunds] : [])].join(', '),
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
  const {
    sourceOfFunds,
    address,
    documents,
    usTin,
    citizenship,
    employmentStatus,
    gender,
    nationality,
    income,
    occupation,
    idType,
  } = data
  const [funds = '', otherFunds = ''] = (sourceOfFunds ?? '').split(', Others, ')

  const idTypeKey = idType?.replaceAll(' ', '_') as keyof typeof IdentityDocumentType

  return {
    ...data,
    sourceOfFunds: otherFunds?.length ? [...funds.split(', '), 'Others'] : funds.split(', '),
    isUSTaxPayer: usTin ? 1 : 0,
    otherFunds,
    address: address?.address,
    postalCode: address?.postalCode,
    country: { value: 0, label: address?.country },
    city: address?.city,
    proofOfAddress: documents?.filter(({ type }: any) => type === 'address'),
    proofOfIdentity: documents?.filter(({ type }: any) => type === 'identity'),
    evidenceOfAccreditation: documents?.filter(({ type }: any) => type === 'accreditation'),
    idType: { value: 0, label: IdentityDocumentType[idTypeKey] },
    citizenship: { value: 0, label: citizenship },
    employmentStatus: { value: 0, label: employmentStatus },
    gender: { value: 0, label: gender },
    occupation: { value: 0, label: occupation },
    nationality: { value: 0, label: nationality },
    income: { value: 0, label: income },
    removedDocuments: [],

    taxDeclarations: data.taxDeclarations.map((t: any) => ({ ...t, country: { label: t.country } })),

    investorDeclarationStatus: data.investorDeclaration?.status,
    acceptOfQualification: data.investorDeclaration?.acceptOfQualification,
    acceptRefusalRight: data.investorDeclaration?.acceptRefusalRight
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
    occupation,
    idIssueDate,
    idExpiryDate,
    idType,
    taxDeclarations
  } = values

  const isLabel = sourceOfFunds.some((x: any) => x.label)
  const emptyInvestorDeclaration = {
    status: null,
    confirmStatusDeclaration: false
  }

  const result = {
    ...values,

    gender: gender?.label,
    dateOfBirth: typeof dateOfBirth === 'string'
      ? dateOfBirth
      : dateOfBirth?.format('MM/DD/YYYY'),

    nationality: nationality?.label,
    citizenship: citizenship?.label,
    
    declarationAcknowledgement: 'offers-acknowledgement',
    
    idType: idType?.label?.toUpperCase(),
    idIssueDate: typeof idIssueDate === 'string' ? idIssueDate : idIssueDate?.format('MM/DD/YYYY'),
    idExpiryDate: typeof idExpiryDate === 'string' ? idExpiryDate : idExpiryDate?.format('MM/DD/YYYY'),

    sourceOfFunds: [...sourceOfFunds.map((x: any) => isLabel ? x.label : x), ...(sourceOfFunds.some((x: any) => isLabel ? x.label === 'Others' : x === 'Others') ? [otherFunds] : [])].join(', '),

    occupation: occupation?.label,
    employmentStatus: employmentStatus?.label,
    income: income?.label,
    
    ...(!isUSTaxPayer && { usTin: '' }),
    country: country?.label,
    isUSTaxPayer: isUSTaxPayer ? true : false,

    investorDeclaration: values?.accredited ? 
    {
      ...values.investorDeclaration,

      status: values?.investorDeclarationStatus,
      acceptOfQualification: values?.acceptOfQualification,
      acceptRefusalRight: values?.acceptRefusalRight,
    } : emptyInvestorDeclaration,

    taxDeclarations: taxDeclarations
      ?.map((t: any, idx: number) => ({ ...t, country: t?.country?.label, })),

    removedTaxDeclarations: values.removedTaxDeclarations
  }

  for (const tax of result.taxDeclarations) {
    if (tax.reason === null) {
      delete tax.reason
    }
  }

  for (const entry of filterFields) {
    delete result[entry];
  }

  return Object.entries(result)
    .filter(([key, value]) =>
      value !== '' && 
      value !== null &&
      value !== undefined
    )
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Record<string, any>)
}
