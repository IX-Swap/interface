import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import React, { FC } from 'react'

import { AccreditationStatusEnum } from 'components/Vault/enum'
import { TYPE } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'

interface Props {
  status: AccreditationStatusEnum
  amount: CurrencyAmount<Currency> | undefined
  decimals: number
}

export const Status: FC<Props> = ({ status, amount, decimals }: Props) => {
  const getStatus = () => {
    switch (status) {
      case 'approved':
        return <TYPE.description7 color="text1">{formatCurrencyAmount(amount, decimals ?? 18)}</TYPE.description7>
      case 'pending-custodian':
        return <TYPE.buttonMuted>Pending...</TYPE.buttonMuted>
      case 'pending-kyc':
        return <TYPE.buttonMuted>Pending KYC...</TYPE.buttonMuted>
      case 'failed':
        return <TYPE.buttonMuted color="rgba(237, 3, 118, 1)">Failed</TYPE.buttonMuted>
      case 'declined':
        return <TYPE.buttonMuted color="rgba(237, 3, 118, 1)">Declined</TYPE.buttonMuted>
      default:
        return null
    }
  }

  return getStatus()
}
