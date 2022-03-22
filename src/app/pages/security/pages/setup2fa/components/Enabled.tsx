import React from 'react'
import { Grid, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { green } from '@mui/material/colors'
import { VSpacer } from 'components/VSpacer'

export const Enabled = () => {
  return (
    <Grid container direction='column' spacing={3} alignItems='center'>
      <Grid item>
        <CheckCircleIcon
          fontSize='large'
          style={{ color: green[500], width: 120, height: 120 }}
        />
        <VSpacer size='small' />
      </Grid>
      <Grid item>
        <Typography align='center' variant='h5'>
          2FA Enabled
        </Typography>
      </Grid>
      <Grid item xs={12} md={8} lg={6}>
        <Typography align='center' variant='body1'>
          Your account is now protected by Two-Factor Authentication
        </Typography>
      </Grid>
    </Grid>
  )
}
