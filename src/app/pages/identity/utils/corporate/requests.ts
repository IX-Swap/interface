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

export const getCorporateSubmitPayload = (values: any) => {
  return {
    logo: values.logo,
    type: values.type,
    companyLegalName: values.companyLegalName,
    registrationNumber: values.registrationNumber,
    countryOfFormation: values.countryOfFormation,
    identityStatus: values.status,
    sourceOfFund: values.sourceOfFund,
    isIncorporated: values.isIncorporated,
    businessActivity: values.businessActivity,
    numberOfBusinessOwners: values.numberOfBusinessOwners,
    legalEntityStatus: values.legalEntityStatus,
    companyAddress: values.companyAddress,
    isMailingAddressSame: values.isMailingAddressSame,
    mailingAddress: values.mailingAddress,
    representatives: values.representatives,
    directors: values.directors,
    beneficialOwners: values.beneficialOwners,
    documents: values.documents.map((item: { _id: any }) => item._id),
    declarations: values.declarations,
    taxResidencies: values.taxResidencies,
    isInstitutionalInvestor: values.isInstitutionalInvestor
  }
}
