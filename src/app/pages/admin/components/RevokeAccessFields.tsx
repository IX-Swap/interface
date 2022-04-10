import { Grid, Typography } from '@mui/material'
import { RevokeAccessInputs } from 'app/pages/admin/components/RevokeAccess'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'

export const RevokeAccessFields = () => {
  const { control } = useFormContext<RevokeAccessInputs>()

  return (
    <Grid container direction='column' spacing={1}>
      <Grid item>
        <Typography>Enter the session id to revoke</Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TypedField
          component={TextInput}
          variant='outlined'
          control={control}
          name='sessionId'
          label='Session ID'
          helperText='If you do not specify session id, all sessions of this user will be revoked'
          fullWidth
        />
      </Grid>
    </Grid>
  )
}
