import { Currency, Percent } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import React from 'react'
import { Text } from 'rebass'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { AutoColumn } from '../../components/Column'
import CurrencyLogo from '../../components/CurrencyLogo'
import { RowBetween, RowFixed } from '../../components/Row'
import { Field } from '../../state/burn/actions'
import { SemiTransparent, TYPE } from '../../theme'
import { ParsedAmounts } from './interfaces'
import { ModalHeaderWrapper } from './styled'
import { isMobile } from 'react-device-detect'

interface Props {
  parsedAmounts: ParsedAmounts
  currencyA?: Currency
  currencyB?: Currency
  allowedSlippage: Percent
}
export const ModalHeader = ({ parsedAmounts, currencyA, currencyB, allowedSlippage }: Props) => {
  return (
    <ModalHeaderWrapper>
      <AutoColumn gap="12px">
        <RowBetween align="flex-end">
          <Text color={'#292933'} fontSize={isMobile ? '24px' : '32px'} fontWeight={700} lineHeight="60px">
            {formatAmount(+(parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) || 0))}
          </Text>
          <RowFixed gap="4px">
            <CurrencyLogo currency={currencyA} size={'33px'} />
            <Text color={'#292933'} fontSize="14px" fontWeight={600} lineHeight="60px" marginLeft={'7px'}>
              {currencyA?.symbol}
            </Text>
          </RowFixed>
        </RowBetween>
        <RowBetween align="flex-end">
          <Text color={'#292933'} fontSize={isMobile ? '24px' : '32px'} fontWeight={700} lineHeight="60px">
            {formatAmount(+(parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) || 0))}
          </Text>
          <RowFixed gap="4px">
            <CurrencyLogo currency={currencyB} size={'33px'} />
            <Text color={'#292933'} fontSize="14px" fontWeight={600} lineHeight="60px" marginLeft={'7px'}>
              {currencyB?.symbol}
            </Text>
          </RowFixed>
        </RowBetween>

        <RowFixed gap="4px">
          <Text width={isMobile ? '100%' : '70%'} fontSize={isMobile ? '14px' : '16px'} color={'#666680'}>
            <Trans>
              Output is estimated. If the price changes by more than {formatAmount(+allowedSlippage.toSignificant(4))}%
              your transaction will revert.
            </Trans>
          </Text>
        </RowFixed>
        {/* <SemiTransparent>
          <TYPE.italic fontSize={12} textAlign="left" fontWeight={300} lineHeight={'18px'}>
      
          </TYPE.italic>
        </SemiTransparent> */}
      </AutoColumn>
    </ModalHeaderWrapper>
  )
}
