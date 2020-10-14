import React from 'react'
import { Button } from '@material-ui/core'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { useOfferingsRouter } from 'v2/app/pages/invest/routers/offeringsRouter'

export const InvestLink = () => {
  const { paths, params } = useOfferingsRouter()

  return (
    <Button color='primary' variant='contained'>
      <AppRouterLink to={paths.makeInvestment} params={params}>
        Invest
      </AppRouterLink>
    </Button>
  )
}
