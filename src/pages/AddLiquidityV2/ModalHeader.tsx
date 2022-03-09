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
import { formatAmount } from 'utils/formatCurrencyAmount'

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
          <Text fontSize="40px" fontWeight={600} lineHeight="60px" marginRight={10}>
            {text}
          </Text>
          <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={30}
          />
        </RowBetween>
        {!noLiquidity && (
          <>
            <Row>
              <Text fontSize="20px" lineHeight={'30px'}>
                {currencies[Field.CURRENCY_A]?.symbol + '/' + currencies[Field.CURRENCY_B]?.symbol + ' Pool Tokens'}
              </Text>
            </Row>
            <SemiTransparent>
              <TYPE.italic fontSize={12} textAlign="left" fontWeight={300} lineHeight={'18px'}>
                <Trans>
                  Output is estimated. If the price changes by more than{' '}
                  {formatAmount(+allowedSlippage.toSignificant(4))}% your transaction will revert.
                </Trans>
              </TYPE.italic>
            </SemiTransparent>
          </>
        )}
      </AutoColumn>
    </ModalHeaderWrapper>
  )
}
