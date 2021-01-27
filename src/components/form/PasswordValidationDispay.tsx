import { Grid, Typography } from '@material-ui/core'
import { hasValue } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { PasswordValidation } from 'components/form/PasswordValidation'

export const PasswordValidationDisplay = () => {
  const { watch, errors } = useFormContext()

  const password = watch('password', '')
  const passwordErrors = errors.password

  if (!hasValue(password)) {
    return (
      <Grid container direction='column' spacing={1}>
        <Grid item xs={12}>
          <Typography variant='body2' color='textSecondary' align='center'>
            Must have 12 characters, an uppercase, a special character, and a
            number.
          </Typography>
        </Grid>
      </Grid>
    )
  }

  if (passwordErrors === undefined) {
    return null
  }

  return (
    <Grid container direction='column' spacing={1}>
      <Grid item>
        <PasswordValidation
          label='At least 12 characters'
          inValid={passwordErrors?.types?.hasOwnProperty('min')}
        />
      </Grid>
      <Grid item>
        <PasswordValidation
          label='At least 1 lowercase'
          inValid={passwordErrors?.types?.hasOwnProperty('lowercase')}
        />
      </Grid>
      <Grid item>
        <PasswordValidation
          label='At least 1 uppercase'
          inValid={passwordErrors?.types?.hasOwnProperty('uppercase')}
        />
      </Grid>
      <Grid item>
        <PasswordValidation
          label='At least 1 symbol'
          inValid={passwordErrors?.types?.hasOwnProperty('special-characters')}
        />
      </Grid>
      <Grid item>
        <PasswordValidation
          label='At least 1 number'
          inValid={passwordErrors?.types?.hasOwnProperty('numerical')}
        />
      </Grid>
    </Grid>
  )
}
