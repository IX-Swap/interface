import { IconButton } from '@material-ui/core'
import { Launch } from '@material-ui/icons'
import { AdminRoute } from 'app/pages/admin/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'
import { VirtualAccount } from 'types/virtualAccount'

export interface ViewAssignedVirtualAccountActionProps {
  item: VirtualAccount
}

export const ViewAssignedVirtualAccountAction = ({
  item
}: ViewAssignedVirtualAccountActionProps) => {
  return (
    <IconButton
      component={AppRouterLinkComponent}
      size='small'
      to={AdminRoute.landing}
    >
      <Launch color='disabled' />
    </IconButton>
  )
}
