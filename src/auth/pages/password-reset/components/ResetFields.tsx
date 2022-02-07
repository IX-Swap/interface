import React from 'react'
import { Grid, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { CompletePasswordResetFormValues } from 'auth/pages/password-reset/ResetStep'
import { TypedField } from 'components/form/TypedField'

export const ResetFields = () => {
  const { control } = useFormContext<CompletePasswordResetFormValues>()

  return (
    <>
      <Grid item>
        <TypedField
          control={control}
          customRenderer
          component={TextField}
          variant='outlined'
          fullWidth
          name='email'
          label='Email'
        />
      </Grid>
      <Grid item>
        <TypedField
          control={control}
          customRenderer
          component={TextField}
          variant='outlined'
          fullWidth
          name='newPassword'
          label='New Password'
          type='password'
        />
      </Grid>
    </>
  )
}
