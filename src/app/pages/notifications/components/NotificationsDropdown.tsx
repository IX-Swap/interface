import React from 'react'
import { Grid } from '@mui/material'
import { NotificationsDropdownTrigger } from 'app/pages/notifications/components/NotificationsDropdownTrigger'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { NotificationsDropdownContent } from 'app/pages/notifications/components/NotificationsDropdownContent'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { AppRouterLink } from 'components/AppRouterLink'
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
        content={NotificationsDropdownContent}
      />
    </Grid>
  )
}
