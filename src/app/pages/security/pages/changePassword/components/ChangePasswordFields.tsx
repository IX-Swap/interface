import React from 'react'
import { Box, Grid, Input } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { ChangePasswordFormValues } from 'app/pages/security/pages/changePassword/types'

export const ChangePasswordFields = () => {
  const { control } = useFormContext<ChangePasswordFormValues>()

  return (
    <>
      <Grid item xs={12} md={12} lg={12}>
        <Box mr={3} m={1}>
          <TypedField
            control={control}
            component={Input}
            name='oldPassword'
            label='Old Password'
            type='password'
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Box mr={3} m={1}>
          <TypedField
            control={control}
            component={Input}
            name='newPassword'
            label='New Password'
            type='password'
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Box mr={3} m={1}>
          <TypedField
            control={control}
            component={Input}
            name='confirmPassword'
            label='Confirm New Password'
            type='password'
          />
        </Box>
      </Grid>
    </>
  )
}
