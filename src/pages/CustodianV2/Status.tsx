import React, { FC } from 'react'
import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'

import { TYPE } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'

import { StyledButtonMuted } from './styleds'

interface Props {
  status: string
  amount: CurrencyAmount<Currency> | undefined
  decimals: number
}

export const Status: FC<Props> = ({ status, amount: propAmount, decimals }: Props) => {
  const amount = formatCurrencyAmount(propAmount, decimals ?? 18)

  const getStatus = () => {
    switch (status) {
      case 'approved':
        return (
          <TYPE.description7 color="text1" overflow="hidden" style={{ textOverflow: 'ellipsis' }}>
            {amount}
          </TYPE.description7>
        )
      case 'pending':
      case 'new':
        return (
          <StyledButtonMuted color={'text1'}>
            <Trans>Pending...</Trans>
          </StyledButtonMuted>
        )
      case 'failed':
        return (
          <StyledButtonMuted color="rgba(237, 3, 118, 1)">
            <Trans>Failed</Trans>
          </StyledButtonMuted>
        )
      case 'declined':
        return (
          <StyledButtonMuted color="rgba(237, 3, 118, 1)">
            <Trans>Rejected</Trans>
          </StyledButtonMuted>
        )
      default:
        return null
    }
  }

  return getStatus()
}
