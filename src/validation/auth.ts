import * as yup from 'yup'
import {
  CompletePasswordResetArgs,
  LoginArgs,
  RequestPasswordResetArgs,
  SignupArgs
} from 'types/auth'
import {
  emailSchema,
  passwordSchema,
  validationMessages
} from 'validation/shared'

export const loginFormValidationSchema = yup.object<LoginArgs>({
  email: emailSchema.required(validationMessages.required),
  password: yup.string().required(validationMessages.required),
  otp: yup.string()
})

export const registerFormValidationSchema = yup.object<SignupArgs>({
  name: yup.string().required(validationMessages.required),
  email: emailSchema.required(validationMessages.required),
  password: passwordSchema.required(validationMessages.required),
  agree: yup
    .boolean()
    .test('consent', 'You must agree to these terms', value => value === true)
    .required('You must agree to these terms')
})

export const requestPasswordResetValidationSchema =
  yup.object<RequestPasswordResetArgs>({
    email: emailSchema.required(validationMessages.required)
  })

export const completePasswordResetValidationSchema = yup.object<
  Omit<CompletePasswordResetArgs, 'resetToken'>
>({
  email: emailSchema.required(validationMessages.required),
  newPassword: passwordSchema.required(validationMessages.required)
})
