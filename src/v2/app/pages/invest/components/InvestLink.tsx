import React from 'react'
import { Button } from '@material-ui/core'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import { useOfferingsRouter } from 'v2/app/pages/invest/routers/offeringsRouter'

export const InvestLink = () => {
  const { paths, params } = useOfferingsRouter()

  return (
    <Button
      component={AppRouterLinkComponent}
      color='primary'
      variant='contained'
      to={paths.makeInvestment}
      params={params}
    >
      Invest
    </Button>
  )
}
