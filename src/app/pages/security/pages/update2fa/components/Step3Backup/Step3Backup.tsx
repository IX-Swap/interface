import React from 'react'
import useStyles from './Step3Backup.styles'
import { Typography, Grid, Box } from '@mui/material'
import { TwoFaData } from 'app/pages/security/types'
import { StepWrapper } from 'app/pages/security/components/StepWrapper'
import { ReactComponent as InfoIcon } from 'assets/icons/info.svg'

export interface Step3BackupProps {
  twoFaData: TwoFaData | undefined
}

export const Step3Backup = ({ twoFaData }: Step3BackupProps) => {
  const classes = useStyles()

  if (twoFaData === undefined) {
    return null
  }

  return (
    <StepWrapper title='Save the Backup Key'>
      <Grid container direction='column' alignItems='center'>
        <Grid item>
          <Typography
            align='center'
            className={classes.key}
            data-testid={'key'}
          >
            {twoFaData.key}
          </Typography>
        </Grid>
        <Grid item>
          <Box className={classes.container}>
            <InfoIcon className={classes.icon} />
            <Typography variant={'body1'} className={classes.text}>
              Please save this key code in a safe place. It will allow you to
              recover your authenticator in case of losing your phone
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </StepWrapper>
  )
}
