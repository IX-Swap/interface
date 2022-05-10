import { Button, ButtonProps } from '@mui/material'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { InvestRoute } from 'app/pages/invest/router/config'
import { useAuth } from 'hooks/auth/useAuth'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

export interface DSOInvestButtonProps extends ButtonProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestButton = ({ dso }: DSOInvestButtonProps) => {
  const { user } = useAuth()
  const isInvestButtonDisabled = dso.createdBy === user?._id
  const params = { dsoId: dso._id, issuerId: dso.user }

  return (
    <TwoFADialogWrapper>
      <Button
        variant='contained'
        disabled={isInvestButtonDisabled}
        disableElevation
        component={AppRouterLinkComponent}
        to={InvestRoute.makeInvestment}
        params={params}
      >
        Invest
      </Button>
    </TwoFADialogWrapper>
  )
}
