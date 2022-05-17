import { Grid, Typography, Paper, Button } from '@mui/material'
import { SecurityRoute } from 'app/pages/security/router/config'
import { useAuth } from 'hooks/auth/useAuth'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'

export const TwoFANotice = () => {
  const { user } = useAuth()

  if (user !== undefined && user.enable2Fa === true) {
    return null
  }

  return (
    <Paper sx={{ p: 5 }}>
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
          <Typography variant='body1' color='textSecondary'>
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
