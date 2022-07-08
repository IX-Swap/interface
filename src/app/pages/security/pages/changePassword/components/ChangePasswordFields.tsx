import React from 'react'
import { Grid } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { ChangePasswordFormValues } from 'app/pages/security/pages/changePassword/types'
import { PasswordField } from 'components/form/PasswordField'

export const ChangePasswordFields = () => {
  const { control } = useFormContext<ChangePasswordFormValues>()

  return (
    <>
      <Grid item xs={12}>
        <TypedField
          control={control}
          component={PasswordField}
          name='oldPassword'
          label='Old Password'
          showErrorMessages={false}
        />
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <TypedField
          control={control}
          component={PasswordField}
          name='newPassword'
          label='New Password'
          showErrorMessages={false}
        />
      </Grid>
      <Grid item xs={12}>
        <TypedField
          control={control}
          component={PasswordField}
          name='confirmPassword'
          label='Confirm New Password'
          showErrorMessages={false}
        />
      </Grid>
    </>
  )
}
