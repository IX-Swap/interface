import React, { FC } from 'react'
import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'

import { TYPE } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'

import { StyledButtonMuted } from './styleds'
import PendingIcon from 'assets/images/newPending.svg'
import RejectIcon from 'assets/images/newReject.svg'

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
          <StyledButtonMuted display="flex" color={'text1'}>
            <Trans>Pending</Trans>
            <img style={{ marginLeft: '7px' }} width="20px" src={PendingIcon} alt="PendingIcon" />
          </StyledButtonMuted>
        )
      case 'failed':
        return (
          <StyledButtonMuted display="flex" color={'text1'}>
            <Trans>Failed</Trans>
            <img style={{ marginLeft: '7px' }} width="20px" src={RejectIcon} alt="RejectIcon" />
          </StyledButtonMuted>
        )
      case 'declined':
        return (
          <StyledButtonMuted display="flex" color={'text1'}>
            <Trans>Rejected</Trans>
            <img style={{ marginLeft: '7px' }} width="20px" src={RejectIcon} alt="RejectIcon" />
          </StyledButtonMuted>
        )
      default:
        return null
    }
  }

  return getStatus()
}
