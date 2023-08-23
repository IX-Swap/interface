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

const reduceCorporateDocuments = (documents: any) =>
  documents?.reduce((result: any, document: any) => {
    const {
      //   financialDocuments,
      corporateDocuments,
      evidenceOfAccreditation,
      institutionalInvestorDocuments
    } = result

    // if (document.type === 'Financial Documents') {
    //   return {
    //     ...result,
    //     financialDocuments: Array.isArray(financialDocuments)
    //       ? [...financialDocuments, { value: document }]
    //       : [{ value: document }]
    //   }
    // }

    if (document.type === 'Corporate Documents') {
      return {
        ...result,
        corporateDocuments: Array.isArray(corporateDocuments)
          ? [...corporateDocuments, { value: document }]
          : [{ value: document }]
      }
    }

    if (String(document.type).startsWith('Evidence of ')) {
      return {
        ...result,
        evidenceOfAccreditation: Array.isArray(evidenceOfAccreditation)
          ? [...evidenceOfAccreditation, { value: document }]
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

export const getCorporateInfoFormValues = (
  data: CorporateIdentity
): Partial<InvestorCorporateInfoFormValues> => {
  const isCustomLegalEntityStatus =
    data?.legalEntityStatus !== undefined &&
    LEGAL_ENTITY_STATUS_LIST.every(
      ({ value }) => value !== data.legalEntityStatus
    )
  // const otherLegalEntityStatus = isCustomLegalEntityStatus
  //   ? data?.legalEntityStatus
  //   : undefined

  const legalEntityStatus = isCustomLegalEntityStatus
    ? last(LEGAL_ENTITY_STATUS_LIST)?.value
    : data?.legalEntityStatus

  const documents =
    typeof data?.documents !== 'undefined' &&
    reduceCorporateDocuments(data?.documents)

  const representatives = data?.representatives.map(item => {
    return {
      ...item,
      documents: Array.isArray(item.documents)
        ? item.documents?.map(doc => ({ value: doc }))
        : []
    }
  })

  return {
    logo: data?.logo === null ? undefined : data?.logo,
    companyLegalName: data?.companyLegalName,
    countryOfFormation: data?.countryOfFormation,
    registrationNumber: data?.registrationNumber,
    legalEntityStatus,
    otherLegalEntityStatus: data?.numberOfBusinessOwners,
    sourceOfFund: data?.sourceOfFund,
    ...documents,
    companyAddress: data?.companyAddress,
    isMailingAddressSame: data?.isMailingAddressSame,
    mailingAddress: data?.mailingAddress,
    numberOfBusinessOwners: data?.numberOfBusinessOwners,
    businessActivity: data?.businessActivity,
    representatives: representatives
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
  data: CorporateIdentity
): Partial<CorporateInvestorDeclarationFormValues> => {
  const declarations = data?.declarations?.investorsStatus
  const { applyingAs, isInstitutionalInvestor, isIntermediaryInvestor } = data

  const documents =
    typeof data.documents !== 'undefined' &&
    reduceCorporateDocuments(data.documents)

  return {
    ...declarations,
    ...documents,
    applyingAs: applyingAs[0],
    isInstitutionalInvestor,
    isIntermediaryInvestor
  }
}

export const getCorporateInvestorAgreementsAndDisclosuresFormValues = (
  data: CorporateIdentity | undefined
) => {
  return data?.declarations?.agreements
}
