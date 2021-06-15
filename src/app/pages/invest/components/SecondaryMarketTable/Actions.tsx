import React from 'react'
import { Launch as LaunchIcon } from '@material-ui/icons'
import { Button, IconButton } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { InvestRoute as paths } from 'app/pages/invest/router/config'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { useTheme } from '@material-ui/core/styles'

export interface ActionsProps {
  item: any
}

export const Actions = ({ item }: ActionsProps) => {
  const theme = useTheme()
  return (
    <>
      <IconButton
        component={AppRouterLinkComponent}
        to={paths.viewListing}
        params={{
          userId: item.listing.createdBy,
          listingId: item.listing._id
        }}
        size='small'
      >
        <LaunchIcon color='disabled' />
      </IconButton>
      <Button
        style={{
          marginLeft: theme.spacing(4.5),
          marginRight: theme.spacing(4),
          fontSize: 14,
          color: theme.palette.slider.activeBackground
        }}
        component={AppRouterLinkComponent}
        to={OTCMarketRoute.market}
        params={{
          pairId: item._id
        }}
        size='small'
      >
        TRADE
      </Button>
    </>
  )
}
