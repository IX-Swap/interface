import React from 'react'
import { Button } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering } from 'types/dso'
import { InvestRoute } from 'app/pages/invest/router/config'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'

import { history } from 'config/history'
import { safeGeneratePath } from 'helpers/router'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'

export interface PrimaryInvestLinkProps {
  type: 'Primary' | 'OTC' | 'TopOffers'
  data: DigitalSecurityOffering
}

export const PrimaryInvestLink = ({ data, type }: PrimaryInvestLinkProps) => {
  const { user } = useAuth()

  // TODO Add disabled logic for OTC
  const isDisabled = type !== 'OTC' ? data.createdBy === user?._id : true

  const link =
    // TODO Change route for OTC after complete OTC page
    type !== 'OTC' ? InvestRoute.makeInvestment : OTCMarketRoute.market

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
    <TwoFADialogWrapper>
      <Button
        color='primary'
        variant={'contained'}
        data-testid='otc-card-link'
        disabled={isDisabled}
        style={{ fontSize: 16, marginTop: 16 }}
        onClick={() => {
          history.push(safeGeneratePath(link, params), { ...params })
        }}
      >
        {type !== 'OTC' ? 'Invest' : 'Trade'}
      </Button>
    </TwoFADialogWrapper>
  )
}
