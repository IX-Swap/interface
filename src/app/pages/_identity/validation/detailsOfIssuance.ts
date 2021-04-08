import { emailSchema } from 'validation/shared'
import * as yup from 'yup'

export const issuerDetailsSchema = yup.object().shape<any>({
  fullName: yup.string().required('Required'),
  companyName: yup.string().required('Required'),
  companyRegistrationNumber: yup.string().required('Required'),
  contactNumber: yup.string(),
  email: emailSchema.required('Required'),
  industry: yup.string().required('Required'),
  fundRaisingAmount: yup.number().required('Required'),
  detail: yup.string().required('Required')
})
