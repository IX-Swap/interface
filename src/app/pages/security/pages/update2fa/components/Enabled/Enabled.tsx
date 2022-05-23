import React from 'react'
import { Grid, Typography } from '@mui/material'
import Enabled2FaIcon from './../../assets/enabled-2fa.png'
import { useStyles } from './Enabled.styles'

export const Enabled = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      className={classes.container}
    >
      <Grid item container alignItems={'center'} justifyContent={'center'}>
        <Grid>
          <Typography align='center' variant='h4'>
            2FA Has Been Updated
            <br /> Successfully
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography align='center' variant='body1' className={classes.text}>
          Your account is now protected by Two-Factor Authentication (2FA)
        </Typography>
      </Grid>
      <Grid item>
        <img
          src={Enabled2FaIcon}
          alt={'Enabled 2FA'}
          className={classes.icon}
        />
      </Grid>
    </Grid>
  )
}
