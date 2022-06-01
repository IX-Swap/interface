import React from 'react'
import { Typography, Grid } from '@mui/material'
import { TwoFaData } from 'app/pages/security/types'
import { StepWrapper } from 'app/pages/security/components/StepWrapper'
import { BackupKey } from 'app/pages/security/components/BackupKey/BackupKey'
import useStyles from 'app/pages/security/components/Step2Scan/Step2Scan.styles'

export interface Step2ScanProps {
  twoFaData: TwoFaData | undefined
  update2FA?: boolean
}

export const Step2Scan = ({ twoFaData, update2FA = false }: Step2ScanProps) => {
  const classes = useStyles({ image: twoFaData?.image })

  return (
    <StepWrapper
      title={
        <>
          Scan this QR Code on <br />
          {update2FA ? 'new' : 'Your'} Authenticator App
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
              <Typography align='center' className={classes.description}>
                Use the app to scan the barcode below or type the Setup Key on
                the keyboard of your phone
              </Typography>
            </Grid>

            <Grid item>
              <div data-testid='store-image' className={classes.image} />
            </Grid>

            <Grid item>
              <Typography align='center' className={classes.text}>
                Click the “add“ button in the Authenticator App to scan the QR
                Code or use the Setup key below
              </Typography>
            </Grid>

            <BackupKey value={twoFaData.encoded} />

            <Grid item>
              <Typography align='center' className={classes.contact}>
                <span className={classes.contactText}>
                  If you do not have a smartphone or need more help, please{' '}
                </span>
                <a
                  target='_blank'
                  href='mailto:support@investax.io'
                  className={classes.link}
                  rel='noreferrer'
                >
                  <span>contact us</span>
                </a>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </StepWrapper>
  )
}
