import * as yup from 'yup'
import {
  CompletePasswordResetArgs,
  LoginArgs,
  RequestPasswordResetArgs,
  SignupArgs
} from 'types/auth'
import { emailSchema, passwordSchema } from 'validation/shared'

export const loginFormValidationSchema = yup.object<LoginArgs>({
  email: emailSchema.required('This field is required'),
  password: yup.string().required('This field is required'),
  otp: yup.string()
})

export const registerFormValidationSchema = yup.object<SignupArgs>({
  name: yup.string().required('This field is required'),
  email: emailSchema.required('This field is required'),
  password: passwordSchema.required('This field is required'),
  agree: yup
    .boolean()
    .test('consent', 'You must agree to these terms', value => value === true)
    .required('You must agree to these terms')
})

export const requestPasswordResetValidationSchema =
  yup.object<RequestPasswordResetArgs>({
    email: emailSchema.required('This field is required')
  })

export const completePasswordResetValidationSchema = yup.object<
  Omit<CompletePasswordResetArgs, 'resetToken'>
>({
  email: emailSchema.required('This field is required'),
  newPassword: passwordSchema.required('This field is required')
})
