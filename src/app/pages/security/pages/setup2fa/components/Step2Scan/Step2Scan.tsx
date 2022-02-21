import React from 'react'
import { Typography, Box, Grid, Link } from '@mui/material'
import useStyles from 'app/pages/security/pages/setup2fa/components/Step2Scan/Step2Scan.styles'
import { StepWrapper } from 'app/pages/security/components/StepWrapper'
import { TwoFaData } from 'app/pages/security/types'

export interface Step2ScanProps {
  twoFaData: TwoFaData | undefined
}

export const Step2Scan = ({ twoFaData }: Step2ScanProps) => {
  const classes = useStyles()

  return (
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
          {twoFaData !== undefined && (
            <Grid container justifyContent='center'>
              <Box pt={4} pb={3}>
                <Grid container justifyContent='center' alignItems='center'>
                  <Grid item>
                    <div
                      data-testid='store-image'
                      className={classes.image}
                      style={{
                        backgroundImage: `url('${twoFaData.image}')`,
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
                      {twoFaData.key}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Typography align='center' variant='body1'>
            Please click “NEXT” when you have successfully scanned...
          </Typography>
        </Grid>
      </Grid>
    </StepWrapper>
  )
}
