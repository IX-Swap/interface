import { DataroomFile } from 'types/dataroomFile'
import {
  AgreementsAndDisclosures,
  CorporateInvestorDeclarationFormValues,
  CorporateInvestorDocumentsFormValues,
  InvestorCorporateInfoFormValues,
  InvestorDirectorsAndBeneficialOwnersFormValues
} from '../../types/forms'

export const getCorporateInfoRequestPayload = (
  data: InvestorCorporateInfoFormValues
) => {
  const {
    otherLegalEntityStatus,
    legalEntityStatus,
    logo,
    representatives,
    sourceOfFund,
    ...rest
  } = data
  const customLegalEntityStatus =
    otherLegalEntityStatus !== undefined && otherLegalEntityStatus.trim() !== ''

  const representativesTransformed = representatives.map(rep => ({
    ...rep,
    documents: rep.documents?.map(doc => ({ ...doc.value }))
  }))

  return {
    ...rest,
    sourceOfFund: sourceOfFund.toUpperCase(),
    logo: (logo as DataroomFile)?._id,
    representatives: representativesTransformed,
    legalEntityStatus: customLegalEntityStatus
      ? otherLegalEntityStatus
      : legalEntityStatus
  }
}

export const getDirectorsAndBeneficialOwnerRequestPayload = (
  data: InvestorDirectorsAndBeneficialOwnersFormValues
) => {
  const { directors, beneficialOwners } = data

  return {
    directors: directors.map(director => {
      return {
        ...director,
        documents: [
          ...(director.proofOfAddress?.map(doc => ({ ...doc.value })) ?? []),
          ...(director.proofOfIdentity?.map(doc => ({ ...doc.value })) ?? [])
        ]
      }
    }),
    beneficialOwners: beneficialOwners.map(beneficialOwner => {
      return {
        ...beneficialOwner,
        documents: [
          ...(beneficialOwner.proofOfAddress?.map(doc => ({ ...doc.value })) ??
            []),
          ...(beneficialOwner.proofOfIdentity?.map(doc => ({ ...doc.value })) ??
            [])
        ]
      }
    })
  }
}

export const getCorporateInvestorDeclarationRequestPayload = (
  values: CorporateInvestorDeclarationFormValues &
    CorporateInvestorDocumentsFormValues
) => {
  const documents = Object.values(values).reduce<
    Array<{ value: DataroomFile }>
  >((result, docs) => {
    if (Array.isArray(docs)) {
      return [...result, ...docs.map(document => document.value._id)]
    }

    return result
  }, [])

  const isInstitutionalInvestor = values.isInstitutionalInvestor

  return {
    declarations: {
      investorsStatus: values
    },
    documents: documents.filter(doc => doc !== undefined),
    isInstitutionalInvestor: isInstitutionalInvestor
  }
}

export const getCorporateInvestorAgreementsRequestPayload = (
  values: AgreementsAndDisclosures
) => {
  return {
    declarations: {
      agreements: values
    }
  }
}
