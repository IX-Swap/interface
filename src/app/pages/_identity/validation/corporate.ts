import {
  BeneficialOwnerFormValues,
  CorporateInvestorAgreementsFormValues,
  CorporateInvestorDeclarationFormValues,
  CorporateInvestorDocumentsFormValues,
  DirectorFormValues,
  InvestorCorporateInfoFormValues,
  InvestorDirectorsAndBeneficialOwnersFormValues,
  RepresentativeFormValues
} from 'app/pages/_identity/types/forms'
import { DataroomFile } from 'types/dataroomFile'
import { addressSchema } from 'validation/shared'
import * as yup from 'yup'

export const corporateInvestorInfoSchema = yup
  .object()
  .shape<InvestorCorporateInfoFormValues>({
    logo: yup.string(),
    companyLegalName: yup.string().required('Required'),
    registrationNumber: yup.string().required('Required'),
    legalEntityStatus: yup.string().required('Required'),
    otherLegalEntityStatus: yup.string().when('legalEntityStatus', {
      is: 'others',
      then: yup.string().required('Required'),
      otherwise: yup.string()
    }),
    countryOfFormation: yup.string().required('Required'),
    companyAddress: addressSchema.required('Required'),
    mailingAddress: addressSchema.required('Required'),
    isMailingAddressSame: yup.bool().required('Required'),
    representatives: yup
      .array<RepresentativeFormValues>()
      .of(
        yup
          .object<RepresentativeFormValues>({
            fullName: yup.string().required('Required'),
            designation: yup.string().required('Required'),
            email: yup.string().required('Required'),
            contactNumber: yup.string().required('Required'),
            documents: yup.array<DataroomFile>().required('Required')
          })
          .required('Required')
      )
      .required('Required')
  })

export const directorsAndBeneficialOwnersSchema = yup
  .object()
  .shape<InvestorDirectorsAndBeneficialOwnersFormValues>({
    directors: yup
      .array<DirectorFormValues>()
      .of(
        yup
          .object<DirectorFormValues>({
            fullName: yup.string().required('Required'),
            designation: yup.string().required('Required'),
            email: yup.string().required('Required'),
            contactNumber: yup.string().required('Required'),
            address: addressSchema.required('Required'),
            documents: yup
              .object({
                proofOfIdentity: yup.array<DataroomFile>().required('Required'),
                proofOfAddress: yup.array<DataroomFile>().required('Required')
              })
              .required('Required')
          })
          .required('Required')
      )
      .required('Required'),
    beneficialOwners: yup
      .array<BeneficialOwnerFormValues>()
      .of(
        yup
          .object<BeneficialOwnerFormValues>({
            fullName: yup.string().required('Required'),
            percentageShareholding: yup.number().required('Required'),
            documents: yup
              .object({
                proofOfIdentity: yup.array<DataroomFile>().required('Required'),
                proofOfAddress: yup.array<DataroomFile>().required('Required')
              })
              .required('Required')
          })
          .required('Required')
      )
      .required('Required')
  })

export const corporateTaxDeclarationSchema = yup.object().shape({
  taxResidencies: yup.array().of(
    yup
      .object({
        taxIdAvailable: yup.boolean(),
        countryOfResidence: yup.string().required('Required'),
        taxIdentificationNumber: yup.string().when('taxIdAvailable', {
          is: true,
          then: yup.string().required('Required'),
          otherwise: yup.string()
        }),
        reason: yup.string().when('taxIdAvailable', {
          is: false,
          then: yup.string().oneOf(['A', 'B', 'C']).required('Required'),
          otherwise: yup.string()
        }),
        customReason: yup.string().when('reason', {
          is: 'B',
          then: yup.string().required('Required'),
          otherwise: yup.string()
        })
      })
      .required()
  )
})

export const corporateInvestorStatusDeclarationSchema = yup
  .object()
  .shape<CorporateInvestorDeclarationFormValues>({
    assets: yup.bool().oneOf([true]).required('Required'),
    trustee: yup.bool().oneOf([true]).required('Required'),
    accreditedBeneficiaries: yup.bool().oneOf([true]).required('Required'),
    accreditedSettlors: yup.bool().oneOf([true]).required('Required'),
    accreditedShareholders: yup.bool().oneOf([true]).required('Required'),
    partnership: yup.bool().oneOf([true]).required('Required'),

    rightToOptOut: yup.bool().oneOf([true]).required('Required'),
    consent: yup.bool().oneOf([true]).required('Required'),
    consequencesOfQualification: yup.bool().oneOf([true]).required('Required')
  })

export const corporateInvestorDocumentsSchema = yup
  .object()
  .shape<CorporateInvestorDocumentsFormValues>({
    evidenceOfAccreditation: yup
      .array<DataroomFile>()
      .min(1)
      .required('Required'),
    corporateDocuments: yup.array<DataroomFile>().min(1).required('Required'),
    financialDocuments: yup.array<DataroomFile>().min(1).required('Required')
  })

export const corporateInvestorAgreementsSchema = yup
  .object()
  .shape<CorporateInvestorAgreementsFormValues>({
    custody: yup.bool().oneOf([true]).required('Required'),
    investor: yup.bool().oneOf([true]).required('Required'),
    disclosure: yup.bool().oneOf([true]).required('Required')
  })
