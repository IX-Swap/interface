// @flow
import React from 'react'
import { Container, Typography, Grid, Link, Box } from '@material-ui/core'
import appStoreLogo from '../../../assets/appstore.png'
import googlePlayLogo from '../../../assets/googleplay.png'

const StepOneDownload = () => (
  <Container>
    <Typography align='center'>
      Download and Install Google Authenticator App
    </Typography>

    <Box pt={3}>
      <Grid container justify='center' spacing={2}>
        <Grid item>
          <Link
            href='https://apps.apple.com/us/app/google-authenticator/id388497605'
            target='_blank'
          >
            <img height='40px' src={appStoreLogo} alt='App Store Logo' />
          </Link>
        </Grid>
        <Grid item>
          <Link
            href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en'
            target='_blank'
          >
            <img height='40px' src={googlePlayLogo} alt='Google Play Logo' />
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Container>
)

export default StepOneDownload
