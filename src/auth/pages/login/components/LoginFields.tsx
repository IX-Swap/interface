import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { LoginArgs } from 'types/auth'
import { PasswordField } from 'components/form/PasswordField'

export const LoginFields = () => {
  const { control } = useFormContext<LoginArgs>()

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <TypedField
          control={control}
          customRenderer
          variant='outlined'
          fullWidth
          component={TextField}
          name='email'
          label='Email Address'
          type='email'
        />
      </Grid>

      <Grid item>
        <PasswordField />
      </Grid>
    </Grid>
  )
}
