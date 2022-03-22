import React from 'react'
import { IconButton } from '@mui/material'
import { Launch } from '@mui/icons-material'
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
