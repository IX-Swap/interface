import React from 'react'
import { IconButton } from '@material-ui/core'
import { Launch } from '@material-ui/icons'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AdminRoute } from 'app/pages/admin/router/config'
export interface ViewUserColumnProps {
  userId: string
}

export const ViewUserColumn = ({ userId }: ViewUserColumnProps) => {
  return (
    <IconButton
      component={AppRouterLinkComponent}
      size='small'
      to={AdminRoute.view}
      params={{ userId: userId }}
    >
      <Launch color='disabled' />
    </IconButton>
  )
}
