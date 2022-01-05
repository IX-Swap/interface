import React from 'react'
import { Typography, Box, Grid, Link } from '@material-ui/core'
import useStyles from './Step2Scan.styles'
import { useSetup2fa } from '../hooks/useSetup2fa'
import { useSetup2faStore } from '../context'
import { useObserver } from 'mobx-react'
import { StepWrapper } from 'app/pages/security/pages/setup2fa/components/StepWrapper'

export const Step2Scan = () => {
  const classes = useStyles()
  const store = useSetup2faStore()
  const { isLoading } = useSetup2fa()

  return useObserver(() => (
    <StepWrapper title='Scan This QR Code in Your Authenticator App'>
      <Grid container direction='column' spacing={3} alignItems='center'>
        <Grid item xs={12} md={8} lg={6}>
          <Typography align='center' variant='body1'>
            Use the app to scan the barcode below or type in the key. If you
            don’t have a smartphone or need more help, please{' '}
            <Link href='https://investax.io/contact/'>contact us.</Link>
          </Typography>
        </Grid>
        <Grid item>
          {!isLoading && (
            <Grid container justifyContent='center'>
              <Box pt={4} pb={3}>
                <Grid container justifyContent='center' alignItems='center'>
                  <Grid item>
                    <div
                      data-testid='store-image'
                      className={classes.image}
                      style={{
                        backgroundImage: `url('${store.image}')`,
                        marginBottom: 10
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.label}>
                      Click the “add icon “ on the app to scan the barcode below
                      or type in the key.
                    </Typography>
                    <Typography variant='h5' className={classes.key}>
                      {store.key}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Typography align='center' variant='body1'>
            Please click “NEXT” when you have sucessfully scanned...
          </Typography>
        </Grid>
      </Grid>
    </StepWrapper>
  ))
}
