import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { Grid, InputAdornment, TextField } from '@mui/material'
import { PasswordValidation } from 'components/form/PasswordValidation'
import { useFormContext } from 'react-hook-form'
import { ReactComponent as WarningIcon } from 'assets/icons/warning.svg'

export interface PasswordFieldProps {
  withPasswordValidation?: boolean
  showErrorMessages?: boolean
}

export const PasswordField = ({
  withPasswordValidation = false,
  showErrorMessages = true
}: PasswordFieldProps) => {
  const { control, errors } = useFormContext()
  const passwordErrors = errors.password

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <TypedField
          control={control}
          component={TextField}
          name='password'
          label='Password'
          type={'password'}
          placeholder={'Password'}
          isErrorMessageEnabled={showErrorMessages}
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
          InputProps={{
            endAdornment:
              passwordErrors !== undefined ? (
                <InputAdornment position={'end'}>
                  <WarningIcon />
                </InputAdornment>
              ) : null
          }}
        />
      </Grid>
      {withPasswordValidation ? (
        <Grid item>
          <PasswordValidation />
        </Grid>
      ) : null}
    </Grid>
  )
}
