import React from 'react'
import screenshot2fa from 'assets/screenshots/twofa-screenshot.svg'
import { Box, Grid, Typography } from '@material-ui/core'
import gauthScreenshot from 'assets/screenshots/gauth-screenshot.svg'
import authyScreenshot from 'assets/screenshots/authy-screenshot.svg'
import gauthCodeScreenshot from 'assets/screenshots/gauth-screenshot-2.svg'
import authyCodeScreenshot from 'assets/screenshots/authy-screenshot-2.svg'
import scanScreenshot from 'assets/screenshots/scan-screenshot.svg'
import { SetupScreenshot } from 'app/pages/security/pages/setup2faguide/components/SetupScreenshot'

export const Setup2FA = () => {
  return (
    <Grid container spacing={1} direction='column'>
      <Grid component={Typography} variant='subtitle1' item>
        Set up 2FA
      </Grid>
      <Grid component={Typography} item>
        2FA is set up using the web version of InvestaX. Once it’s set up, you
        can also use it to log in to Investax mobile apps.
      </Grid>
      <Grid component={Typography} item>
        1. If you haven't already done so, install an authenticator app.
      </Grid>
      <Grid component={Typography} item>
        2. Log into InvestaX.
      </Grid>
      <Grid component={Typography} item>
        3. Go to the onboarding panel in your top right and complete 2FA setup,
        click Enable 2FA.
      </Grid>
      <Grid item>
        <Box height={320} marginY={1}>
          <img
            alt='Enable 2FA'
            src={screenshot2fa}
            height='100%'
            width='auto'
          />
        </Box>
      </Grid>
      <Grid component={Typography} item>
        4. In your authenticator app, add a new account.
      </Grid>
      <Grid item>
        <SetupScreenshot
          gauthLabel='For Google Authenticator, click the plus icon'
          gauthScreenshot={gauthScreenshot}
          authyLabel='For Authy click Add Account'
          authyScreenshot={authyScreenshot}
        />
      </Grid>
      <Grid component={Typography} item>
        5. Scan the QR showing in InvestaX into your authenticator app.
      </Grid>
      <Grid item>
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={8}>
            <img
              width='auto%'
              height={250}
              alt='Scan the QR code'
              src={scanScreenshot}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid component={Typography} item>
        6. Alternatively, click Enter key, then enter the Account Name and Key
        showing in InvestaX into your authenticator app and turn on Time-based
        in the app.
      </Grid>
      <Grid component={Typography} item>
        7. Enter the authentication code provided by your authenticator app into
        InvestaX, then click Continue.
      </Grid>
      <Grid item>
        <SetupScreenshot
          gauthLabel='For Google Authenticator, enter the 6 digit code'
          gauthScreenshot={gauthCodeScreenshot}
          authyLabel='For Authy enter the code'
          authyScreenshot={authyCodeScreenshot}
        />
      </Grid>
      <Grid component={Typography} item>
        8. Click Finish.
      </Grid>
      <Grid component={Typography} item>
        You're now set up to use two-step authentication next time you log into
        InvestaX.
      </Grid>
    </Grid>
  )
}
