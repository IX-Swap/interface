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
  name?: string
  label?: string
  isMyInfo?: boolean
  placeholder?: string
  hideShowPassword?: boolean
}

export const PasswordField = ({
  withPasswordValidation = false,
  showErrorMessages = true,
  name = 'password',
  label = 'Password',
  isMyInfo = false,
  placeholder,
  hideShowPassword = false
}: PasswordFieldProps) => {
  const { control, errors } = useFormContext()
  const { passwordField } = useStyles()
  const passwordErrors = errors[name]
  const [inputType, setInputType] = useState<'password' | 'text'>('password')
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <TypedField
          control={control}
          component={TextField}
          name={name}
          label={label}
          type={inputType}
          className={passwordField}
          placeholder={
            placeholder ?? (isMyInfo ? 'Create Password' : 'Password')
          }
          isErrorMessageEnabled={showErrorMessages}
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
          InputProps={{
            endAdornment: hideShowPassword ? undefined : (
              <EyePassword
                inputType={inputType}
                setType={setInputType}
                hasErrors={passwordErrors !== undefined}
              />
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
