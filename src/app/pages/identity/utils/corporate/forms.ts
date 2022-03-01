import { LEGAL_ENTITY_STATUS_LIST } from 'components/form/LegalEntityStatusSelect'
import { last } from 'lodash'
import {
  CorporateIdentity,
  CorporateInvestorDeclarationFormValues,
  CorporateInvestorTaxDeclarationFormValues,
  IndividualDocumentsFormValues,
  InvestorCorporateInfoFormValues,
  InvestorDirectorsAndBeneficialOwnersFormValues
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

  return {
    logo: data?.logo,
    companyLegalName: data?.companyLegalName,
    registrationNumber: data?.registrationNumber,
    legalEntityStatus,
    otherLegalEntityStatus,
    countryOfFormation: data?.countryOfFormation,
    companyAddress: data?.companyAddress,
    representatives: data?.representatives,
    mailingAddress: data?.mailingAddress,
    isMailingAddressSame: data?.isMailingAddressSame,
    identityStatus: data?.identityStatus,
    isIncorporated: data?.isIncorporated,
    numberOfBusinessOwners: data?.numberOfBusinessOwners,
    businessActivity: data?.businessActivity,
    sourceOfFund: data?.sourceOfFund
  }
}

export const getDirectorsAndBeneficialOwnersFormValues = (
  data: CorporateIdentity | undefined
): Partial<InvestorDirectorsAndBeneficialOwnersFormValues> => {
  return {
    directors: data?.directors.map(director => {
      return {
        ...director,
        documents: {
          proofOfAddress: director.documents.filter(
            document => document.type === 'Proof of Address'
          ),
          proofOfIdentity: director.documents.filter(
            document => document.type === 'Proof of Identity'
          )
        }
      }
    }),
    beneficialOwners: data?.beneficialOwners.map(director => {
      return {
        ...director,
        documents: {
          proofOfAddress: director.documents.filter(
            document => document.type === 'Proof of Address'
          ),
          proofOfIdentity: director.documents.filter(
            document => document.type === 'Proof of Identity'
          )
        }
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
  return data?.declarations?.investorsStatus ?? {}
}

export const getCorporateInvestorDocumentsFormValues = (
  data: CorporateIdentity | undefined
): IndividualDocumentsFormValues => {
  return data?.documents.reduce((result: any, document) => {
    const { evidenceOfAccreditation, financialDocuments, corporateDocuments } =
      result

    if (document.type === 'Evidence of Accreditation') {
      return {
        ...result,
        evidenceOfAccreditation: Array.isArray(evidenceOfAccreditation)
          ? [...evidenceOfAccreditation, document]
          : [document]
      }
    }

    if (document.type === 'Financial Documents') {
      return {
        ...result,
        financialDocuments: Array.isArray(financialDocuments)
          ? [...financialDocuments, document]
          : [document]
      }
    }

    if (document.type === 'Corporate Documents') {
      return {
        ...result,
        corporateDocuments: Array.isArray(corporateDocuments)
          ? [...corporateDocuments, document]
          : [document]
      }
    }

    return result
  }, {})
}

export const getCorporateInvestorAgreementsAndDisclosuresFormValues = (
  data: CorporateIdentity | undefined
) => {
  return data?.declarations?.agreements
}
