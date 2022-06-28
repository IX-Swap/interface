import { LEGAL_ENTITY_STATUS_LIST } from 'components/form/LegalEntityStatusSelect'
import { last } from 'lodash'
import {
  CorporateIdentity,
  CorporateInvestorDeclarationFormValues,
  CorporateInvestorTaxDeclarationFormValues,
  InvestorCorporateInfoFormValues,
  InvestorDirectorsAndBeneficialOwnersFormValues,
  Personnel
} from '../../types/forms'

export const getCorporateInfoFormValues = (
  data: CorporateIdentity | undefined
): Partial<InvestorCorporateInfoFormValues> => {
  const isCustomLegalEntityStatus =
    data?.legalEntityStatus !== undefined &&
    LEGAL_ENTITY_STATUS_LIST.every(
      ({ value }) => value !== data.legalEntityStatus
    )
  const otherLegalEntityStatus = isCustomLegalEntityStatus
    ? data?.legalEntityStatus
    : undefined

  const legalEntityStatus = isCustomLegalEntityStatus
    ? last(LEGAL_ENTITY_STATUS_LIST)?.value
    : data?.legalEntityStatus

  const representatives = data?.representatives.map(item => {
    return {
      ...item,
      documents: Array.isArray(item.documents)
        ? item.documents?.map(doc => ({ value: doc }))
        : []
    }
  })

  return {
    logo: data?.logo,
    companyLegalName: data?.companyLegalName,
    registrationNumber: data?.registrationNumber,
    legalEntityStatus,
    otherLegalEntityStatus,
    countryOfFormation: data?.countryOfFormation,
    companyAddress: data?.companyAddress,
    representatives: representatives,
    mailingAddress: data?.mailingAddress,
    isMailingAddressSame: data?.isMailingAddressSame,
    numberOfBusinessOwners: data?.numberOfBusinessOwners,
    businessActivity: data?.businessActivity,
    sourceOfFund: data?.sourceOfFund
  }
}

export const getDirectorsAndBeneficialOwnersFormValues = (
  data: CorporateIdentity | undefined
): Partial<InvestorDirectorsAndBeneficialOwnersFormValues> => {
  const getDirectorDocuments = (director: Personnel) => {
    const proofOfAddress = director.documents
      ?.filter(document => document?.type === 'Proof of Address')
      ?.map(doc => ({ value: doc })) ?? [{}]

    const proofOfIdentity = director.documents
      ?.filter(document => document?.type === 'Proof of Identity')
      ?.map(doc => ({ value: doc })) ?? [{}]

    return {
      proofOfIdentity,
      proofOfAddress
    }
  }

  return {
    directors: data?.directors.map(director => {
      return {
        ...director,
        ...getDirectorDocuments(director)
      }
    }),
    beneficialOwners: data?.beneficialOwners.map(director => {
      return {
        ...director,
        ...getDirectorDocuments(director)
      }
    })
  }
}

export const getCorporateInvestorTaxDeclarationFormValues = (
  data: CorporateIdentity | undefined
): Partial<CorporateInvestorTaxDeclarationFormValues> => {
  return {
    taxResidencies:
      data?.taxResidencies?.map(({ _id, ...rest }: any) => rest) ?? []
  }
}

export const getCorporateInvestorDeclarationFormValues = (
  data: CorporateIdentity | undefined
): Partial<CorporateInvestorDeclarationFormValues> => {
  const declarations = data?.declarations?.investorsStatus ?? {}
  const isInstitutionalInvestor = data?.isInstitutionalInvestor

  const documents = data?.documents.reduce((result: any, document) => {
    const {
      evidenceOfAccreditation,
      financialDocuments,
      corporateDocuments,
      institutionalInvestorDocuments
    } = result

    if (document.type === 'Evidence of Accreditation') {
      return {
        ...result,
        evidenceOfAccreditation: Array.isArray(evidenceOfAccreditation)
          ? [...evidenceOfAccreditation, { value: document }]
          : [{ value: document }]
      }
    }

    if (document.type === 'Financial Documents') {
      return {
        ...result,
        financialDocuments: Array.isArray(financialDocuments)
          ? [...financialDocuments, { value: document }]
          : [{ value: document }]
      }
    }

    if (document.type === 'Corporate Documents') {
      return {
        ...result,
        corporateDocuments: Array.isArray(corporateDocuments)
          ? [...corporateDocuments, { value: document }]
          : [{ value: document }]
      }
    }

    if (document.type === 'Institutional Investor Documents') {
      return {
        ...result,
        institutionalInvestorDocuments: Array.isArray(
          institutionalInvestorDocuments
        )
          ? [...institutionalInvestorDocuments, { value: document }]
          : [{ value: document }]
      }
    }

    return result
  }, {})

  return {
    ...declarations,
    ...documents,
    isInstitutionalInvestor: isInstitutionalInvestor
  }
}

export const getCorporateInvestorAgreementsAndDisclosuresFormValues = (
  data: CorporateIdentity | undefined
) => {
  return data?.declarations?.agreements
}
