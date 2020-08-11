import * as yup from 'yup'
import { LoginArgs, SignupArgs } from 'v2/services/api/auth/types'

const emailSchema = yup.string().email().required('Required')
const passwordSchema = yup.string().required('Required')

export const loginFormValidationSchema = yup.object<LoginArgs>({
  email: emailSchema,
  password: passwordSchema,
  otp: yup.string()
})

export const registerFormValidationSchema = yup.object<SignupArgs>({
  name: yup.string().required('Required'),
  email: emailSchema,
  password: passwordSchema
})
