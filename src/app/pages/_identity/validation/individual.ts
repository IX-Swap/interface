import * as yup from 'yup'
import { addressSchema, dateSchema, emailSchema } from 'validation/shared'
import { IndividualPersonalInfoFormValues } from 'app/pages/_identity/types/forms'

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
