import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import { AppRouterLink } from 'components/AppRouterLink'
import { useSecurityRouter } from 'app/pages/security/router'
import { useAuth } from 'hooks/auth/useAuth'

export const OnboardingHome = () => {
  const { paths } = useSecurityRouter()
  const { user } = useAuth()

  if (user === undefined) {
    return null
  }

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item component={Typography} variant='subtitle1'>
        2FA
      </Grid>
      <Grid item component={Typography} variant='body2'>
        Secure your account with two-factor authentication!
      </Grid>
      <Grid item>
        {user.totpConfirmed ? (
          <Box component='span' fontWeight='bold'>
            Verified!
          </Box>
        ) : (
          <AppRouterLink to={paths.setup2fa}>Enable 2FA</AppRouterLink>
        )}
      </Grid>
    </Grid>
  )
}
