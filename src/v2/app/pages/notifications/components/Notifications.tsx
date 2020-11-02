import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'v2/app/components/PageHeader/PageHeader'
import { MarkAllAsRead } from 'v2/app/pages/notifications/components/MarkAllAsRead'
import { VSpacer } from 'v2/components/VSpacer'
import { NotificationsList } from 'v2/app/pages/notifications/components/NotificationsList'

export const Notifications = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader label='Notifications' alignment='flex-start' />
      </Grid>
      <Grid item container justify='flex-end'>
        <MarkAllAsRead />
      </Grid>
      <VSpacer size='small' />
      <Grid item>
        <NotificationsList />
      </Grid>
    </Grid>
  )
}
