import React from 'react'
import { Button, Grid } from '@material-ui/core'
import useStyles from 'v2/auth/styles'
import { LoginArgs } from 'v2/types/auth'
import { loginFormValidationSchema } from 'v2/auth/validation'
import { useAuthRouter } from 'v2/auth/router'
import { useLogin } from 'v2/auth/hooks/useLogin'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import { Submit } from 'v2/components/form/Submit'
import { LoginFields } from 'v2/auth/pages/login/components/LoginFields'
import { Form } from 'v2/components/form/Form'

export const loginFormInitialValues = {
  email: '',
  password: '',
  otp: ''
}

export const Login: React.FC = () => {
  const classes = useStyles()
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
      <Grid container direction='column' spacing={1}>
        <LoginFields />
        <Grid item>
          <div className={classes.formButtons}>
            <Submit size='large'>Login</Submit>
            <Button
              component={AppRouterLinkComponent}
              color='primary'
              size='large'
              className={classes.forgetButton}
              to={paths.passwordReset}
            >
              Forgot Password?
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  )
}
