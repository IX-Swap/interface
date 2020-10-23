import React from 'react'
import { Button, Grid } from '@material-ui/core'
import useStyles from 'v2/auth/styles'
import { LoginArgs } from 'v2/types/auth'
import { loginFormValidationSchema } from 'v2/auth/validation'
import { useAuthRouter } from 'v2/auth/router'
import { useLogin } from 'v2/auth/hooks/useLogin'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'

export const loginFormInitialValues = {
  email: '',
  password: '',
  otp: ''
}

const useLoginForm = createTypedForm<LoginArgs>()

export const Login: React.FC = () => {
  const classes = useStyles()
  const { paths } = useAuthRouter()
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
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <TextField name='email' label='Email Address' />
        </Grid>

        <Grid item>
          <TextField
            name='password'
            label='Password'
            inputProps={{
              type: 'password'
            }}
          />
        </Grid>

        <Grid item className={classes.otp}>
          <TextField
            name='otp'
            label='OTP Code (optional)'
            variant='outlined'
            inputProps={{
              autoComplete: 'off'
            }}
          />
        </Grid>

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
