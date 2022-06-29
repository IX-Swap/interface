import { Grid, Typography, Paper, Button, useMediaQuery } from '@mui/material'
import { SecurityRoute } from 'app/pages/security/router/config'
import { useAuth } from 'hooks/auth/useAuth'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import { useTheme } from '@mui/material/styles'

export const TwoFANotice = () => {
  const { user } = useAuth()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  if ((user !== undefined && user.enable2Fa === true) || matches) {
    return null
  }

  return (
    <Paper sx={{ p: 5, borderRadius: 2 }}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} justifyContent='space-between' xs={12}>
          <Grid item>
            <Typography variant='h5'>2FA</Typography>
          </Grid>
          <Grid item>
            <Icon name='security' color='#4C88FF' />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant='body1'
            color='textSecondary'
            sx={{ mb: 1, mr: 2.5 }}
          >
            Secure your account with two-factor authentication
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant='outlined' fullWidth href={SecurityRoute.setup2fa}>
            Enable 2FA
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
