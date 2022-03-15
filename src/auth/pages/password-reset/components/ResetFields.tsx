import React from 'react'
import { Box, Grid, TextField, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { CompletePasswordResetFormValues } from 'auth/pages/password-reset/ResetStep'
import { TypedField } from 'components/form/TypedField'
import { PasswordField } from 'components/form/PasswordField'
import { useStyles } from 'auth/pages/password-reset/RequestStep.styles'

export const ResetFields = () => {
  const { control, getValues } =
    useFormContext<CompletePasswordResetFormValues>()
  const email = getValues('email')
  const { subtitle } = useStyles()
  return (
    <>
      <Grid item>
        <Box display='flex' justifyContent='center'>
          <Typography variant='body1' className={subtitle}>
            {email}
          </Typography>
        </Box>
        <TypedField
          control={control}
          customRenderer
          component={TextField}
          variant='outlined'
          fullWidth
          sx={{ visibility: 'hidden' }}
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
