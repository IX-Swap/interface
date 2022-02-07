import React from 'react'
import { Grid } from '@mui/material'
import { MarkAllAsRead } from 'app/pages/notifications/components/MarkAllAsRead'
import { VSpacer } from 'components/VSpacer'
import { NotificationsList } from 'app/pages/notifications/components/NotificationsList'

export const Notifications = () => {
  return (
    <Grid container direction='column'>
      <Grid item container justifyContent='flex-end'>
        <MarkAllAsRead />
      </Grid>
      <VSpacer size='small' />
      <Grid item>
        <NotificationsList />
      </Grid>
    </Grid>
  )
}
