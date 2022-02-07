import React from 'react'
import { Divider, Grid, Typography } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { useStyles } from './SuccessfulSignup.styles'
import { ReactComponent as SuccessIcon } from 'assets/icons/white_success.svg'
import { AppRouterLink } from 'components/AppRouterLink'
import { AuthRoute } from 'auth/router/config'

export const SuccessfulSignup = () => {
  const { wrapper, title, description, link } = useStyles()

  return (
    <Grid container className={wrapper}>
      <Grid item>
        <SuccessIcon />
        <VSpacer size={'small'} />
      </Grid>
      <Grid item>
        <Typography className={title} variant={'h3'} align='center'>
          SIGN UP
        </Typography>
        <VSpacer size={'medium'} />
      </Grid>
      <Grid item>
        <Typography className={description} variant={'body1'} align='center'>
          Your account have been successfully created. Use your data for Sign
          in.
        </Typography>
        <VSpacer size={'medium'} />
      </Grid>
      <Grid item>
        <Divider />
        <VSpacer size={'small'} />
      </Grid>
      <Grid item>
        <Typography align='center'>
          <AppRouterLink to={AuthRoute.login} className={link}>
            &#8592; Back to Sign In
          </AppRouterLink>
        </Typography>
      </Grid>
    </Grid>
  )
}
