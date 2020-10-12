import React from 'react'
import { DropdownContentProps } from 'v2/app/components/Dropdown/Dropdown'
import { Grid, Typography } from '@material-ui/core'
import { MarkAllAsRead } from 'v2/app/pages/notifications/components/MarkAllAsRead'
import { NotificationsList } from 'v2/app/pages/notifications/components/NotificationsList'
import { ViewAllNotifications } from 'v2/app/pages/notifications/components/ViewAllNotifications'
import { useStyles } from 'v2/app/pages/notifications/components/NotificationsDropdownContent.styles'

export const NotificationsDropdownContent = (props: DropdownContentProps) => {
  const classes = useStyles()

  return (
    <Grid container direction='column' className={classes.container}>
      <Grid item container justify='center'>
        <Typography variant='h5'>Notifications</Typography>
      </Grid>
      <Grid item container justify='flex-end'>
        <MarkAllAsRead variant='text' />
      </Grid>
      <Grid item className={classes.list}>
        <NotificationsList width={400} />
      </Grid>
      <Grid item container justify='center'>
        <ViewAllNotifications onClick={props.injectedProps.close} />
      </Grid>
    </Grid>
  )
}
