import React from 'react'
import { Launch as LaunchIcon } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { VirtualAccount } from 'types/virtualAccount'
import { AdminRoute } from 'app/pages/admin/router/config'

export interface ActionsProps {
  item: VirtualAccount
}

export const Actions = ({ item }: ActionsProps) => {
  return (
    <IconButton
      // TODO Change next 3 params after backend api to be ready
      component={AppRouterLinkComponent}
      to={AdminRoute.landing}
      params={{ VirtualAccountId: item._id }}
      size='small'
      // TODO Remove after backend api to be ready
      disabled={true}
    >
      <LaunchIcon color='disabled' />
    </IconButton>
  )
}
