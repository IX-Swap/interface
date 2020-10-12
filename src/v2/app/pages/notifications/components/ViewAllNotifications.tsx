import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { AppRouterLink } from 'v2/components/AppRouterLink'

export const ViewAllNotifications = (props: ButtonProps) => {
  return (
    <AppRouterLink to='/app/notifications'>
      <Button {...props} color='primary' style={{ textTransform: 'none' }}>
        View All
      </Button>
    </AppRouterLink>
  )
}
