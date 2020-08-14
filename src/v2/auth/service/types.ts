type Base = Record<string, string | undefined>;

export interface LoginArgs extends Base {
  email: string
  password: string
  otp?: string
}

export interface SignupArgs extends Base {
  email: string
  name: string
  password: string
}

export interface VerifySignupArgs extends Base {
  token: string
}

export interface RequestPasswordResetArgs extends Base {
  email: string
}

export interface CompletePasswordResetArgs extends Base {
  email: string
  resetToken: string
  newPassword: string
}
