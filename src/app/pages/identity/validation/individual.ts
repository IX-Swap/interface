import * as yup from 'yup'
import 'yup-phone'
import { addressSchema, dateSchema, emailSchema } from 'validation/shared'
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
    firstName: yup.string().required('Required'),
    middleName: yup.string(),
    lastName: yup.string().required('Required'),
    nationality: yup.string().required('Required'),
    dob: dateSchema.required('Required'),
    contactNumber: yup.string().phone().required('Required'),
    email: emailSchema.required('Required'),
    address: addressSchema.required('Required')
  })

export const financialInfoSchema = yup
  .object()
  .shape<IndividualFinancialInfoFormValues>({
    occupation: yup.string().required('Required'),
    employer: yup.string().required('Required'),
    employmentStatus: yup.string().required('Required'),
    annualIncome: yup.string().required('Required'),
    fundMajority: yup.string().oneOf(['yes', 'no']).required('Required'),
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
                then: yup.number().min(1).max(100).required('Required'),
                otherwise: yup.number()
              })
              .required('Required')
          })
          .required()
      )
      .test('noFundSourceSelected', 'Error', function (value) {
        return Boolean(value?.some(fundSource => fundSource.checked))
      })
      .required('Required')
  })

export const taxDeclarationSchema = yup
  .object()
  .shape<IndividualTaxDeclarationFormValues>({
    singaporeOnly: yup.string().oneOf(['yes', 'no']).required('Required'),
    fatca: yup.string().oneOf(['yes', 'no']).required('Required'),
    taxResidencies: yup
      .array<TaxResidency>()
      .when('singaporeOnly', {
        is: 'yes',
        then: yup.array().of(
          yup.object({
            taxIdentificationNumber: yup
              .string()
              .required('Required')
              .test('nric', 'Invalid FIN/NRIC', function (
                value: string | null | undefined
              ) {
                if (value === undefined || value === null) {
                  return false
                }

                const isValid = /^[STFG]\d{7}[A-Z]$/.test(value)
                return isValid
              })
          })
        ),
        otherwise: yup.array().of(
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
      .required()
  })

export const individualInvestorStatusDeclarationSchema = yup
  .object()
  .shape<any>({
    financialAsset: yup.bool().required('Required'),
    income: yup.bool().required('Required'),
    personalAssets: yup.bool().required('Required'),
    jointlyHeldAccount: yup.bool().required('Required'),

    optInAgreements: yup.bool().oneOf([true]).required('Required'),

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
      .required('Required'),
    proofOfAddress: yup.array<DataroomFile>().min(1).required('Required'),
    proofOfIdentity: yup.array<DataroomFile>().min(1).required('Required')
  })

export const individualInvestorAgreementsSchema = yup
  .object()
  .shape<IndividualAgreementsFormValues>({
    custody: yup.bool().oneOf([true]).required('Required'),
    investor: yup.bool().oneOf([true]).required('Required'),
    disclosure: yup.bool().oneOf([true]).required('Required')
  })
