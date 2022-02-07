import React from 'react'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Button } from '@mui/material'
import { OTCMarketRoute as paths } from 'app/pages/exchange/router/config'

export const AddListingButton = () => {
  return (
    <Button
      component={AppRouterLinkComponent}
      to={paths.createListing}
      size='small'
      color='primary'
      variant='outlined'
    >
      Create a new listing
    </Button>
  )
}
