import * as yup from 'yup'
import 'yup-phone-lite'
import {
  addressSchema,
  emailSchema,
  nameSchema,
  birthdaySchema,
  taxIdentificationNumberSchema,
  validationMessages,
  documentsSchema
} from 'validation/shared'
import {
  IndividualAgreementsFormValues,
  IdentityDocumentsFormValues,
  IndividualFinancialInfoFormValues,
  IndividualPersonalInfoFormValues,
  IndividualTaxDeclarationFormValues,
  TaxResidency
} from 'app/pages/identity/types/forms'
import { corporateName } from 'validation/regexes'

export const personalInfoSchema = yup
  .object()
  .shape<IndividualPersonalInfoFormValues>({
    photo: yup.string(),
    firstName: nameSchema.required(validationMessages.required),
    middleName: nameSchema,
    lastName: nameSchema.required(validationMessages.required),
    nationality: yup.string().required(validationMessages.required),
    dob: birthdaySchema.required(validationMessages.required),
    contactNumber: yup
      .string()
      .phone(undefined, 'Must be a valid phone number')
      .required(validationMessages.required),
    email: emailSchema.required(validationMessages.required),
    address: addressSchema.required(validationMessages.required),
    gender: yup.string().required(validationMessages.required),
    nric: yup.string().when('nationality', {
      is: 'Singapore',
      then: yup
        .string()
        .max(12, 'Maximum of 12 characters')
        .required(validationMessages.required),
      otherwise: yup.string()
    })
  })

export const financialInfoSchema = yup
  .object()
  .shape<IndividualFinancialInfoFormValues>({
    occupation: yup.string().required(validationMessages.required),
    employer: yup
      .string()
      .max(50, 'Maximum of 50 characters')
      .matches(
        corporateName,
        "Must include only letters, numbers and these special characters . , - ; & '"
      )
      .required('This field is required'),
    employmentStatus: yup.string().required(validationMessages.required),
    sourceOfFund: yup.string().required(validationMessages.required)
  })

export const taxDeclarationSchema = yup
  .object()
  .shape<IndividualTaxDeclarationFormValues>({
    singaporeOnly: yup
      .string()
      .oneOf(['yes', 'no'])
      .required(validationMessages.required),
    fatca: yup
      .string()
      .oneOf(['yes', 'no'])
      .required(validationMessages.required),
    taxResidencies: yup
      .array<TaxResidency>()
      .when('singaporeOnly', {
        is: 'yes',
        then: yup.array().of(
          yup.object({
            taxIdentificationNumber: taxIdentificationNumberSchema
              .required(validationMessages.required)
              .test(
                'nric',
                'Invalid FIN/NRIC',
                function (value: string | null | undefined) {
                  if (value === undefined || value === null) {
                    return false
                  }

                  const isValid = /^[STFG]\d{7}[A-Z]$/.test(value)
                  return isValid
                }
              )
          })
        ),
        otherwise: yup.array().of(
          yup
            .object({
              taxIdAvailable: yup.boolean(),
              countryOfResidence: yup
                .string()
                .required(validationMessages.required),
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
      .required(validationMessages.required)
  })

export const individualInvestorStatusDeclarationSchema = yup
  .object()
  .shape<any>({
    financialAsset: yup.bool().required(validationMessages.required),
    income: yup.bool().required(validationMessages.required),
    personalAssets: yup.bool().required(validationMessages.required),
    jointlyHeldAccount: yup.bool().required(validationMessages.required),

    optInAgreementsSafeguards: yup
      .bool()
      .oneOf([true], 'Opt-In Requirement is required')
      .required(validationMessages.required),

    optInAgreementsOptOut: yup
      .bool()
      .oneOf([true], 'Opt-In Requirement is required')
      .required(validationMessages.required),

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
            key === 'financialAsset' ||
            key === 'income' ||
            key === 'personalAssets' ||
            key === 'jointlyHeldAccount'
          )
        })
        .map(([_key, value]) => value)

      const result = financialDeclarations.every(value => value === false)

      return !result
    }
  )

export const individualInvestorDocumentsSchema = yup
  .object()
  .shape<IdentityDocumentsFormValues>({
    // @ts-expect-error
    evidenceOfAccreditation: documentsSchema,
    // @ts-expect-error
    proofOfAddress: documentsSchema,
    // @ts-expect-error
    proofOfIdentity: documentsSchema
  })

export const individualInvestorAgreementsSchema = yup
  .object()
  .shape<IndividualAgreementsFormValues>({
    custody: yup.bool().oneOf([true]).required(validationMessages.required),
    investor: yup.bool().oneOf([true]).required(validationMessages.required),
    disclosure: yup.bool().oneOf([true]).required(validationMessages.required)
  })

export const individualInvestorValidationSchema = yup.object().shape<any>({
  ...financialInfoSchema.fields,
  ...individualInvestorDocumentsSchema.fields,
  ...individualInvestorStatusDeclarationSchema.fields,
  ...personalInfoSchema.fields,
  ...taxDeclarationSchema.fields
})

export const financialAndTaxDeclarationSchema = yup.object().shape<any>({
  ...financialInfoSchema.fields,
  ...taxDeclarationSchema.fields
})
