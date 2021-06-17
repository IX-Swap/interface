import React from 'react'
import { Currency } from '@ixswap1/sdk-core'
import { Text } from 'rebass'
import styled from 'styled-components/macro'
import CurrencyLogo from '../CurrencyLogo'
import { RowBetween, RowFixed } from '../Row'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
  font-size: 16px;
  line-height: 24px;
  font-weight: normal;
  color: ${({ theme }) => theme.text2};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 14px;
  `};
`
interface Props {
  textLeft: React.ReactNode
  textRight?: React.ReactNode
  currency?: Currency
}

export const TextRow = ({ textLeft, textRight, currency }: Props) => {
  return (
    <FixedHeightRow>
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
