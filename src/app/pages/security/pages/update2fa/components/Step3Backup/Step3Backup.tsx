import React from 'react'
import useStyles from './Step3Backup.styles'
import { Typography, Grid } from '@mui/material'
import { TwoFaData } from 'app/pages/security/types'
import { StepWrapper } from 'app/pages/security/components/StepWrapper'
import { BackupKey } from 'app/pages/security/pages/update2fa/components/BackupKey/BackupKey'

export interface Step3BackupProps {
  twoFaData: TwoFaData | undefined
}

export const Step3Backup = ({ twoFaData }: Step3BackupProps) => {
  const classes = useStyles()

  if (twoFaData === undefined) {
    return null
  }

  return (
    <StepWrapper title='Save this Backup Key'>
      <Grid container justifyContent={'center'}>
        <Grid
          container
          direction='column'
          alignItems='center'
          className={classes.container}
        >
          <Grid item>
            <Typography variant={'body1'} className={classes.text}>
              Please save this key in a safe place. It will allow you to recover
              your Authenticator in case of losing your phone
            </Typography>
          </Grid>

          <BackupKey value={twoFaData.encoded} />

          <Grid item>
            <Typography variant={'body1'} className={classes.secondText}>
              Please click “Next” if you have successfully stored this key.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </StepWrapper>
  )
}
