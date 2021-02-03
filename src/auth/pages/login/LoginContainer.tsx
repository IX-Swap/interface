import React from 'react'
import { loginFormValidationSchema } from 'validation/auth'
import { Form } from 'components/form/Form'
import { LoginArgs } from 'types/auth'
import { useLogin } from 'auth/hooks/useLogin'
import { Login } from 'auth/pages/login/Login'
import { OTPFields } from 'auth/pages/login/components/OTPFields'

export const loginFormInitialValues = {
  email: '',
  password: '',
  otp: ''
}

export const LoginContainer = () => {
  const {
    mutation: [login],
    step
  } = useLogin()
  const handleSubmit = async (values: LoginArgs) => {
    await login(values)
  }

  const isOtpStep = step === 'otp'

  return (
    <Form
      data-testid='login-form'
      defaultValues={loginFormInitialValues}
      validationSchema={loginFormValidationSchema}
      onSubmit={handleSubmit}
    >
      <Login hidden={isOtpStep} />
      {isOtpStep ? <OTPFields /> : null}
    </Form>
  )
}
