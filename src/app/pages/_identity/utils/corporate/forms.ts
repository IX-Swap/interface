import { CorporateIdentity, IndividualIdentity } from 'types/identity'
import {
  CorporateInvestorDeclarationFormValues,
  CorporateInvestorTaxDeclarationFormValues,
  IndividualDocumentsFormValues,
  InvestorCorporateInfoFormValues,
  InvestorDirectorsAndBeneficialOwnersFormValues
} from '../../types/forms'

export const getCorporateInfoFormValues = (
  data: CorporateIdentity | undefined
): Partial<InvestorCorporateInfoFormValues> => {
  return {
    companyLegalName: data?.companyLegalName,
    registrationNumber: data?.registrationNumber,
    legalEntityStatus: data?.legalEntityStatus,
    countryOfFormation: data?.countryOfFormation,
    address: data?.companyAddress,
    representatives: []
    // mailingAddress: data.mailingAddress,
    // mailingAddressSameAsRegistered: data.mailingAddressSameAsRegistered
  }
}

export const getDirectorsAndBeneficialOwnersFormValues = (
  data: CorporateIdentity | undefined
): Partial<InvestorDirectorsAndBeneficialOwnersFormValues> => {
  return {
    directors: data?.directors ?? [],
    beneficialOwners: data?.beneficialOwners ?? []
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
  return {
    documents: data?.documents.reduce((result: any, document) => {
      const {
        evidenceOfAccreditation,
        financialDocuments,
        corporateDocuments
      } = result

      if (document.type === 'Evidence Of Accreditation') {
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
}

export const getCorporateInvestorAgreementsAndDisclosuresFormValues = (
  data: CorporateIdentity | undefined
) => {
  return {
    declarations: data?.declarations ?? {}
  }
}
