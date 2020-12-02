import React from 'react'
import { Button } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useOfferingsRouter } from 'app/pages/invest/routers/offeringsRouter'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering } from 'types/dso'

export interface DSOInvestLinkProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestLink = ({ dso }: DSOInvestLinkProps) => {
  const { paths } = useOfferingsRouter()
  const { user } = useAuth()

  const isDisabled =
    dso.createdBy === user?._id || dso.subscriptionDocument === undefined

  return (
    <Button
      component={AppRouterLinkComponent}
      color='primary'
      variant='contained'
      to={paths.makeInvestment}
      params={{
        issuerId: dso.createdBy,
        dsoId: dso._id
      }}
      data-testid='invest-link'
      disabled={isDisabled}
    >
      Invest
    </Button>
  )
}
