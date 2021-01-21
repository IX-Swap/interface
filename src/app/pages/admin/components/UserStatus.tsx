import React from 'react'
import { Grid } from '@material-ui/core'
import { User } from 'app/pages/admin/hooks/useUserById'
import { Status } from 'app/pages/admin/components/Status'

export interface UserStatusProps {
  data: User
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
