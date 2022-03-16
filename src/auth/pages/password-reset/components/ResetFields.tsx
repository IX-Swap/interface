import { Grid, TextField } from '@mui/material'
import { CompletePasswordResetFormValues } from 'auth/pages/password-reset/ResetStep'
import { PasswordField } from 'components/form/PasswordField'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const ResetFields = () => {
  const { control } = useFormContext<CompletePasswordResetFormValues>()
  return (
    <>
      <Grid item mb={4}>
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
      <Grid item mb={2}>
        <PasswordField name='newPassword' label='New Password' />
      </Grid>
    </>
  )
}
