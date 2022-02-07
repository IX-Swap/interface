import { Grid, Typography } from '@mui/material'
import { hasValue } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { PasswordValidationItem } from 'components/form/PasswordValidationItem/PasswordValidationItem'

export const PasswordValidation = () => {
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

  const passwordErrorsList = [
    {
      type: 'min',
      label: 'At least 12 characters'
    },
    {
      type: 'lowercase',
      label: 'At least 1 lowercase'
    },
    {
      type: 'uppercase',
      label: 'At least 1 uppercase'
    },
    {
      type: 'special-characters',
      label: 'At least 1 symbol'
    },
    {
      type: 'numerical',
      label: 'At least 1 number'
    }
  ]

  return (
    <Grid container direction='column' spacing={1}>
      {passwordErrorsList.map(error => (
        <Grid item>
          <PasswordValidationItem
            label={error.label}
            invalid={passwordErrors?.types?.[error.type]}
          />
        </Grid>
      ))}
    </Grid>
  )
}
