export interface Enable2faFormValues {
  otp: string
}

export interface Remove2faFormValues {
  otp: string
  emailCode: string
}

export interface TwoFaData {
  encoded: string
  image: string
  key: string
}

export interface GetEmailCodeResponse {
  email: string
}
