import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import { UIKitThemeWrapper } from 'ui/UIKitThemeWrapper'

export const IconKit = () => {
  return (
    <UIKitThemeWrapper>
      <Paper sx={{ padding: 2 }} elevation={0}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5'>Navigation</Typography>
          </Grid>
          <Grid item xs={12}>
            <Icon name='arrow-left' />
            <Icon name='arrow-right' />
            <Icon name='arrow-down' />
            <Icon name='arrow-up' />
            <Icon name='chevron-left' />
            <Icon name='chevron-right' />
            <Icon name='chevron-down' />
            <Icon name='chevron-up' />
            <Icon name='plus' />
            <Icon name='minus' />
            <Icon name='switch-left' />
            <Icon name='switch-right' />
            <Icon name='switch-down' />
            <Icon name='switch-up' />
            <Icon name='check' />
            <Icon name='close' />
            <Icon name='menu' />
            <Icon name='more-vertical' />
            <Icon name='more-horizontal' />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5'>Other</Typography>
          </Grid>
          <Grid item xs={12}>
            <Icon name='bell' />
            <Icon name='alert-triangle' />
            <Icon name='alert-circle' />
            <Icon name='account' />
            <Icon name='user' />
            <Icon name='users' />
            <Icon name='edit' />
            <Icon name='send' />
            <Icon name='mail' />
            <Icon name='refresh' />
            <Icon name='message' />
            <Icon name='date' />
            <Icon name='star' />
            <Icon name='star-half-filled' />
            <Icon name='star-filled' />
            <Icon name='time' />
            <Icon name='search' />
            <Icon name='file' />
            <Icon name='settings' />
            <Icon name='security' />
            <Icon name='download' />
            <Icon name='upload' />
            <Icon name='logout' />
            <Icon name='login' />
            <Icon name='book' />
            <Icon name='trash' />
            <Icon name='eye' />
            <Icon name='eye-off' />
            <Icon name='locked' />
            <Icon name='unlocked' />
          </Grid>
        </Grid>
      </Paper>
    </UIKitThemeWrapper>
  )
}
