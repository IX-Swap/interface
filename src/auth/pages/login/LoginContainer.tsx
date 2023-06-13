import React from 'react'
import { loginFormValidationSchema } from 'validation/auth'
import { Form } from 'components/form/Form'
import { LoginArgs, MAX_LOGIN_ATTEMPTS } from 'types/auth'
import { useLogin } from 'auth/hooks/useLogin'
import { Login } from 'auth/pages/login/Login'
import { OTPFields } from 'auth/pages/login/components/OTPFields'
import { Recaptcha } from 'auth/pages/login/components/Recaptcha'
import { RECAPTCHA_KEY } from 'config'
import { Locked } from 'auth/pages/login/components/Locked'
import { useServices } from 'hooks/useServices'

export const loginFormInitialValues = {
  email: '',
  password: '',
  otp: ''
}

export const LoginContainer = () => {
  const {
    mutation: [login, { isLoading }],
    step,
    attempts,
    resetAttempts,
    locked,
    email
  } = useLogin()

  const { sessionService } = useServices()

  const handleSubmit = async (values: LoginArgs) => {
    await login({
      ...values,
      tenantId: sessionService?.get('tenantId')
    })
  }

  const isOtpStep = step === 'otp'

  if (locked) {
    return <Locked email={email} />
  }

  return (
    <Form
      data-testid='login-form'
      defaultValues={loginFormInitialValues}
      validationSchema={loginFormValidationSchema}
      onSubmit={handleSubmit}
    >
      {attempts === MAX_LOGIN_ATTEMPTS && RECAPTCHA_KEY !== undefined ? (
        <Recaptcha onVerify={resetAttempts} />
      ) : (
        <>
          <Login hidden={isOtpStep} isLoading={isLoading} attempts={attempts} />
          {isOtpStep ? <OTPFields isLoading={isLoading} /> : null}
        </>
      )}
    </Form>
  )
}
