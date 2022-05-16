import React from 'react'
import { Typography, Grid } from '@mui/material'
import { TwoFaData } from 'app/pages/security/types'
import { StepWrapper } from 'app/pages/security/components/StepWrapper'
import { BackupKey } from 'app/pages/security/pages/update2fa/components/BackupKey/BackupKey'
import useStyles from './Step2Scan.styles'

export interface Step2ScanProps {
  twoFaData: TwoFaData | undefined
}

export const Step2Scan = ({ twoFaData }: Step2ScanProps) => {
  const classes = useStyles({ image: twoFaData?.image })

  return (
    <StepWrapper
      title={
        <>
          Scan this QR Code on <br />
          new Authenticator App
        </>
      }
    >
      {twoFaData !== undefined && (
        <Grid container direction='column' alignItems='center'>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            direction={'column'}
            className={classes.wrapper}
          >
            <Grid item>
              <div data-testid='store-image' className={classes.image} />
            </Grid>

            <Grid item>
              <Typography align='center' className={classes.text}>
                Click the “add button“ on Authenticator App to scan the QR Code
                or use a Setup key bellow
              </Typography>
            </Grid>

            <BackupKey value={twoFaData.key} />
          </Grid>
        </Grid>
      )}
    </StepWrapper>
  )
}
