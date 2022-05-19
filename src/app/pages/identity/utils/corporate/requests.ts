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
  values: CorporateInvestorDeclarationFormValues
) => {
  return {
    declarations: {
      investorsStatus: values
    }
  }
}

export const getCorporateInvestorDocumentsRequestPayload = (
  values: CorporateInvestorDocumentsFormValues
) => {
  return {
    documents: Object.values(values).reduce<string[]>((result, documents) => {
      if (Array.isArray(documents)) {
        return [...result, ...documents.map(document => document._id)]
      }

      return result
    }, [])
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
