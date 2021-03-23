import React from 'react'
import { Grid } from '@material-ui/core'
import { MarkAllAsRead } from 'app/pages/notifications/components/MarkAllAsRead'
import { VSpacer } from 'components/VSpacer'
import { NotificationsList } from 'app/pages/notifications/components/NotificationsList'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const Notifications = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Notifications' />
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
