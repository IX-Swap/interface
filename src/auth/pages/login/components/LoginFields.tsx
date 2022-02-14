import React from 'react'
import { Grid, InputAdornment, TextField } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { LoginArgs } from 'types/auth'
import { PasswordField } from 'components/form/PasswordField'
import { AuthRoute } from 'auth/router/config'
import { AppRouterLink } from 'components/AppRouterLink'
import { useStyles } from 'auth/pages/login/Login.styles'
import { ReactComponent as WarningIcon } from 'assets/icons/warning.svg'

export const LoginFields = () => {
  const { forgotLink } = useStyles()
  const { control, errors } = useFormContext<LoginArgs>()
  const emailErrors = errors.email

  return (
    <Grid container spacing={4} direction='column'>
      <Grid item>
        <TypedField
          control={control}
          fullWidth
          component={TextField}
          placeholder={'Email Address'}
          name='email'
          label='Email'
          type='email'
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            endAdornment:
              emailErrors !== undefined ? (
                <InputAdornment position={'end'}>
                  <WarningIcon />
                </InputAdornment>
              ) : null
          }}
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
