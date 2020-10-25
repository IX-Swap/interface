import React from 'react'
import { Button } from '@material-ui/core'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import { useOfferingsRouter } from 'v2/app/pages/invest/routers/offeringsRouter'
import { useDSOById } from 'v2/app/pages/invest/hooks/useDSOById'
import { useAuth } from 'v2/hooks/auth/useAuth'

export const InvestLink = () => {
  const { paths, params } = useOfferingsRouter()
  const { data, isLoading } = useDSOById(params.dsoId, params.issuerId)
  const { user } = useAuth()

  if (isLoading || data === undefined) {
    return null
  }

  const isDisabled =
    params.issuerId === user?._id || data.subscriptionDocument === undefined

  return (
    <Button
      component={AppRouterLinkComponent}
      color='primary'
      variant='contained'
      to={paths.makeInvestment}
      params={params}
      data-testid='invest-link'
      disabled={isDisabled}
    >
      Invest
    </Button>
  )
}
