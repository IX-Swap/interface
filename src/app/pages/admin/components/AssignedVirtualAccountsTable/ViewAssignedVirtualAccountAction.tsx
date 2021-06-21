import { IconButton } from '@material-ui/core'
import { Launch } from '@material-ui/icons'
import { AssignedVirtualAccount } from 'app/pages/admin/components/AssignedVirtualAccountsTable/AssignedVirtualAccountsTable'
import { AdminRoute } from 'app/pages/admin/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'

export interface ViewAssignedVirtualAccountActionProps {
  item: AssignedVirtualAccount
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
