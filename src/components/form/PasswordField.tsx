import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { Grid, TextField } from '@material-ui/core'
import { PasswordValidation } from 'components/form/PasswordValidation'
import { useFormContext } from 'react-hook-form'

export interface PasswordFieldProps {
  showErrors?: boolean
}

export const PasswordField = ({ showErrors = false }: PasswordFieldProps) => {
  const { control } = useFormContext()

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
          customRenderer
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
