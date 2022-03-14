import { Grid, TextField } from '@mui/material'
import { useStyles } from 'components/form/PasswordField.styles'
import { PasswordValidation } from 'components/form/PasswordValidation'
import { TypedField } from 'components/form/TypedField'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { EyePassword } from 'components/form/EyePassword'

export interface PasswordFieldProps {
  withPasswordValidation?: boolean
  showErrorMessages?: boolean
}

export const PasswordField = ({
  withPasswordValidation = false,
  showErrorMessages = true
}: PasswordFieldProps) => {
  const { control } = useFormContext()
  const { passwordField } = useStyles()

  const [inputType, setInputType] = useState<'password' | 'text'>('password')
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <TypedField
          control={control}
          component={TextField}
          name='password'
          label='Password'
          type={inputType}
          className={passwordField}
          placeholder={'Password'}
          isErrorMessageEnabled={showErrorMessages}
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
          InputProps={{
            endAdornment: (
              <EyePassword inputType={inputType} setType={setInputType} />
            )
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
