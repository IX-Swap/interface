import React from 'react'
import { Button } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering } from 'types/dso'
import { InvestRoute } from 'app/pages/invest/router/config'

export interface DSOInvestLinkProps {
  dso: DigitalSecurityOffering
  variant?: 'text' | 'outlined' | 'contained'
}

export const DSOInvestLink = ({
  dso,
  variant = 'contained'
}: DSOInvestLinkProps) => {
  const { user } = useAuth()

  const isDisabled =
    dso.createdBy === user?._id || dso.subscriptionDocument === undefined

  return (
    <Button
      component={AppRouterLinkComponent}
      color='primary'
      variant={variant}
      to={InvestRoute.makeInvestment}
      params={{
        issuerId: dso.createdBy,
        dsoId: dso._id
      }}
      data-testid='invest-link'
      disabled={isDisabled}
      style={{ fontSize: variant === 'text' ? 16 : 12 }}
    >
      Invest
    </Button>
  )
}
