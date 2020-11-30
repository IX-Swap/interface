import * as yup from 'yup'
import { passwordValidator } from 'validation/validators'
import { PersonalProfile, PersonalProfileWithAddress } from 'types/identity'
import { MARITAL_STATUSES } from 'app/pages/identity/const'
import { DataroomFile, FormArrayElement } from 'types/dataroomFile'
import { Maybe } from 'types/util'
import { AddressValues } from 'app/pages/accounts/types'

export const emailSchema = yup.string().email('Invalid email')

export const passwordSchema = yup
  .string()
  .min(12, 'Password must be at least 12 characters long')
  .max(48, 'Password cannot be longer than 48 characters')
  .test(
    'Password strength',
    'Password does not meet complexity requirement',
    passwordValidator
  )

export const maritalStatusSchema = yup
  .mixed()
  .oneOf<PersonalProfileWithAddress['maritalStatus']>(MARITAL_STATUSES)

export const dateSchema = yup.string().nullable()

export const genderSchema = yup
  .mixed()
  .oneOf<PersonalProfileWithAddress['gender']>(['M', 'F'])

export const documentsArraySchema = yup.array<
  FormArrayElement<Maybe<DataroomFile>>
>()

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
  firstName: yup.string().required('Required'),
  middleName: yup.string(),
  lastName: yup.string().required('Required'),
  nationality: yup.string().required('Required'),
  maritalStatus: maritalStatusSchema.required('Required'),
  gender: genderSchema.required('Required'),
  dob: dateSchema.required('Required'),
  countryOfResidence: yup.string().required('Required'),
  contactNumber: yup.string().required('Required'),
  email: emailSchema.required('Required')
})

export const personalProfileArraySchema = yup
  .array<PersonalProfile>()
  .of(personalProfileSchema.required('Required'))
