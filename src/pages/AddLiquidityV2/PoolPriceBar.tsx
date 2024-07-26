import { Currency, Percent } from '@ixswap1/sdk-core'
import React from 'react'
import { Flex, Text } from 'rebass'
import styled from 'styled-components'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { AutoColumn } from '../../components/Column'
import { ONE_BIPS } from '../../constants/misc'
import { Field } from '../../state/mint/actions'

export function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: any
}) {
  return (
    <AutoColumn gap="md">
      <Flex style={{gap: 10}}>
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
      </Flex>

      <SharePoolWrap>
        <StyledText>
          {noLiquidity && price
            ? '100'
            : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
          %
        </StyledText>
        <StyledLabel style={{ textAlign: 'center' }}>Share of Pool</StyledLabel>
      </SharePoolWrap>
    </AutoColumn>
  )
}

const SharePoolWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center:
  width: 100%;
  border: solid 1px #e6e6ff;
  padding: 20px;
  border-radius: 8px;
`


const StyledAutoColumn = styled(AutoColumn)`
  padding: 20px;
  border: solid 1px #e6e6ff;
  justify-content: center;
  flex: 1;
  border-radius: 8px;
`

const StyledText = styled(Text)`
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.text12};

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
`
