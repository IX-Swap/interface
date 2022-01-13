import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { LoginArgs } from 'types/auth'
import { PasswordField } from 'components/form/PasswordField'
import { AuthRoute } from 'auth/router/config'
import { AppRouterLink } from 'components/AppRouterLink'
import { useStyles } from 'auth/pages/login/Login.styles'

export const LoginFields = () => {
  const { forgotLink } = useStyles()
  const { control } = useFormContext<LoginArgs>()

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <TypedField
          control={control}
          fullWidth
          component={TextField}
          name='email'
          label='Email'
          type='email'
        />
      </Grid>

      <Grid item>
        <PasswordField />
      </Grid>

      <Grid item container justifyContent={'flex-end'}>
        <AppRouterLink to={AuthRoute.passwordReset} className={forgotLink}>
          Forgot?
        </AppRouterLink>
      </Grid>
    </Grid>
  )
}
