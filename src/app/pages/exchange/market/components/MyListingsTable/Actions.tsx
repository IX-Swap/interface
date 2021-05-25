import React from 'react'
import { Launch as LaunchIcon } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { OTCMarketRoute as paths } from 'app/pages/exchange/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

export interface ActionsProps {
  item: any
}

export const Actions = ({ item }: ActionsProps) => {
  return (
    <IconButton
      component={AppRouterLinkComponent}
      to={paths.myListings}
      params={{ listingId: item._id }}
      size='small'
    >
      <LaunchIcon color='disabled' />
    </IconButton>
  )
}
