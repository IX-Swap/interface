import { Button, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Launch as LaunchIcon } from '@mui/icons-material'
import { InvestRoute } from 'app/pages/invest/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'
export interface ActionsProps {
  item: any
}

export const Actions = ({ item }: ActionsProps) => {
  const theme = useTheme()
  return (
    <>
      <IconButton
        component={AppRouterLinkComponent}
        to={InvestRoute.viewListing}
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
        to={InvestRoute.exchange}
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
