import React from 'react'
import { Typography, Grid } from '@mui/material'
import useStyles from './Step3Backup.styles'
import { useSetup2faStore } from '../context'
import { useObserver } from 'mobx-react'
import { StepWrapper } from 'app/pages/security/pages/setup2fa/components/StepWrapper'

export const Step3Backup = () => {
  const classes = useStyles()
  const store = useSetup2faStore()

  return useObserver(() => (
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
            {store.key}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Typography align='center' variant='body1'>
            Please click “Next” if you have sucessfully stored this key.
          </Typography>
        </Grid>
      </Grid>
    </StepWrapper>
  ))
}
