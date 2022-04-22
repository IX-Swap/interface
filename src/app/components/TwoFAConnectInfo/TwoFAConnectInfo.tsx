import React from 'react'
import { Button, Grid, Paper, Typography } from '@mui/material'
import { useStyles } from './TwoFAConnectInfo.styles'
import { useAuth } from 'hooks/auth/useAuth'
import { Icon } from 'ui/Icons/Icon'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { SecurityRoute } from 'app/pages/security/router/config'

export const TwoFAConnectInfo = () => {
  const { user = { enable2Fa: undefined } } = useAuth()
  const { enable2Fa } = user
  const classes = useStyles()

  if (enable2Fa !== true) {
    return null
  }

  return (
    <Paper className={classes.wrapper}>
      <Grid container direction={'column'}>
        <Grid
          item
          container
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Grid item>
            <Typography variant={'h5'}>2FA</Typography>
          </Grid>
          <Grid item>
            <Icon name='security' />
          </Grid>
        </Grid>
        <Grid item className={classes.infoBlock}>
          <Typography variant={'body1'}>
            Secure your account with two-factor authentication
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant={'outlined'}
            component={AppRouterLinkComponent}
            to={SecurityRoute.setup2fa}
            className={classes.button}
          >
            Enable 2FA
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
