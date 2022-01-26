import React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { AppRouterLink } from 'components/AppRouterLink'
import { useAuth } from 'hooks/auth/useAuth'

export const Onboarding2FA = () => {
  const { user } = useAuth()

  if (user === undefined) {
    return null
  }

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item component={Typography} variant='subtitle1'>
        2FA Setup
      </Grid>
      <Grid item component={Typography} variant='body2'>
        Secure your account with two-factor authentication.
      </Grid>
      <Grid item component={Typography} variant='body2' color='textSecondary'>
        <Box component='span' fontWeight='fontWeightBold'>
          {user.totpConfirmed ? 'Verified!' : 'In Progress'}
        </Box>
      </Grid>
      <Grid item>
        <AppRouterLink to='/'>Skip for now</AppRouterLink>
      </Grid>
    </Grid>
  )
}
