import React from 'react'
import { Button, Grid } from '@material-ui/core'
import useStyles from 'auth/styles'
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
