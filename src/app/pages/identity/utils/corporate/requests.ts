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
  const { otherLegalEntityStatus, legalEntityStatus, logo, ...rest } = data
  const customLegalEntityStatus =
    otherLegalEntityStatus !== undefined && otherLegalEntityStatus.trim() !== ''

  return {
    ...rest,
    logo: (logo as DataroomFile)?._id,
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
        documents: Object.values(director.documents).reduce(
          (result, values) => [...result, ...values],
          []
        )
      }
    }),
    beneficialOwners: beneficialOwners.map(beneficialOwner => {
      return {
        ...beneficialOwner,
        documents: Object.values(beneficialOwner.documents).reduce(
          (result, values) => [...result, ...values],
          []
        )
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
