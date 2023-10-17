import React from 'react'
import { Currency, CurrencyAmount, Percent, Token } from '@ixswap1/sdk-core'
import { Text } from 'rebass'
import { AutoColumn } from '../../components/Column'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import Row, { RowBetween } from '../../components/Row'
import { Field } from '../../state/mint/actions'
import { SemiTransparent, TYPE } from '../../theme'
import { Trans } from '@lingui/macro'
import { ModalHeaderWrapper } from './styleds'
import styled from 'styled-components/macro'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { isMobile } from 'react-device-detect'

const TextContainer = styled.div`
  color: #292933;
  font-size: 40px;
  font-weight: 600;
  line-height: 60px;
  margin-right: 10px;
  // @media (max-width: 768px) {
  //   font-size: 20px;
  // }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 18px;
  `};
`

const DescriptionText = styled(Text)`
  color: #292933;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  // @media (max-width: 768px) {
  //   font-size: 14px;
  // }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 14px;
  `};
`

const SemiTransparentText = styled(Text)`
  color: #666680;
  font-size: 16px;
  width: 75%;
  text-align: left;
  font-weight: 300;
  line-height: 18px;

  // @media (max-width: 768px) {
  //   width: 100%;
  //   font-size: 14px;
  // }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: 100%;
    font-size: 14px;
  `};
`

interface Props {
  noLiquidity?: boolean
  currencies: { [field in Field]?: Currency }
  liquidityMinted?: CurrencyAmount<Token>
  allowedSlippage: Percent
}

export const ModalHeader = ({ noLiquidity, currencies, liquidityMinted, allowedSlippage }: Props) => {
  const text = noLiquidity
    ? currencies[Field.CURRENCY_A]?.symbol + '/' + currencies[Field.CURRENCY_B]?.symbol
    : formatAmount(+(liquidityMinted?.toSignificant(10) || 0))

  return (
    <ModalHeaderWrapper>
      <AutoColumn gap="12px">
        <RowBetween style={{ flexWrap: 'wrap' }}>
          <TextContainer>{text}</TextContainer>
          <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={isMobile ? 30 : 50}
          />
        </RowBetween>
        {!noLiquidity && (
          <>
            <Row>
              <DescriptionText>
                {currencies[Field.CURRENCY_A]?.symbol + '/' + currencies[Field.CURRENCY_B]?.symbol + ' Pool Tokens'}
              </DescriptionText>
            </Row>
            <SemiTransparent>
              <SemiTransparentText>
                <Trans>
                  Output is estimated. If the price changes by more than{' '}
                  {formatAmount(+allowedSlippage.toSignificant(4))}% your transaction will revert.
                </Trans>
              </SemiTransparentText>
            </SemiTransparent>
          </>
        )}
      </AutoColumn>
    </ModalHeaderWrapper>
  )
}
