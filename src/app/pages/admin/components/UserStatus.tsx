import React from 'react'
import { Grid } from '@mui/material'
import { Status } from 'app/pages/admin/components/Status'
import { ManagedUser } from 'types/user'

export interface UserStatusProps {
  data: ManagedUser
}

export const UserStatus = ({ data }: UserStatusProps) => {
  return (
    <Grid container spacing={1}>
      {data.enabled ? (
        <Grid item>
          <Status status='Enabled' />
        </Grid>
      ) : null}
      {data.twoFactorAuth ? (
        <Grid item>
          <Status status='2FA Enabled' />
        </Grid>
      ) : null}
      {data.verified ? (
        <Grid item>
          <Status status='Verified' variant='success' />
        </Grid>
      ) : null}
    </Grid>
  )
}
