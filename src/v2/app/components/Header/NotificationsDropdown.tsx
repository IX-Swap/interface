import React from 'react'
import { Grid, IconButton } from '@material-ui/core'
import { ReactComponent as NotificationsIcon } from 'assets/icons/navigation/notifications.svg'

export const NotificationsDropdown = () => {
  return (
    <Grid item>
      <IconButton color='inherit'>
        <NotificationsIcon />
      </IconButton>
    </Grid>
  )
}
