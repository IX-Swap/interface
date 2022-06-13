import {
  Address,
  BeneficialOwnerFormValues,
  CorporateInvestorAgreementsFormValues,
  CorporateInvestorDeclarationFormValues,
  CorporateInvestorDocumentsFormValues,
  DirectorFormValues,
  DocumentFieldArrayItemValue,
  InvestorDirectorsAndBeneficialOwnersFormValues,
  RepresentativeFormValues
} from 'app/pages/identity/types/forms'
import { DataroomFile, FormArrayElement } from 'types/dataroomFile'
import {
  addressSchema,
  documentsSchema,
  emailSchema,
  taxIdentificationNumberSchema,
  validationMessages
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
    .required(validationMessages.required)
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
    otherwise: taxIdentificationNumberSchema.required(
      validationMessages.required
    )
  }),
  legalEntityStatus: yup.string().required(validationMessages.required),
  otherLegalEntityStatus: yup.string().when('legalEntityStatus', {
    is: 'others',
    then: yup.string().required(validationMessages.required),
    otherwise: yup.string()
  }),
  countryOfFormation: yup.string().required(validationMessages.required),
  companyAddress: addressSchema.required(validationMessages.required),
  isMailingAddressSame: yup.bool().required(validationMessages.required),
  mailingAddress: yup.object<Address>().when('isMailingAddressSame', {
    is: false,
    then: addressSchema.required(validationMessages.required),
    otherwise: yup.object().notRequired()
  }),
  representatives: yup
    .array<RepresentativeFormValues>()
    .of(
      yup
        .object<RepresentativeFormValues>({
          fullName: yup
            .string()
            .required(validationMessages.required)
            .matches(/^[a-zA-Z\s]+$/g, 'Must include letters only'),
          designation: yup
            .string()
            .required(validationMessages.required)
            .matches(/^[a-zA-Z\s]+$/g, 'Must include letters only'),
          email: emailSchema.required(validationMessages.required),
          contactNumber: yup
            .string()
            .phone()
            .required(validationMessages.required),
          // @ts-expect-error
          documents: documentsSchema
        })
        .required(validationMessages.required)
    )
    .required(validationMessages.required),
  sourceOfFund: yup.string().required(validationMessages.required),
  numberOfBusinessOwners: yup.string().required(validationMessages.required),
  businessActivity: yup.string().required(validationMessages.required)
})

export const directorsAndBeneficialOwnersSchema = yup
  .object()
  .shape<InvestorDirectorsAndBeneficialOwnersFormValues>({
    directors: yup
      .array<DirectorFormValues>()
      .of(
        yup
          .object<DirectorFormValues>({
            fullName: yup.string().required(validationMessages.required),
            designation: yup.string().required(validationMessages.required),
            email: emailSchema.required(validationMessages.required),
            contactNumber: yup
              .string()
              .phone()
              .required(validationMessages.required),
            address: addressSchema.required(validationMessages.required),
            proofOfIdentity: yup
              .array<DocumentFieldArrayItemValue>()
              .required(validationMessages.required),
            proofOfAddress: yup
              .array<DocumentFieldArrayItemValue>()
              .required(validationMessages.required)
          })
          .required(validationMessages.required)
      )
      .required(validationMessages.required),
    beneficialOwners: yup
      .array<BeneficialOwnerFormValues>()
      .of(
        yup
          .object<BeneficialOwnerFormValues>({
            fullName: yup.string().required(validationMessages.required),
            percentageShareholding: yup
              .number()
              .transform((value, originalValue) => {
                return originalValue === '' ? undefined : value
              })
              .typeError('Percentage shareholding must be a number')
              .required(validationMessages.required),
            proofOfIdentity: yup
              .array<DocumentFieldArrayItemValue>()
              .required(validationMessages.required),
            proofOfAddress: yup
              .array<DocumentFieldArrayItemValue>()
              .required(validationMessages.required)
          })
          .required(validationMessages.required)
      )
      .required(validationMessages.required)
  })

