import { user } from './user'
import { APIServiceResponse } from 'v2/services/api/types'
import User from 'v2/types/user'
import {
  CompletePasswordResetArgs,
  LoginArgs,
  RequestPasswordResetArgs,
  SignupArgs,
  VerifySignupArgs
} from 'v2/types/auth'

const email = 'alex@investax.io'
const password = 'Qwerty12345_'

export const authURLs = {
  login: '/auth/sign-in',
  signup: '/auth/registrations',
  verifySignup: '/auth/registrations/confirm',
  getUser: '/auth/profiles',
  requestPasswordReset: '/auth/password/reset/start',
  completePasswordReset: '/auth/password/reset/confirm'
}

export const loginArgs: LoginArgs = {
  otp: '123456',
  password,
  email
}

export const signupArgs: SignupArgs = {
  name: 'Alex Solovev',
  email,
  password
}

export const verifySignupArgs: VerifySignupArgs = {
  verificationToken: 'mytoken'
}

export const requestPasswordResetArgs: RequestPasswordResetArgs = {
  email
}

export const completePasswordResetArgs: CompletePasswordResetArgs = {
  email,
  resetToken: 'token',
  newPassword: password
}

export const loginResponseSuccess: APIServiceResponse<User> = {
  data: user,
  message: 'Welcome',
  success: true
}

export const loginResponseFailure: APIServiceResponse<User> = {
  message: 'error',
  success: false
}

export const signupResponseSuccess: APIServiceResponse = {
  message: 'A verification e-mail has been sent to your account',
  success: true
}

export const signupResponseFailure: APIServiceResponse = {
  message: 'Sorry but this email address is already taken',
  success: false
}

export const verifySignupResponseSuccess: APIServiceResponse = {
  message: 'Your account has been verified',
  success: true
}

export const verifySignupResponseFailure: APIServiceResponse = {
  message: 'The token has already been verified, has expired, or is invalid',
  success: false
}

export const getUserResponseSuccess: APIServiceResponse<User> = {
  data: user,
  message: 'OK',
  success: true
}

export const getUserResponseFailure: APIServiceResponse<User> = {
  message: 'Access denied',
  success: false
}

export const requestPasswordResetResponseSuccess: APIServiceResponse = {
  message: 'OK',
  success: true
}

export const requestPasswordResetResponseFailure: APIServiceResponse = {
  message: 'Error',
  success: false
}

export const completePasswordResetResponseSuccess: APIServiceResponse = {
  message: 'Success',
  success: true
}

export const completePasswordResetResponseFailure: APIServiceResponse = {
  message: 'Reset token is already used, expired, or invalid',
  success: false
}
