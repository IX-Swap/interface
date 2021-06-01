import React from 'react'

import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Button } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'

export const MyListings = () => {
  return (
    <RootContainer>
      <PageHeader
        title={'My Listings'}
        alignment='center'
        showBreadcrumbs={true}
      />
      <Button
        component={AppRouterLinkComponent}
        to={OTCMarketRoute.createListing}
        variant='outlined'
        color='primary'
      >
        create a new listing
      </Button>
    </RootContainer>
  )
}
