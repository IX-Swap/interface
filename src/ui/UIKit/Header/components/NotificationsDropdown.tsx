import React from 'react'
import { Grid } from '@mui/material'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
// import { AppRouterLink } from 'components/AppRouterLink'
import { NotificationsDropdownTrigger } from 'ui/UIKit/Header/components/NotificationsDropdownTrigger/NotificationsDropdownTrigger'
import { NotificationsDropdownContent } from 'app/pages/notifications/components/NotificationsDropdownContent'
// import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
// import { AppRoute } from 'app/router/config'

export const NotificationsDropdown = () => {
  // TODO uncomment this after demo
  // const { isTablet } = useAppBreakpoints()

  // if (isTablet) {
  //   return (
  //     <AppRouterLink to={AppRoute.notifications}>
  //       <NotificationsDropdownTrigger />
  //     </AppRouterLink>
  //   )
  // }

  return (
    <Grid item>
      <Dropdown
        trigger={NotificationsDropdownTrigger}
        // TODO Needs to add app content after complete design for notifications dropdown
        content={NotificationsDropdownContent}
      />
    </Grid>
  )
}
