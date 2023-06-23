import React from 'react'
import { Button } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering } from 'types/dso'
import { InvestRoute } from 'app/pages/invest/router/config'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

export interface DSOCardActionProps {
  type: 'Primary' | 'OTC' | 'TopOffers'
  data: DigitalSecurityOffering
}

export const DSOCardAction = ({ data, type }: DSOCardActionProps) => {
  const { user } = useAuth()

  const isDisabled = data.createdBy === user?._id

  const link = type !== 'OTC' ? InvestRoute.makeInvestment : InvestRoute.trading

  const params =
    type !== 'OTC'
      ? {
          issuerId: data.user,
          dsoId: data._id
        }
      : {
          pairId: data._id
        }

  return (
    <TwoFADialogWrapper>
      <Button
        fullWidth
        component={AppRouterLinkComponent}
        color='primary'
        variant={'contained'}
        to={link}
        params={params}
        data-testid='otc-card-link'
        disabled={isDisabled}
        style={{ fontSize: 16, marginTop: 24 }}
      >
        {type !== 'OTC' ? 'Invest' : 'Trade'}
      </Button>
    </TwoFADialogWrapper>
  )
}