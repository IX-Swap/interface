import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { LoginArgs } from 'types/auth'
import { loginFormValidationSchema } from 'validation/auth'
import { useAuthRouter } from 'auth/router'
import { useLogin } from 'auth/hooks/useLogin'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Submit } from 'components/form/Submit'
import { LoginFields } from 'auth/pages/login/components/LoginFields'
import { Form } from 'components/form/Form'

export const loginFormInitialValues = {
  email: '',
  password: '',
  otp: ''
}

export const Login: React.FC = () => {
  const { paths } = useAuthRouter()
  const [login] = useLogin()
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
      <Grid container direction='column' spacing={2}>
        <LoginFields />
        <Grid item container justify='space-between'>
          <Submit size='large'>Login</Submit>
          <Button
            component={AppRouterLinkComponent}
            color='primary'
            size='large'
            to={paths.passwordReset}
          >
            Forgot Password?
          </Button>
        </Grid>
      </Grid>
    </Form>
  )
}
