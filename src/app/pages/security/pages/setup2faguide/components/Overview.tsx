import React from 'react'
import { Grid, Typography } from '@mui/material'

export const Overview = () => {
  return (
    <Grid container spacing={1} direction='column'>
      <Grid component={Typography} variant='subtitle1' item>
        Overview
      </Grid>
      <Grid component={Typography} item>
        Set up Two-Factor Authentication (2FA) to protect your InvestaX login
        from unauthorised use.
      </Grid>
      <Grid component={Typography} item>
        Two-Factor Authentication (2FA) provides an extra level of security for
        your InvestaX login, by requiring an authentication code as well as your
        email address and password.
      </Grid>
      <Grid component={Typography} item>
        Before you set it up for your InvestaX login, make sure you know what
        2FA is and how to use it.
      </Grid>
    </Grid>
  )
}
