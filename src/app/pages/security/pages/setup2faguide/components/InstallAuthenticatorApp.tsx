import { Grid, Typography, Box, Link } from '@mui/material'
import React from 'react'

export const InstallAuthenticatorApp = () => {
  return (
    <Grid container spacing={1} direction='column'>
      <Grid component={Typography} variant='subtitle1' item>
        Install an Authenticator App
      </Grid>
      <Grid component={Typography} item>
        If you already use an authenticator app, add another account to it for
        your InvestaX login. If you don't have one yet, we recommend one of the
        following, which are all free to download and use:
      </Grid>
      <Grid component={Typography} item>
        -{' '}
        <Box component='span' fontWeight='fontWeightMedium'>
          Google Authenticator
        </Box>{' '}
        (
        <Link href='https://support.google.com/accounts/' target='_blank'>
          Google Accounts Help Center
        </Link>
        ) for Android devices, iPhone, iPod Touch, iPad, and BlackBerry devices.
      </Grid>
      <Grid component={Typography} item>
        (If Google Authenticator app is not available in your country)
        <br />-{' '}
        <Box component='span' fontWeight='fontWeightMedium'>
          Authy
        </Box>{' '}
        (
        <Link href='https://authy.com/' target='_blank'>
          Authy website
        </Link>
        ) for iPhone, iPad, Android, Mac computers, and Windows computers.
      </Grid>
      <Grid component={Typography} item>
        -{' '}
        <Box component='span' fontWeight='fontWeightMedium'>
          Windows Authenticator
        </Box>{' '}
        (
        <Link
          href='https://www.microsoft.com/en-us/store/apps/windows'
          target='_blank'
        >
          Microsoft Store
        </Link>
        ) for Windows Phones.
      </Grid>
      <Grid component={Typography} item>
        {' '}
        - You may search other standard Authenticator apps.
      </Grid>
    </Grid>
  )
}
