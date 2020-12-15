import React from 'react'
import { Grid, Input } from '@material-ui/core'
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
          component={Input}
          name='email'
          label='Email'
        />
      </Grid>
      <Grid item>
        <TypedField
          control={control}
          component={Input}
          name='newPassword'
          label='New Password'
        />
      </Grid>
    </>
  )
}
