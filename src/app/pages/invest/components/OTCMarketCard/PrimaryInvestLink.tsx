import React from 'react'
import { Button } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering } from 'types/dso'
import { InvestRoute } from 'app/pages/invest/router/config'

export interface PrimaryInvestLinkProps {
  type: 'Primary' | 'OTC' | 'TopOffers'
  data: DigitalSecurityOffering
}

export const PrimaryInvestLink = ({ data, type }: PrimaryInvestLinkProps) => {
  const { user } = useAuth()

  const isDisabled = data.createdBy === user?._id

  const link = type !== 'OTC' ? InvestRoute.makeInvestment : InvestRoute.trading

  const params =
    type !== 'OTC'
      ? {
          issuerId: data.createdBy,
          dsoId: data._id
        }
      : {
          pairId: data._id
        }

  return (
    <Button
      component={AppRouterLinkComponent}
      color='primary'
      variant={'contained'}
      to={link}
      params={params}
      data-testid='otc-card-link'
      disabled={isDisabled || data?.disableInvestInCampaign === true}
      style={{ fontSize: 16, marginTop: 16 }}
    >
      {type !== 'OTC' ? 'Invest' : 'Trade'}
    </Button>
  )
}
