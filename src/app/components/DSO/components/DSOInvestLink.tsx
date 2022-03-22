import React from 'react'
import { Button } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering } from 'types/dso'
import { InvestRoute } from 'app/pages/invest/router/config'

export interface DSOInvestLinkProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestLink = ({ dso }: DSOInvestLinkProps) => {
  const { user } = useAuth()

  const isDisabled =
    dso.createdBy === user?._id || dso.subscriptionDocument === undefined

  return (
    <Button
      component={AppRouterLinkComponent}
      color='primary'
      variant='contained'
      to={InvestRoute.makeInvestment}
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