export const corporateTaxDeclarationSchema = yup.object().shape({
  taxResidencies: yup.array().of(
    yup
      .object({
        taxIdAvailable: yup.boolean(),
        countryOfResidence: yup.string().required(validationMessages.required),
        taxIdentificationNumber: taxIdentificationNumberSchema.when(
          'taxIdAvailable',
          {
            is: true,
            then: taxIdentificationNumberSchema.required(
              validationMessages.required
            ),
            otherwise: taxIdentificationNumberSchema
          }
        ),
        reason: yup.string().when('taxIdAvailable', {
          is: false,
          then: yup
            .string()
            .oneOf(['A', 'B', 'C'])
            .required(validationMessages.required),
          otherwise: yup.string()
        }),
        customReason: yup.string().when('reason', {
          is: 'B',
          then: yup.string().required(validationMessages.required),
          otherwise: yup.string()
        })
      })
      .required(validationMessages.required)
  )
})

export const corporateInvestorStatusDeclarationSchema = yup
  .object()
  .shape<
    CorporateInvestorDeclarationFormValues &
      CorporateInvestorDocumentsFormValues
  >({
    assets: yup
      .bool()
      .oneOf([true, false])
      .required(validationMessages.required),
    trustee: yup
      .bool()
      .oneOf([true, false])
      .required(validationMessages.required),
    accreditedBeneficiaries: yup
      .bool()
      .oneOf([true, false])
      .required(validationMessages.required),
    accreditedSettlors: yup
      .bool()
      .oneOf([true, false])
      .required(validationMessages.required),
    accreditedShareholders: yup
      .bool()
      .oneOf([true, false])
      .required(validationMessages.required),
    partnership: yup
      .bool()
      .oneOf([true, false])
      .required(validationMessages.required),

    optInAgreements: yup
      .bool()
      .oneOf([true], 'Opt-In Requirement is required')
      .required(validationMessages.required),

    primaryOfferingServices: yup.bool(),
    digitalSecurities: yup.bool(),
    digitalSecuritiesIssuance: yup.bool(),
    allServices: yup.bool(),
    evidenceOfAccreditation: yup
      .array<FormArrayElement<DataroomFile>>()
      .min(1)
      .required(validationMessages.required),
    corporateDocuments: yup
      .array<FormArrayElement<DataroomFile>>()
      .min(1)
      .required(validationMessages.required),
    financialDocuments: yup
      .array<FormArrayElement<DataroomFile>>()
      .min(1)
      .required(validationMessages.required)
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
      .array<FormArrayElement<DataroomFile>>()
      .min(1)
      .required(validationMessages.required),
    corporateDocuments: yup
      .array<FormArrayElement<DataroomFile>>()
      .min(1)
      .required(validationMessages.required),
    financialDocuments: yup
      .array<FormArrayElement<DataroomFile>>()
      .min(1)
      .required(validationMessages.required)
  })

export const corporateIssuerDocumentsSchema = yup.object().shape({
  corporateDocuments: yup
    .array<DataroomFile>()
    .min(1)
    .required(validationMessages.required),
  financialDocuments: yup
    .array<DataroomFile>()
    .min(1)
    .required(validationMessages.required)
})

export const corporateInvestorAgreementsSchema = yup
  .object()
  .shape<CorporateInvestorAgreementsFormValues>({
    custody: yup.bool().oneOf([true]).required(validationMessages.required),
    investor: yup.bool().oneOf([true]).required(validationMessages.required),
    disclosure: yup.bool().oneOf([true]).required(validationMessages.required)
  })

export const corporateInvestorSchema = yup.object().shape<any>({
  ...corporateInvestorInfoSchema.fields,
  ...corporateIssuerDocumentsSchema.fields,
  ...corporateTaxDeclarationSchema.fields,
  ...directorsAndBeneficialOwnersSchema.fields
})
