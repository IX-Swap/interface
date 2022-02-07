import React from 'react'
import { Divider, Grid, Typography } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { useStyles } from './SuccessfulReset.styles'
import { AppRouterLink } from 'components/AppRouterLink'
import { AuthRoute } from 'auth/router/config'

export const SuccessfulReset = () => {
  const { wrapper, title, description } = useStyles()

  return (
    <Grid container className={wrapper}>
      <Grid item>
        <Typography className={title} variant={'h3'} align='center'>
          Forgot <br /> Password?
        </Typography>
        <VSpacer size={'medium'} />
      </Grid>
      <Grid item>
        <Typography className={description} variant={'body1'} align='center'>
          Please follow the instructions in the email to reset your password.
        </Typography>
        <VSpacer size={'medium'} />
      </Grid>
      <Grid item>
        <Divider />
        <VSpacer size={'small'} />
      </Grid>
      <Grid item>
        <Typography align='center'>
          <AppRouterLink to={AuthRoute.login} style={{ color: '#ffffff' }}>
            &#8592; Back to Sign In
          </AppRouterLink>
        </Typography>
      </Grid>
    </Grid>
  )
}
