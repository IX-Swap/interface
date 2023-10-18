import { Currency } from '@ixswap1/sdk-core'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import React from 'react'
import { Text } from 'rebass'
import { RowFixed } from '../Row'
import { FixedHeightRow } from './styleds'

interface Props {
  textLeft: React.ReactNode
  textRight?: React.ReactNode
  currencyA?: Currency
  currencyB?: Currency
}

export const TextRowDoubleCurrency = ({ textLeft, textRight, currencyA, currencyB }: Props) => {
  const showCurrency = currencyA && currencyB && textRight
  return (
    <FixedHeightRow>
      <RowFixed>
        <Text color={'#292933'}>{textLeft}</Text>
      </RowFixed>
      <RowFixed>
        <Text color={'#292933'} marginRight={'10px'}>
          {textRight ?? '-'}
        </Text>
        {showCurrency && <DoubleCurrencyLogo currency0={currencyA} currency1={currencyB} margin={false} />}
      </RowFixed>
    </FixedHeightRow>
  )
}
