import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import React, { FC } from 'react'

import { AccreditationStatusEnum } from 'components/Vault/enum'
import { TYPE } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { Trans } from '@lingui/macro'

interface Props {
  status: AccreditationStatusEnum
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
      case 'pending-custodian':
      case 'new':
      case 'pending-kyc':
        return (
          <TYPE.buttonMuted color={'text1'}>
            <Trans>Pending...</Trans>
          </TYPE.buttonMuted>
        )
      case 'failed':
        return (
          <TYPE.buttonMuted color="rgba(237, 3, 118, 1)">
            <Trans>Failed</Trans>
          </TYPE.buttonMuted>
        )
      case 'declined':
        return (
          <TYPE.buttonMuted color="rgba(237, 3, 118, 1)">
            <Trans>Rejected</Trans>
          </TYPE.buttonMuted>
        )
      default:
        return null
    }
  }

  return getStatus()
}
