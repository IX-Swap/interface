import * as yup from 'yup'
import {
  CompletePasswordResetArgs,
  LoginArgs,
  RequestPasswordResetArgs,
  SignupArgs
} from 'v2/auth/service/types'

const passwordPatterns = [
  /[A-Z]/, // at least one uppercase character
  /[a-z]/, // at least one lowercase character
  /[0-9]/, // at least one number
  /[^A-Za-z0-9]/ // not an uppercase or lowercase character or a number (meaning, at least one symbol)
]

const emailSchema = yup.string().email().required('Required')
const passwordSchema = yup
  .string()
  .min(12)
  .max(48)
  .test(
    'Password strength',
    'Password does not meet complexity requirement',
    value => passwordPatterns.every(x => x.test(value))
  )
  .required('Required')

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

export const requestPasswordResetValidationSchema = yup.object<
  RequestPasswordResetArgs
>({
  email: emailSchema
})

export const completePasswordResetValidationSchema = yup.object<
  Omit<CompletePasswordResetArgs, 'email'>
>({
  resetToken: yup.string().required('Required'),
  newPassword: passwordSchema
})
