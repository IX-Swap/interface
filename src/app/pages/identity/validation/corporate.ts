import {
  Address,
  BeneficialOwnerFormValues,
  CorporateInvestorAgreementsFormValues,
  CorporateInvestorDeclarationFormValues,
  CorporateInvestorDocumentsFormValues,
  DirectorFormValues,
  InvestorDirectorsAndBeneficialOwnersFormValues,
  RepresentativeFormValues
} from 'app/pages/identity/types/forms'
import {
  addressSchema,
  documentsSchema,
  institutionalInvestorDocumentsSchema,
  emailSchema,
  investorStatusDeclarationItemSchema,
  optInAgreementsDependentValueSchema,
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
            .phone(undefined, 'Must be a valid phone number')
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
            legalEntityStatus: yup
              .string()
              .required(validationMessages.required),
            countryOfFormation: yup
              .string()
              .required(validationMessages.required),
            email: emailSchema.required(validationMessages.required),
            contactNumber: yup
              .string()
              .phone(undefined, 'Must be a valid phone number"')
              .required(validationMessages.required),
            address: addressSchema.required(validationMessages.required),
            // @ts-expect-error
            proofOfIdentity: documentsSchema,
            // @ts-expect-error
            proofOfAddress: documentsSchema
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
            // @ts-expect-error
            proofOfIdentity: documentsSchema,
            // @ts-expect-error
            proofOfAddress: documentsSchema
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
    assets: investorStatusDeclarationItemSchema,
    trustee: investorStatusDeclarationItemSchema,
    accreditedBeneficiaries: investorStatusDeclarationItemSchema,
    accreditedSettlors: investorStatusDeclarationItemSchema,
    accreditedShareholders: investorStatusDeclarationItemSchema,
    partnership: investorStatusDeclarationItemSchema,

    isInstitutionalInvestor: yup.bool(),

    optInAgreements: yup
      .bool()
      .oneOf([true], 'Opt-In Requirement is required')
      .required(validationMessages.required),

    primaryOfferingServices: optInAgreementsDependentValueSchema,
    digitalSecurities: optInAgreementsDependentValueSchema,
    digitalSecuritiesIssuance: optInAgreementsDependentValueSchema,
    allServices: optInAgreementsDependentValueSchema,
    institutionalInvestorDocuments: institutionalInvestorDocumentsSchema,
    // @ts-expect-error
    evidenceOfAccreditation: documentsSchema,
    // @ts-expect-error
    corporateDocuments: documentsSchema,
    // @ts-expect-error
    financialDocuments: documentsSchema
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
  ...corporateTaxDeclarationSchema.fields,
  ...directorsAndBeneficialOwnersSchema.fields,
  ...corporateInvestorStatusDeclarationSchema.fields
})
