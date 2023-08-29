import { Currency, Percent } from '@ixswap1/sdk-core'
import React, { useContext } from 'react'
import { Text } from 'rebass'
import styled, { ThemeContext } from 'styled-components'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { AutoColumn } from '../../components/Column'
import { AutoRow } from '../../components/Row'
import { ONE_BIPS } from '../../constants/misc'
import { Field } from '../../state/mint/actions'
import { TYPE } from '../../theme'

const Row = styled(AutoRow)`
  justify: space-around;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: start;
  `};
`

export function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  // price?: Price<Currency, Currency>
  price?: any
}) {
  const theme = useContext(ThemeContext)
  return (
    <AutoColumn gap="md">
      <Row justify="space-around" gap="4px">
        <AutoColumn style={{ padding: '25px', border: 'solid 1px #E6E6FF' }} justify="center">
          <Text fontWeight={500} color={theme.text12}>
            {formatAmount(+(price?.toSignificant(6) || 0)) ?? '-'}
          </Text>
          <Text fontWeight={500} fontSize={14} color={theme.text11} pt={1}>
            {currencies[Field.CURRENCY_B]?.symbol} per {currencies[Field.CURRENCY_A]?.symbol}
          </Text>
        </AutoColumn>
        <AutoColumn style={{ padding: '25px', border: 'solid 1px #E6E6FF' }} justify="center">
          <Text fontWeight={500} color={theme.text12}>
            {formatAmount(+(price?.invert()?.toSignificant(6) || 0)) ?? '-'}
          </Text>
          <Text fontWeight={500} fontSize={14} color={theme.text11} pt={1}>
            {currencies[Field.CURRENCY_A]?.symbol} per {currencies[Field.CURRENCY_B]?.symbol}
          </Text>
        </AutoColumn>
        <AutoColumn style={{ padding: '25px', border: 'solid 1px #E6E6FF' }} justify="center">
          <Text fontWeight={500} color={theme.text12}>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </Text>
          <Text fontWeight={500} fontSize={14} color={theme.text11} pt={1}>
            Share of Pool
          </Text>
        </AutoColumn>
      </Row>
    </AutoColumn>
  )
}
