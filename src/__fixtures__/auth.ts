import { user } from './user'
import { APIServiceResponse } from '../v2/services/api/types'
import User from 'v2/types/user'
import {
  LoginArgs,
  SignupArgs,
  VerifySignupArgs
} from 'v2/services/api/auth/types'

export const authURLs = {
  login: '/auth/sign-in',
  signup: '/auth/registrations',
  verifySignup: '/auth/registrations/confirm',
  getUser: '/auth/profiles'
}

export const loginArgs: LoginArgs = {
  email: 'alex@investax.io',
  password: 'qwerty12345',
  otp: '123456'
}

export const signupArgs: SignupArgs = {
  name: 'Alex Solovev',
  email: 'alex@investax.io',
  password: 'qwerty12345'
}

export const verifySignupArgs: VerifySignupArgs = {
  token: 'mytoken'
}

export const loginResponseSuccess: APIServiceResponse<User> = {
  data: user,
  message: 'Welcome'
}

export const loginResponseFailure: APIServiceResponse<User> = {
  message: 'error'
}

export const signupResponseSuccess: APIServiceResponse = {
  message: 'A verification e-mail has been sent to your account'
}

export const signupResponseFailure: APIServiceResponse = {
  message: 'Sorry but this email address is already taken'
}

export const verifySignupResponseSuccess: APIServiceResponse = {
  message: 'Your account has been verified'
}

export const verifySignupResponseFailure: APIServiceResponse = {
  message: 'The token has already been verified, has expired, or is invalid'
}

export const getUserResponseSuccess: APIServiceResponse<User> = {
  data: user,
  message: 'OK'
}

export const getUserResponseFailure: APIServiceResponse<User> = {
  message: 'Access denied'
}
