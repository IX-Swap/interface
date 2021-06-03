import React from 'react'
import { Launch as LaunchIcon } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { OTCMarketRoute as paths } from 'app/pages/exchange/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Listing } from 'types/listing'

export interface ActionsProps {
  item: Listing
}

export const Actions = ({ item }: ActionsProps) => {
  return (
    <IconButton
      component={AppRouterLinkComponent}
      to={paths.viewListing}
      params={{ listingId: item._id }}
      size='small'
    >
      <LaunchIcon color='disabled' />
    </IconButton>
  )
}
