import React from 'react'
import { Grid } from '@material-ui/core'
import { NotificationsDropdownTrigger } from 'app/pages/notifications/components/NotificationsDropdownTrigger'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { NotificationsDropdownContent } from 'app/pages/notifications/components/NotificationsDropdownContent'

export const NotificationsDropdown = () => {
  return (
    <Grid item>
      <Dropdown
        trigger={NotificationsDropdownTrigger}
        content={NotificationsDropdownContent}
      />
    </Grid>
  )
}
