export type BaseArgs = Record<string, any>

export interface LoginArgs extends BaseArgs {
  email: string
  password: string
  otp?: string
}

export interface SignupArgs extends BaseArgs {
  email: string
  name: string
  password: string
}

export interface VerifySignupArgs extends BaseArgs {
  verificationToken: string
}

export interface RequestPasswordResetArgs extends BaseArgs {
  email: string
}

export interface CompletePasswordResetArgs extends BaseArgs {
  email: string
  resetToken: string
  newPassword: string
}

export interface GetUserArgs extends BaseArgs {
  userId: string
}
