import * as yup from 'yup'
import 'yup-phone'
import { passwordValidator } from 'validation/validators'
import { DataroomFile, FormArrayElement } from 'types/dataroomFile'
import { Maybe } from 'types/util'
import { AddressValues } from 'app/pages/accounts/types'
import {
  PersonalProfile,
  Personnel,
  TaxResidency
} from 'app/pages/identity/types/forms'
import { differenceInYears } from 'date-fns'

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

export const documentsArraySchema = yup.array<
  FormArrayElement<Maybe<DataroomFile>>
>()

export const nameSchema = yup
  .string()
  .max(50, 'Maximum of 50 characters')
  .matches(/^$|^[aA-zZ\s]+$/, 'Must include letters only')

export const addressSchema = yup.object().shape<AddressValues>({
  line1: yup.string().required('Required'),
  line2: yup.string(),
  city: yup.string().required('Required'),
  postalCode: yup.string().required('Required'),
  state: yup.string(),
  country: yup.string().required('Required')
})

export const personalProfileSchema = yup.object().shape<PersonalProfile>({
  photo: yup.string(),
  firstName: nameSchema.required('This field is required'),
  middleName: nameSchema,
  lastName: nameSchema.required('This field is required'),
  nationality: yup.string().required('Required'),
  dob: birthdaySchema.required('This field is required'),
  countryOfResidence: yup.string().required('Required'),
  contactNumber: yup.string().phone().required('This field is required'),
  email: emailSchema.required('This field is required')
})

export const personalProfileArraySchema = yup
  .array<PersonalProfile>()
  .of(personalProfileSchema.required('Required'))

export const personnelProfileSchema = yup.object().shape<Personnel>({
  fullName: yup.string().required('Required'),
  designation: yup.string().required('Required'),
  email: emailSchema.required('This field is required'),
  contactNumber: yup.string().phone().required('This field is required'),
  documents: yup.mixed<DataroomFile[], object>().required('Required'),
  address: addressSchema.required('Required'),
  percentageShareholding: yup.number().required('Required')
})

export const personnelArraySchema = yup
  .array<Personnel>()
  .of(personnelProfileSchema.required('Required'))

export const taxResidenciesSchema = yup.object().shape<TaxResidency>({
  residentOfSingapore: yup.boolean(),
  countryOfResidence: yup.string().required('Required'),
  taxIdentificationNumber: yup.string().required('Required'),
  taxIdAvailable: yup.boolean(),
  reason: yup.string().oneOf(['A', 'B', 'C']).required('Required'),
  customReason: yup.string()
})

export const taxResidenciesArraySchema = yup
  .array<TaxResidency>()
  .of(taxResidenciesSchema.required('Required'))
