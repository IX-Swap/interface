import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

export const ViewAllNotifications = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      component={AppRouterLinkComponent}
      color='primary'
      style={{ textTransform: 'none' }}
      to='/app/notifications'
    >
      View All
    </Button>
  )
}
