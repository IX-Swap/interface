import React from 'react'
import { Grid } from '@mui/material'
import { ManagedUser } from 'types/user'
// import { UserIdentitiesStatus } from './UserIdentitiesStatus'
import { UserVerificaionStatus } from './UserVerificationStatus'
import { UserTwoFAStatus } from './UserTwoFAStatus'
import { UserAccountStatus } from './UserAccountStatus'
import { useStyles } from './UserDetails.styles'

export interface UserStatusProps {
  data: ManagedUser
}

export const UserStatus = ({ data }: UserStatusProps) => {
  const classes = useStyles()
  const { userStatusMargin } = classes
  return (
    <>
      <Grid gap={3} item sx={{ display: 'flex' }}>
        {/* <Grid spacing={3}>
          <Grid item className={userStatusMargin}>
            <UserIdentitiesStatus data={data} />
          </Grid>
        </Grid> */}
        <Grid spacing={3}>
          <Grid item className={userStatusMargin}>
            <UserTwoFAStatus data={data} />
          </Grid>
        </Grid>
        <Grid spacing={3}>
          <Grid item className={userStatusMargin}>
            <UserVerificaionStatus data={data} />
          </Grid>
        </Grid>
      </Grid>
      <Grid gap={3} item sx={{ display: 'flex' }}>
        {/* <Grid spacing={3}>
          <Grid item className={userStatusMargin}>
            <UserTwoFAStatus data={data} />
          </Grid>
        </Grid> */}
        <Grid spacing={3}>
          <Grid item className={userStatusMargin}>
            <UserAccountStatus data={data} />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
