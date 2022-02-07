import React from 'react'
import useStyles from './Step3Backup.styles'
import { Typography, Grid } from '@mui/material'
import { TwoFaData } from 'app/pages/security/types'
import { StepWrapper } from 'app/pages/security/components/StepWrapper'

export interface Step3BackupProps {
  twoFaData: TwoFaData | undefined
}

export const Step3Backup = ({ twoFaData }: Step3BackupProps) => {
  const classes = useStyles()

  if (twoFaData === undefined) {
    return null
  }

  return (
    <StepWrapper title='Save This Backup Key'>
      <Grid container direction='column' spacing={3} alignItems='center'>
        <Grid item xs={12} md={8} lg={6}>
          <Typography align='center' variant='body1'>
            Please save this key code in a safe place. It will allow you to
            recover your authenticator in case of losing your phone
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='h4' align='center' className={classes.key}>
            {twoFaData.key}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Typography align='center' variant='body1'>
            Please click “Next” if you have successfully stored this key.
          </Typography>
        </Grid>
      </Grid>
    </StepWrapper>
  )
}
