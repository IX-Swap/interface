import React from 'react'
import { BackButton } from 'components/BackButton'
import { VSpacer } from 'components/VSpacer'
import { Grid, Typography } from '@material-ui/core'
import { Overview } from 'app/pages/security/pages/setup2faguide/components/Overview'
import { InstallAuthenticatorApp } from 'app/pages/security/pages/setup2faguide/components/InstallAuthenticatorApp'
import { SetupAuthenticatorApp } from 'app/pages/security/pages/setup2faguide/components/SetupAuthenticatorApp'
import { Setup2FA } from 'app/pages/security/pages/setup2faguide/components/Setup2FA'

export const Setup2FAGuide = () => {
  return (
    <>
      <Grid container spacing={1} alignItems='center'>
        <Grid item>
          <BackButton color='primary' size='small' />
        </Grid>
        <Grid item>
          <Typography color='primary' style={{ fontWeight: 400, fontSize: 18 }}>
            Back to 2FA Setup
          </Typography>
        </Grid>
      </Grid>
      <VSpacer size='medium' />
      <Grid container direction='column' alignContent='center' spacing={3}>
        <Grid item xs={12} md={10}>
          <Typography variant='h5' align='left'>
            How to Set up Two-Factor Authentication?
          </Typography>
        </Grid>
        <Grid item xs={12} md={10}>
          <Overview />
        </Grid>
        <Grid item xs={12} md={10}>
          <InstallAuthenticatorApp />
        </Grid>
        <Grid item xs={12} md={10}>
          <SetupAuthenticatorApp />
        </Grid>
        <Grid item xs={12} md={10}>
          <Setup2FA />
        </Grid>
      </Grid>
      <VSpacer size='medium' />
      <Grid container spacing={1} alignItems='center' justifyContent='flex-end'>
        <Grid item>
          <BackButton color='primary' size='small' />
        </Grid>
        <Grid item>
          <Typography color='primary' style={{ fontWeight: 400, fontSize: 18 }}>
            Back to 2FA Setup
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
