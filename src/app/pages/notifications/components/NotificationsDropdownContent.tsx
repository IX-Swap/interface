import React from 'react'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { Grid, Typography } from '@mui/material'
import { MarkAllAsRead } from 'app/pages/notifications/components/MarkAllAsRead'
import { ViewAllNotifications } from 'app/pages/notifications/components/ViewAllNotifications'
import { useStyles } from 'app/pages/notifications/components/NotificationsDropdownContent.styles'
import { NotificationsVirtualizedList } from './NotificationsVirtualizedList'

export const NotificationsDropdownContent = (props: DropdownContentProps) => {
  const classes = useStyles()

  return (
    <Grid container direction='column' className={classes.container}>
      <Grid item container justifyContent='center'>
        <Typography variant='h5'>Notifications</Typography>
      </Grid>
      <Grid item container justifyContent='flex-end'>
        <MarkAllAsRead variant='text' />
      </Grid>
      <Grid item className={classes.list}>
        <NotificationsVirtualizedList />
      </Grid>
      <Grid item container justifyContent='center'>
        <ViewAllNotifications onClick={props.injectedProps.close} />
      </Grid>
    </Grid>
  )
}
