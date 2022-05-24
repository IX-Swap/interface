import React from 'react'
import { Grid, Typography } from '@mui/material'
import Enabled2FaIcon from 'app/pages/security/pages/update2fa/assets/enabled-2fa.png'
import { useStyles } from 'app/pages/security/components/Enabled/Enabled.styles'

export interface EnabledProps {
  update2FA?: boolean
}

export const Enabled = ({ update2FA = false }: EnabledProps) => {
  const classes = useStyles()
  const title = update2FA ? (
    <>
      2FA Has Been Updated
      <br /> Successfully
    </>
  ) : (
    '2FA Enabled'
  )

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
            {title}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography align='center' variant='body1' className={classes.text}>
          Your account is now protected by Two-Factor Authentication
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
