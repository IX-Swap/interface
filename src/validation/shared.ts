import * as yup from 'yup'
import 'yup-phone-lite'
import { passwordValidator } from 'validation/validators'
import { DataroomFile, FormArrayElement } from 'types/dataroomFile'
import { Maybe } from 'types/util'
import { AddressValues } from 'app/pages/accounts/types'
import {
  DocumentFieldArrayItemValue,
  PersonalProfile,
  Personnel,
  TaxResidency
} from 'app/pages/identity/types/forms'
import { differenceInYears } from 'date-fns'

export const validationMessages = {
  required: 'This field is required'
}

export const emailSchema = yup
  .string()
  .email('This must be a valid email format')
  .max(50, 'Maximum of 50 characters')

export const passwordSchema = yup
  .string()
  .min(12, 'Password must be at least 12 characters long')
  .max(48, 'Password cannot be longer than 48 characters')
  .test(
    'lowercase',
    'Password must contain at least one lowercase letter',
    passwordValidator.lowercaseLettersTest
  )
  .test(
    'uppercase',
    'Password must contain at least one uppercase letter',
    passwordValidator.uppercaseLettersTest
  )
  .test(
    'numerical',
    'Password must contain at least one numerical character',
    passwordValidator.numbersTest
  )
  .test(
    'special-characters',
    'Password must contain at least one special character',
    passwordValidator.specialCharactersTest
  )

export const dateSchema = yup.string().nullable()

export const birthdaySchema = dateSchema.test(
  'dob',
  'Should be 18 years old',
  dateString => differenceInYears(new Date(), new Date(dateString ?? '')) >= 18
)

export const taxIdentificationNumberSchema = yup
  .string()
  .max(20, 'Maximum of 20 characters')
  .matches(/^[a-zA-Z0-9]*$/, 'Must include only letters and numbers only')

export const documentsArraySchema =
  yup.array<FormArrayElement<Maybe<DataroomFile>>>()

export const nameSchema = yup
  .string()
  .trim()
  .max(50, 'Maximum of 50 characters')
  .matches(/^[a-zA-Z-]*$/, 'Invalid name')

export const addressSchema = yup.object().shape<AddressValues>({
  line1: yup.string().required(validationMessages.required),
  line2: yup.string(),
  city: yup.string().required(validationMessages.required),
  postalCode: yup.string().required(validationMessages.required),
  state: yup.string(),
  country: yup.string().required(validationMessages.required)
})

export const personalProfileSchema = yup.object().shape<PersonalProfile>({
  photo: yup.string(),
  firstName: nameSchema.required(validationMessages.required),
  middleName: nameSchema,
  lastName: nameSchema.required(validationMessages.required),
  nationality: yup.string().required(validationMessages.required),
  dob: birthdaySchema.required(validationMessages.required),
  countryOfResidence: yup.string().required(validationMessages.required),
  contactNumber: yup
    .string()
    .phone(undefined, 'Must be a valid phone number')
    .required(validationMessages.required),
  email: emailSchema.required(validationMessages.required),
  gender: yup.string().required(validationMessages.required)
})

export const personalProfileArraySchema = yup
  .array<PersonalProfile>()
  .of(personalProfileSchema.required(validationMessages.required))

export const personnelProfileSchema = yup.object().shape<Personnel>({
  fullName: yup.string().required(validationMessages.required),
  designation: yup.string().required(validationMessages.required),
  email: emailSchema.required(validationMessages.required),
  contactNumber: yup
    .string()
    .phone(undefined, 'Must be a valid phone number')
    .required(validationMessages.required),
  documents: yup
    .mixed<DataroomFile[], object>()
    .required(validationMessages.required),
  address: addressSchema.required(validationMessages.required),
  legalEntityStatus: yup.string().required(validationMessages.required),
  countryOfFormation: yup.string().required(validationMessages.required),
  percentageShareholding: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .typeError('Percentage shareholding must be a number')
    .required(validationMessages.required)
})

export const personnelArraySchema = yup
  .array<Personnel>()
  .of(personnelProfileSchema.required(validationMessages.required))

export const taxResidenciesSchema = yup.object().shape<TaxResidency>({
  residentOfSingapore: yup.boolean(),
  countryOfResidence: yup.string().required(validationMessages.required),
  taxIdentificationNumber: taxIdentificationNumberSchema.required(
    validationMessages.required
  ),
  taxIdAvailable: yup.boolean(),
  reason: yup
    .string()
    .oneOf(['A', 'B', 'C'])
    .required(validationMessages.required),
  customReason: yup.string()
})

export const taxResidenciesArraySchema = yup
  .array<TaxResidency>()
  .of(taxResidenciesSchema.required(validationMessages.required))

export const documentsSchema = yup
  .array<DocumentFieldArrayItemValue>()
  .of(
    yup.object<DocumentFieldArrayItemValue>({
      // @ts-expect-error
      value: yup.object<DataroomFile>().test(
        'isMoreThanZeroFilesUpload',
        'validationMessages.required',
        // @ts-expect-errors
        value => Object.keys(value).length > 0
      )
    })
  )
  .required(validationMessages.required)

export const institutionalInvestorDocumentsSchema = yup
  .array<DocumentFieldArrayItemValue>()
  .when('isInstitutionalInvestor', {
    is: true,
    then: documentsSchema
  })
  .required(validationMessages.required)

export const investorStatusDeclarationItemSchema = yup
  .bool()
  .oneOf([true, false])
  .test(
    'oneOfInvestorDeclarationFormValueShouldBeTrue',
    'Please choose at least one option under "Investor Status Declaration" section',
    function () {
      const parent = this.parent
      return (
        (parent.assets as boolean) ||
        (parent.trustee as boolean) ||
        (parent.accreditedBeneficiaries as boolean) ||
        (parent.accreditedSettlors as boolean) ||
        (parent.accreditedShareholders as boolean) ||
        (parent.partnership as boolean)
      )
    }
  )
  .required(validationMessages.required)

export const optInAgreementsDependentValueSchema = yup.bool()
