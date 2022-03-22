import { Grid } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { PasswordValidationItem } from 'components/form/PasswordValidationItem/PasswordValidationItem'

export const PasswordValidation = () => {
  const { errors } = useFormContext()
  const passwordErrors = errors.password

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
