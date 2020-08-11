export interface LoginArgs {
    email: string
    password: string
    otp?: string
}

export interface SignupArgs {
    email: string
    name: string
    password: string
}

export interface VerifySignupArgs {
    token: string
}
