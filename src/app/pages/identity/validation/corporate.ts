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
import {
  addressSchema,
  emailSchema,
  taxIdentificationNumberSchema
} from 'validation/shared'
import * as yup from 'yup'
import 'yup-phone-lite'
import { validateUEN } from 'validation/validators'

// TODO: change to InvestorCorporateInfoFormValues (currently getting TS2589)
export const corporateInvestorInfoSchema = yup.object().shape<any>({
  logo: yup.string(),
  companyLegalName: yup
    .string()
    .max(50, 'Maximum of 50 characters')
    .required('This field is required')
    .matches(
      /^[a-zA-Z0-9.,-;]+([a-zA-Z0-9.,-; ]+)*$/,
      'Must include only letters, numbers and this special characters . , -'
    ),

  registrationNumber: yup.string().when('countryOfFormation', {
    is: 'Singapore',
    then: taxIdentificationNumberSchema.test(
      'validateUEN',
      'Must be a valid UEN',
      function (value) {
        const error = validateUEN(value)
        if (typeof error === 'string') {
          return new yup.ValidationError(error, value, 'registrationNumber')
        }
        return true
      }
    ),
    otherwise: taxIdentificationNumberSchema.required('This field is required')
  }),
  legalEntityStatus: yup.string().required('This field is required'),
  otherLegalEntityStatus: yup.string().when('legalEntityStatus', {
    is: 'others',
    then: yup.string().required('This field is required'),
    otherwise: yup.string()
  }),
  countryOfFormation: yup.string().required('This field is required'),
  companyAddress: addressSchema.required('This field is required'),
  isMailingAddressSame: yup.bool().required('This field is required'),
  mailingAddress: yup.object<Address>().when('isMailingAddressSame', {
    is: false,
    then: addressSchema.required('This field is required'),
    otherwise: yup.object().notRequired()
  }),
  representatives: yup
    .array<RepresentativeFormValues>()
    .of(
      yup
        .object<RepresentativeFormValues>({
          fullName: yup
            .string()
            .required('This field is required')
            .matches(/^[a-zA-Z\s]+$/g, 'Must include letters only'),
          designation: yup
            .string()
            .required('This field is required')
            .matches(/^[a-zA-Z\s]+$/g, 'Must include letters only'),
          email: emailSchema.required('This field is required'),
          contactNumber: yup
            .string()
            .phone()
            .required('This field is required'),
          documents: yup
            .array<DataroomFile>()
            .required('This field is required')
        })
        .required('This field is required')
    )
    .required('This field is required')
})

export const directorsAndBeneficialOwnersSchema = yup
  .object()
  .shape<InvestorDirectorsAndBeneficialOwnersFormValues>({
    directors: yup
      .array<DirectorFormValues>()
      .of(
        yup
          .object<DirectorFormValues>({
            fullName: yup.string().required('This field is required'),
            designation: yup.string().required('This field is required'),
            email: emailSchema.required('This field is required'),
            contactNumber: yup.string().phone().required(),
            address: addressSchema.required('This field is required'),
            documents: yup
              .object({
                proofOfIdentity: yup
                  .array<DataroomFile>()
                  .required('This field is required'),
                proofOfAddress: yup
                  .array<DataroomFile>()
                  .required('This field is required')
              })
              .required('This field is required')
          })
          .required('This field is required')
      )
      .required('This field is required'),
    beneficialOwners: yup
      .array<BeneficialOwnerFormValues>()
      .of(
        yup
          .object<BeneficialOwnerFormValues>({
            fullName: yup.string().required('This field is required'),
            percentageShareholding: yup
              .number()
              .typeError('Percentage shareholding must be a number')
              .required('This field is required'),
            documents: yup
              .object({
                proofOfIdentity: yup
                  .array<DataroomFile>()
                  .required('This field is required'),
                proofOfAddress: yup
                  .array<DataroomFile>()
                  .required('This field is required')
              })
              .required('This field is required')
          })
          .required('This field is required')
      )
      .required('This field is required')
  })

export const corporateTaxDeclarationSchema = yup.object().shape({
  taxResidencies: yup.array().of(
    yup
      .object({
        taxIdAvailable: yup.boolean(),
        countryOfResidence: yup.string().required('This field is required'),
        taxIdentificationNumber: taxIdentificationNumberSchema.when(
          'taxIdAvailable',
          {
            is: true,
            then: taxIdentificationNumberSchema.required(
              'This field is required'
            ),
            otherwise: taxIdentificationNumberSchema
          }
        ),
        reason: yup.string().when('taxIdAvailable', {
          is: false,
          then: yup
            .string()
            .oneOf(['A', 'B', 'C'])
            .required('This field is required'),
          otherwise: yup.string()
        }),
        customReason: yup.string().when('reason', {
          is: 'B',
          then: yup.string().required('This field is required'),
          otherwise: yup.string()
        })
      })
      .required()
  )
})

export const corporateInvestorStatusDeclarationSchema = yup
  .object()
  .shape<any>({
    assets: yup.bool().oneOf([true, false]).required('This field is required'),
    trustee: yup.bool().oneOf([true, false]).required('This field is required'),
    accreditedBeneficiaries: yup
      .bool()
      .oneOf([true, false])
      .required('This field is required'),
    accreditedSettlors: yup
      .bool()
      .oneOf([true, false])
      .required('This field is required'),
    accreditedShareholders: yup
      .bool()
      .oneOf([true, false])
      .required('This field is required'),
    partnership: yup
      .bool()
      .oneOf([true, false])
      .required('This field is required'),

    optInAgreements: yup
      .bool()
      .oneOf([true], 'Opt-In Requirement is required')
      .required('This field is required'),

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
      .required('This field is required'),
    corporateDocuments: yup
      .array<DataroomFile>()
      .min(1)
      .required('This field is required'),
    financialDocuments: yup
      .array<DataroomFile>()
      .min(1)
      .required('This field is required')
  })

export const corporateIssuerDocumentsSchema = yup.object().shape({
  corporateDocuments: yup
    .array<DataroomFile>()
    .min(1)
    .required('This field is required'),
  financialDocuments: yup
    .array<DataroomFile>()
    .min(1)
    .required('This field is required')
})

export const corporateInvestorAgreementsSchema = yup
  .object()
  .shape<CorporateInvestorAgreementsFormValues>({
    custody: yup.bool().oneOf([true]).required('This field is required'),
    investor: yup.bool().oneOf([true]).required('This field is required'),
    disclosure: yup.bool().oneOf([true]).required('This field is required')
  })
