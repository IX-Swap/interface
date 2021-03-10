import {
  CorporateInvestorDeclarationFormValues,
  CorporateInvestorDocumentsFormValues,
  IndividualDocumentsFormValues,
  IndividualInvestorDeclarationFormValues,
  InvestorDirectorsAndBeneficialOwnersFormValues
} from '../../types/forms'
import { AgreementsAndDisclosures } from '../../../../../types/identity'

export const getCorporateInfoRequestPayload = (data: any) => {
  delete data.otherLegalEntityStatus

  return {
    ...data
  }
}

export const getDirectorsAndBeneficialOwnerRequestPayload = (
  data: InvestorDirectorsAndBeneficialOwnersFormValues
) => {
  return {
    ...data
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
    documents: Object.values(values.documents).reduce<string[]>(
      (result, documents) => {
        if (Array.isArray(documents)) {
          return [...result, ...documents.map(document => document._id)]
        }

        return result
      },
      []
    )
  }
}

export const getCorporateInvestorAgreementsRequestPayload = (
  values: AgreementsAndDisclosures
) => {
  return values
}
