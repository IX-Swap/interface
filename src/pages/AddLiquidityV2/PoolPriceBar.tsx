import { Currency, Percent } from '@ixswap1/sdk-core'
import React, { useContext } from 'react'
import { Text } from 'rebass'
import styled, { ThemeContext, css } from 'styled-components'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { AutoColumn } from '../../components/Column'
import { AutoRow } from '../../components/Row'
import { ONE_BIPS } from '../../constants/misc'
import { Field } from '../../state/mint/actions'
import { TYPE } from '../../theme'

const Row = styled(AutoRow)`
  justify: space-around;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    // justify-content: start;
  `};
`

const StyledAutoColumn = styled(AutoColumn)`
  padding: 20px;
  border: solid 1px #e6e6ff;
  justify-content: center;

  // @media (max-width: 768px) {
  // padding: 10px 5px 10px 5px;

  // }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    flex-direction: row;
    padding: 15px 5px 15px 5px;
    justify-content: space-between;
    align-items: center;
  `};
`

const StyledText = styled(Text)`
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.text12};
  // @media (max-width: 768px) {
  //   font-weight: 400;
  //   font-size: 12px;
  // }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-weight: 400;
    font-size: 12px;
  `};
`

const StyledLabel = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.text11};
  padding-top: 1px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-weight: 400;
    font-size: 10px;
  `};

  // @media (max-width: 768px) {
  //   font-weight: 400;
  //   font-size: 10px;
  // }
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
      <Row justify="space-around" gap="3px">
        <StyledAutoColumn>
          <StyledText>{formatAmount(+(price?.toSignificant(6) || 0)) ?? '-'}</StyledText>
          <StyledLabel>
            {currencies[Field.CURRENCY_B]?.symbol} per {currencies[Field.CURRENCY_A]?.symbol}
          </StyledLabel>
        </StyledAutoColumn>
        <StyledAutoColumn>
          <StyledText>{formatAmount(+(price?.invert()?.toSignificant(6) || 0)) ?? '-'}</StyledText>
          <StyledLabel>
            {currencies[Field.CURRENCY_A]?.symbol} per {currencies[Field.CURRENCY_B]?.symbol}
          </StyledLabel>
        </StyledAutoColumn>
        <StyledAutoColumn>
          <StyledText>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </StyledText>
          <StyledLabel>Share of Pool</StyledLabel>
        </StyledAutoColumn>
      </Row>
    </AutoColumn>
  )
}
