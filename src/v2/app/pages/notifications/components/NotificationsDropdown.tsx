import React from 'react'
import { Grid } from '@material-ui/core'
import { NotificationsDropdownTrigger } from 'v2/app/pages/notifications/components/NotificationsDropdownTrigger'
import { Dropdown } from 'v2/app/components/Dropdown/Dropdown'
import { NotificationsDropdownContent } from 'v2/app/pages/notifications/components/NotificationsDropdownContent'

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
