import { Grid, Typography } from '@mui/material'
import React from 'react'

export const SetupAuthenticatorApp = () => {
  return (
    <Grid container spacing={1} direction='column'>
      <Grid component={Typography} variant='subtitle1' item>
        To Set up the Authenticator App:
      </Grid>
      <Grid component={Typography} item>
        1. Download and install an authenticator app from your device’s app
        store.
      </Grid>
      <Grid component={Typography} item>
        2. Follow the installation instructions provided for your device to add
        an account.
      </Grid>
      <Grid component={Typography} item>
        You need to use the QR scanner feature in the app, so you can scan the
        QR code in InvestaX.
      </Grid>
    </Grid>
  )
}
