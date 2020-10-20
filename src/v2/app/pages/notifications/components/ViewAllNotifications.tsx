import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'

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
