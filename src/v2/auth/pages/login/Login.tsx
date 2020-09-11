import React from 'react'
import { Button } from '@material-ui/core'
import useStyles from 'v2/auth/styles'
import { LoginArgs } from 'v2/auth/service/types'
import { loginFormValidationSchema } from 'v2/auth/validation'
import { useAuthRouter } from 'v2/auth/router'
import { useLogin } from 'v2/auth/hooks/useLogin'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { AppRouterLink } from 'v2/components/AppRouterLink'

export const loginFormInitialValues = {
  email: '',
  password: '',
  otp: ''
}

const useLoginForm = createTypedForm<LoginArgs>()

export const Login: React.FC = () => {
  const classes = useStyles()
  const { routes } = useAuthRouter()
  const [login] = useLogin()
  const { Form, TextField, Submit } = useLoginForm()
  const handleSubmit = async (values: LoginArgs) => {
    await login(values)
  }

  return (
    <Form
      data-testid='login-form'
      defaultValues={loginFormInitialValues}
      validationSchema={loginFormValidationSchema}
      onSubmit={handleSubmit}
    >
      <TextField name='email' label='Email Address' />
      <TextField
        name='password'
        label='Password'
        inputProps={{
          type: 'password'
        }}
      />
      <TextField
        name='otp'
        label='OTP Code (optional)'
        inputProps={{
          autoComplete: 'off'
        }}
      />
      <div className={classes.formButtons}>
        <Submit>Login</Submit>
        <Button color='primary' size='large' className={classes.forgetButton}>
          <AppRouterLink to={routes.passwordReset}>
            Forgot Password?
          </AppRouterLink>
        </Button>
      </div>
    </Form>
  )
}
