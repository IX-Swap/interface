import React, { useState } from 'react'
import { TypedField } from 'components/form/TypedField'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core'
import { PasswordValidation } from 'components/form/PasswordValidation'
import { useFormContext } from 'react-hook-form'

export interface PasswordFieldProps {
  showErrors?: boolean
}

export const PasswordField = ({ showErrors = false }: PasswordFieldProps) => {
  const { control } = useFormContext()
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <TypedField
          customRenderer
          control={control}
          component={TextField}
          variant='outlined'
          name='password'
          label='Password'
          type={showPassword ? 'text' : 'password'}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle visibility'
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
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
