import * as yup from 'yup'
import 'yup-phone'
import { addressSchema, dateSchema, emailSchema } from 'validation/shared'
import {
  IndividualAgreementsFormValues,
  IndividualDocumentsFormValues,
  IndividualFinancialInfoFormValues,
  IndividualInvestorDeclarationFormValues,
  IndividualPersonalInfoFormValues,
  IndividualTaxDeclarationFormValues
} from 'app/pages/_identity/types/forms'
import { FundSource, TaxResidency } from 'types/identity'
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
                otherwise: yup.number().oneOf([0]).required('Required')
              })
              .required('Required')
          })
          .required()
      )
      .test(
        'At least one fund source is selected',
        'Please select at least one fund source',
        function (value) {
          if (value?.every(fundSource => fundSource.value === 0)) {
            // TODO: figure out why validation error doesn't prevent moving to the next step
            return false
          }

          return true
        }
      )
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
            taxIdentificationNumber: yup.string().required('Required')
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
  .shape<IndividualInvestorDeclarationFormValues>({
    financialAsset: yup.bool().oneOf([true]).required('Required'),
    income: yup.bool().oneOf([true]).required('Required'),
    personalAssets: yup.bool().oneOf([true]).required('Required'),
    jointlyHeldAccount: yup.bool().oneOf([true]).required('Required'),

    rightToOptOut: yup.bool().oneOf([true]).required('Required'),
    consent: yup.bool().oneOf([true]).required('Required'),
    consequencesOfQualification: yup.bool().oneOf([true]).required('Required')
  })

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
