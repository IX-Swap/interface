import { Currency } from '@ixswap1/sdk-core'
import React from 'react'
import { Text } from 'rebass'
import CurrencyLogo from '../CurrencyLogo'
import { RowFixed } from '../Row'
import { FixedHeightRow } from './styleds'
interface Props {
  textLeft: React.ReactNode
  textRight?: React.ReactNode
  currency?: Currency
}

export const TextRow = ({ textLeft, textRight, currency }: Props) => {
  return (
    <FixedHeightRow data-testid="tableRow">
      <RowFixed>
        <Text>{textLeft}</Text>
      </RowFixed>
      <RowFixed>
        {currency && textRight && <CurrencyLogo size="20px" style={{ marginRight: '8px' }} currency={currency} />}
        <Text>{textRight ?? '-'}</Text>
      </RowFixed>
    </FixedHeightRow>
  )
}
