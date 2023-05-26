import React from 'react'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { Grid, Typography } from '@mui/material'
import { MarkAllAsRead } from 'app/pages/notifications/components/MarkAllAsRead'
import { ViewAllNotifications } from 'app/pages/notifications/components/ViewAllNotifications'
import { useStyles } from 'app/components/Header/components/Notifications/NotificationsDropdownContent/NotificationsDropdownContent.styles'
import { NotificationsVirtualizedList } from 'app/components/Header/components/Notifications/NotificationsVirtualizedList'
import { useNotifications } from 'app/pages/notifications/hooks/useNotifications'

export const NotificationsDropdownContent = (props: DropdownContentProps) => {
  const classes = useStyles()
  const { data } = useNotifications()
  const hasNotifs = data?.length > 0

  return (
    <Grid container direction='column' className={classes.container}>
      <Grid item container className={classes.topBlock}>
        <Grid item>
          <Typography variant='h5'>Notifications</Typography>
        </Grid>
        {hasNotifs && (
          <Grid item>
            <MarkAllAsRead variant='text' />
          </Grid>
        )}
      </Grid>
      <Grid item className={classes.list}>
        {hasNotifs ? (
          <NotificationsVirtualizedList />
        ) : (
          <Typography p={3}>No notifications</Typography>
        )}
      </Grid>

      {hasNotifs && (
        <Grid
          item
          container
          justifyContent='center'
          className={classes.bottomBlock}
        >
          <ViewAllNotifications onClick={props.injectedProps.close} />
        </Grid>
      )}
    </Grid>
  )
}
