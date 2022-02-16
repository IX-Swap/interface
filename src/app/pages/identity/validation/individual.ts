import * as yup from 'yup'
import 'yup-phone-lite'
import {
  addressSchema,
  emailSchema,
  nameSchema,
  birthdaySchema,
  taxIdentificationNumberSchema
} from 'validation/shared'
import {
  FundSource,
  IndividualAgreementsFormValues,
  IndividualDocumentsFormValues,
  IndividualFinancialInfoFormValues,
  IndividualPersonalInfoFormValues,
  IndividualTaxDeclarationFormValues,
  TaxResidency
} from 'app/pages/identity/types/forms'
import { DataroomFile } from 'types/dataroomFile'

export const personalInfoSchema = yup
  .object()
  .shape<IndividualPersonalInfoFormValues>({
    photo: yup.string(),
    firstName: nameSchema.required('This field is required'),
    middleName: nameSchema,
    lastName: nameSchema.required('This field is required'),
    nationality: yup.string().required('This field is required'),
    dob: birthdaySchema.required('This field is required'),
    contactNumber: yup.string().phone().required('This field is required'),
    email: emailSchema.required('This field is required'),
    address: addressSchema.required('This field is required')
  })

export const financialInfoSchema = yup
  .object()
  .shape<IndividualFinancialInfoFormValues>({
    occupation: yup
      .string()
      .max(50, 'Maximum of 50 characters')
      .required('This field is required')
      .matches(/^[a-zA-Z\s]+$/g, 'Must include letters only'),
    employer: yup
      .string()
      .max(50, 'Maximum of 50 characters')
      .required('This field is required'),
    employmentStatus: yup.string().required('This field is required'),
    annualIncome: yup.string().required('This field is required'),
    sourceOfFund: yup
      .array<FundSource>()
      .of(
        yup
          .object<FundSource>({
            name: yup.string(),
            checked: yup.boolean(),
            value: yup
              .number()
              .when('checked', {
                is: true,
                then: yup
                  .number()
                  .min(1)
                  .max(100)
                  .required('This field is required'),
                otherwise: yup.number()
              })
              .required('This field is required')
          })
          .required()
      )
      .test('noFundSourceSelected', 'Error', function (value) {
        return Boolean(value?.some(fundSource => fundSource.checked))
      })
      .test('incorrectSumOfFundSourcesValues', 'Error', fundSources => {
        const sumOfFundSourcesValues =
          fundSources !== undefined && fundSources !== null
            ? fundSources.reduce((acc, cur) => acc + cur.value, 0)
            : 0
        return sumOfFundSourcesValues === 100
      })
      .required('This field is required')
  })

export const taxDeclarationSchema = yup
  .object()
  .shape<IndividualTaxDeclarationFormValues>({
    singaporeOnly: yup
      .string()
      .oneOf(['yes', 'no'])
      .required('This field is required'),
    fatca: yup.string().oneOf(['yes', 'no']).required('This field is required'),
    taxResidencies: yup
      .array<TaxResidency>()
      .when('singaporeOnly', {
        is: 'yes',
        then: yup.array().of(
          yup.object({
            taxIdentificationNumber: taxIdentificationNumberSchema
              .required('This field is required')
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
                .required('This field is required'),
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
      .required()
  })

export const individualInvestorStatusDeclarationSchema = yup
  .object()
  .shape<any>({
    financialAsset: yup.bool().required('This field is required'),
    income: yup.bool().required('This field is required'),
    personalAssets: yup.bool().required('This field is required'),
    jointlyHeldAccount: yup.bool().required('This field is required'),

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
  .shape<IndividualDocumentsFormValues>({
    evidenceOfAccreditation: yup
      .array<DataroomFile>()
      .min(1)
      .required('This field is required'),
    proofOfAddress: yup
      .array<DataroomFile>()
      .min(1)
      .required('This field is required'),
    proofOfIdentity: yup
      .array<DataroomFile>()
      .min(1)
      .required('This field is required')
  })

export const individualInvestorAgreementsSchema = yup
  .object()
  .shape<IndividualAgreementsFormValues>({
    custody: yup.bool().oneOf([true]).required('This field is required'),
    investor: yup.bool().oneOf([true]).required('This field is required'),
    disclosure: yup.bool().oneOf([true]).required('This field is required')
  })
