import {
  Address,
  BeneficialOwnerFormValues,
  CorporateInvestorAgreementsFormValues,
  CorporateInvestorDocumentsFormValues,
  DirectorFormValues,
  InvestorDirectorsAndBeneficialOwnersFormValues,
  RepresentativeFormValues
} from 'app/pages/identity/types/forms'
import { DataroomFile } from 'types/dataroomFile'
import { addressSchema } from 'validation/shared'
import * as yup from 'yup'
import { validateUEN } from 'validation/validators'

// TODO: change to InvestorCorporateInfoFormValues (currently getting TS2589)
export const corporateInvestorInfoSchema = yup.object().shape<any>({
  logo: yup.string(),
  companyLegalName: yup
    .string()
    .matches(
      /^[a-zA-Z0-9. , -?]*$/,
      'Must have only letters, numbers and this characters.,-'
    )
    .required('Required'),
  registrationNumber: yup.string().when('countryOfFormation', {
    is: 'Singapore',
    then: yup.string().test('validateUEN', 'Must be UEN', function (value) {
      const error = validateUEN(value)
      if (typeof error === 'string') {
        return new yup.ValidationError(error, value, 'registrationNumber')
      }
      return true
    }),
    otherwise: yup.string().required('Required')
  }),
  legalEntityStatus: yup.string().required('Required'),
  otherLegalEntityStatus: yup.string().when('legalEntityStatus', {
    is: 'others',
    then: yup.string().required('Required'),
    otherwise: yup.string()
  }),
  countryOfFormation: yup.string().required('Required'),
  companyAddress: addressSchema.required('Required'),
  isMailingAddressSame: yup.bool().required('Required'),
  mailingAddress: yup.object<Address>().when('isMailingAddressSame', {
    is: false,
    then: addressSchema.required('Required'),
    otherwise: yup.object().notRequired()
  }),
  representatives: yup
    .array<RepresentativeFormValues>()
    .of(
      yup
        .object<RepresentativeFormValues>({
          fullName: yup
            .string()
            .required('Required')
            .matches(/^[a-zA-Z\s]+$/g, 'Must have letters only'),
          designation: yup
            .string()
            .required('Required')
            .matches(/^[a-zA-Z\s]+$/g, 'Must have letters only'),
          email: yup
            .string()
            .email('Must have email format')
            .required('Required'),
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
  .shape<any>({
    assets: yup.bool().oneOf([true, false]).required('Required'),
    trustee: yup.bool().oneOf([true, false]).required('Required'),
    accreditedBeneficiaries: yup
      .bool()
      .oneOf([true, false])
      .required('Required'),
    accreditedSettlors: yup.bool().oneOf([true, false]).required('Required'),
    accreditedShareholders: yup
      .bool()
      .oneOf([true, false])
      .required('Required'),
    partnership: yup.bool().oneOf([true, false]).required('Required'),

    optInAgreements: yup
      .bool()
      .oneOf([true], 'Opt-In Requirement is required')
      .required('Required'),

    primaryOfferingServices: yup.bool(),
    digitalSecurities: yup.bool(),
    digitalSecuritiesIssuance: yup.bool(),
    allServices: yup.bool()
  })
  .test(
    'investorDeclarations',
    'Please choose at least one option under "Investor Status Declaration" section',
    function (values) {
      if (values === undefined || values === null) {
        return false
      }

      const financialDeclarations = Object.entries(values)
        .filter(([key]) => {
          return (
            key === 'assets' ||
            key === 'trustee' ||
            key === 'accreditedBeneficiaries' ||
            key === 'accreditedSettlors' ||
            key === 'accreditedShareholders' ||
            key === 'partnership'
          )
        })
        .map(([_key, value]) => value)

      const result = financialDeclarations.every(value => value === false)

      return !result
    }
  )

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

export const corporateIssuerDocumentsSchema = yup.object().shape({
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
