import { Button, ButtonProps } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { InvestRoute } from 'app/pages/invest/router/config'
import { useAuth } from 'hooks/auth/useAuth'

export interface DSOInvestButtonProps extends ButtonProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestButton = ({ dso }: DSOInvestButtonProps) => {
  const { user } = useAuth()
  const isInvestButtonDisabled = dso.createdBy === user?._id

  return (
    <Button
      variant='contained'
      disabled={isInvestButtonDisabled}
      disableElevation
      component={AppRouterLinkComponent}
      to={InvestRoute.makeInvestment}
      params={{ dsoId: dso._id, issuerId: dso.user }}
    >
      Invest
    </Button>
  )
}
