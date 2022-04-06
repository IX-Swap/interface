import React from 'react'
import { Grid } from '@mui/material'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { AppRouterLink } from 'components/AppRouterLink'
import { NotificationsDropdownTrigger } from 'app/components/Header/components/Notifications/NotificationsDropdownTrigger/NotificationsDropdownTrigger'
import { NotificationsDropdownContent } from 'app/components/Header/components/Notifications/NotificationsDropdownContent/NotificationsDropdownContent'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { AppRoute } from 'app/router/config'

export const NotificationsDropdown = () => {
  const { isTablet } = useAppBreakpoints()

  if (isTablet) {
    return (
      <AppRouterLink to={AppRoute.notifications}>
        <NotificationsDropdownTrigger />
      </AppRouterLink>
    )
  }

  return (
    <Grid item>
      <Dropdown
        trigger={NotificationsDropdownTrigger}
        // TODO Needs to add new content after complete design for notifications dropdown
        content={NotificationsDropdownContent}
      />
    </Grid>
  )
}
