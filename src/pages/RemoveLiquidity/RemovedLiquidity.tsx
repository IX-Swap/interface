import { Currency, WETH9 } from '@ixswap1/sdk-core'
import React from 'react'
import { Text } from 'rebass'
import { AutoColumn } from '../../components/Column'
import CurrencyLogo from '../../components/CurrencyLogo'
import { RowBetween, RowFixed } from '../../components/Row'
import { useCurrency } from '../../hooks/Tokens'
import { Field } from '../../state/burn/actions'
import { SemiTransparent, StyledInternalLink } from '../../theme'
import { FormattedAmounts } from './interfaces'
import { RemovedLiquidityWrapper } from './styled'
import { TextRow } from 'components/TextRow/TextRow'
import { t, Trans } from '@lingui/macro'
import { NewButtonGradient } from 'components/Button'
interface Props {
  currencyIdA: string
  currencyIdB: string
  chainId?: number
  formattedAmounts: FormattedAmounts
}

interface RemovedLiquidityProps {
  textLeft: React.ReactElement
  textRight: React.ReactElement
  currency?: Currency
  id: string
}

const RemovedLiquidityRow = ({ textLeft, textRight, currency, id }: RemovedLiquidityProps) => {
  return (
    <RowBetween>
      <Text color={'#292933'} fontSize={20} fontWeight={500} lineHeight={'30px'}>
        {textLeft}
      </Text>
      <RowFixed>
        <Text
          color={'#292933'}
          fontSize={20}
          fontWeight={500}
          style={{ marginRight: '12px' }}
          lineHeight={'30px'}
          id={id}
        >
          {textRight}
        </Text>
        <CurrencyLogo size={'33px'} currency={currency} />
      </RowFixed>
    </RowBetween>
  )
}

export const RemovedLiquidity = ({ currencyIdA, currencyIdB, chainId, formattedAmounts }: Props) => {
  const [currencyA, currencyB] = [useCurrency(currencyIdA) ?? undefined, useCurrency(currencyIdB) ?? undefined]
  const oneCurrencyIsETH = currencyA?.isNative || currencyB?.isNative
  const oneCurrencyIsWETH = Boolean(
    chainId && WETH9[chainId] && (currencyA?.equals(WETH9[chainId]) || currencyB?.equals(WETH9[chainId]))
  )
  return (
    <RemovedLiquidityWrapper>
      <AutoColumn gap="20px">
        <RemovedLiquidityRow
          textLeft={<>{formattedAmounts[Field.CURRENCY_A] || '-'}</>}
          textRight={<>{currencyA?.symbol}</>}
          currency={currencyA}
          id={'remove-liquidity-tokena-symbol'}
        />
        <RemovedLiquidityRow
          textLeft={<>{formattedAmounts[Field.CURRENCY_B] || '-'}</>}
          textRight={<>{currencyB?.symbol}</>}
          currency={currencyB}
          id={'remove-liquidity-tokenb-symbol'}
        />
        <TextRow textLeft={<Trans>IXS Rewards</Trans>} textRight={<>-</>} />
        {chainId && (oneCurrencyIsWETH || oneCurrencyIsETH) ? (
          <NewButtonGradient style={{ marginBottom: '30px' }}>
            <RowBetween style={{ justifyContent: 'flex-end' }}>
              {oneCurrencyIsETH ? (
                <StyledInternalLink
                  style={{ color: '#6666FF' }}
                  to={`/remove/${currencyA?.isNative ? WETH9[chainId].address : currencyIdA}/${
                    currencyB?.isNative ? WETH9[chainId].address : currencyIdB
                  }`}
                >
                  Receive WETH
                </StyledInternalLink>
              ) : oneCurrencyIsWETH ? (
                <StyledInternalLink
                  style={{ color: '#6666FF' }}
                  to={`/remove/${currencyA?.equals(WETH9[chainId]) ? 'ETH' : currencyIdA}/${
                    currencyB?.equals(WETH9[chainId]) ? 'ETH' : currencyIdB
                  }`}
                >
                  Receive ETH
                </StyledInternalLink>
              ) : null}
            </RowBetween>
          </NewButtonGradient>
        ) : null}
      </AutoColumn>
    </RemovedLiquidityWrapper>
  )
}
