import React from 'react'
import { Typography, Box, Grid } from '@mui/material'
import { StepWrapper } from 'app/pages/security/components/StepWrapper'
import { TwoFaData } from 'app/pages/security/types'
import useStyles from './Step2Scan.styles'

export interface Step2ScanProps {
  twoFaData: TwoFaData | undefined
}

export const Step2Scan = ({ twoFaData }: Step2ScanProps) => {
  const classes = useStyles({ image: twoFaData?.image })

  return (
    <StepWrapper title='Scan this QR Code on The New Authenticator App'>
      <Grid container direction='column' spacing={3} alignItems='center'>
        <Grid item>
          {twoFaData !== undefined && (
            <Grid container justifyContent='center'>
              <Box pt={3} pb={3}>
                <Grid
                  container
                  justifyContent='center'
                  alignItems='center'
                  direction={'column'}
                >
                  <Grid item>
                    <div data-testid='store-image' className={classes.image} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.key}>
                      {twoFaData.key}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Typography align='center' className={classes.text}>
            If you are unable to scan the QR code, please enter this code
            manually into the app.
          </Typography>
        </Grid>
      </Grid>
    </StepWrapper>
  )
}
