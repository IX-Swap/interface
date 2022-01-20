import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { Grid, InputAdornment, TextField } from '@material-ui/core'
import { PasswordValidation } from 'components/form/PasswordValidation'
import { useFormContext } from 'react-hook-form'
import { ReactComponent as WarningIcon } from 'assets/icons/warning.svg'

export interface PasswordFieldProps {
  showErrors?: boolean
}

export const PasswordField = ({ showErrors = false }: PasswordFieldProps) => {
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
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
          InputProps={{
            endAdornment:
              passwordErrors === true && showErrors ? (
                <InputAdornment position={'end'}>
                  <WarningIcon />
                </InputAdornment>
              ) : null
          }}
        />
      </Grid>
      {showErrors ? (
        <Grid item>
          <PasswordValidation />
        </Grid>
      ) : null}
    </Grid>
  )
}
