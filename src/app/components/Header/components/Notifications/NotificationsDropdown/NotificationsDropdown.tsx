import React from 'react'
import { Grid } from '@mui/material'
import { AppRouterLink } from 'components/AppRouterLink'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { AppRoute } from 'app/router/config'
import { Dropdown } from 'app/components/Header/components/Dropdown/Dropdown'
import { NotificationsDropdownTrigger } from 'app/components/Header/components/Notifications/NotificationsDropdownTrigger'
import { NotificationsDropdownContent } from 'app/components/Header/components/Notifications/NotificationsDropdownContent/NotificationsDropdownContent'
import { useStyles } from './NotificationsDropdown.styles'

export const NotificationsDropdown = () => {
  const { isTablet } = useAppBreakpoints()
  const classes = useStyles()

  if (isTablet) {
    return (
      <AppRouterLink to={AppRoute.notifications} className={classes.link}>
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
