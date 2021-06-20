import { Currency, WETH9 } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { TextRow } from 'components/TextRow/TextRow'
import JSBI from 'jsbi'
import React from 'react'
import { Text } from 'rebass'
import { useStakingInfo } from 'state/stake/hooks'
import { AutoColumn } from '../../components/Column'
import CurrencyLogo from '../../components/CurrencyLogo'
import { RowBetween, RowFixed } from '../../components/Row'
import { BIG_INT_ZERO } from '../../constants/misc'
import { useCurrency } from '../../hooks/Tokens'
import { Field } from '../../state/burn/actions'
import { SemiTransparent, StyledInternalLink } from '../../theme'
import { FormattedAmounts } from './interfaces'
import { RemovedLiquidityWrapper } from './styled'

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
  // ask Cucer why there is no staking info
  const stakingInfo = useStakingInfo()
  const stakingInfosWithBalance = stakingInfo?.filter((pool) =>
    JSBI.greaterThan(pool.stakedAmount.quotient, BIG_INT_ZERO)
  )
  return (
    <RowBetween>
      <Text fontSize={20} fontWeight={600} lineHeight={'30px'}>
        {textLeft}
      </Text>
      <RowFixed>
        <CurrencyLogo size={'33px'} currency={currency} style={{ marginRight: '12px' }} />
        <Text fontSize={20} fontWeight={600} lineHeight={'30px'} id={id}>
          {textRight}
        </Text>
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
      <AutoColumn gap="10px">
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
        <TextRow textLeft={<Trans>IXS Rewards</Trans>} textRight={<>{'-'}</>} />
        {chainId && (oneCurrencyIsWETH || oneCurrencyIsETH) ? (
          <SemiTransparent>
            <RowBetween style={{ justifyContent: 'flex-end' }}>
              {oneCurrencyIsETH ? (
                <StyledInternalLink
                  to={`/remove/${currencyA?.isNative ? WETH9[chainId].address : currencyIdA}/${
                    currencyB?.isNative ? WETH9[chainId].address : currencyIdB
                  }`}
                >
                  Receive WETH
                </StyledInternalLink>
              ) : oneCurrencyIsWETH ? (
                <StyledInternalLink
                  to={`/remove/${currencyA?.equals(WETH9[chainId]) ? 'ETH' : currencyIdA}/${
                    currencyB?.equals(WETH9[chainId]) ? 'ETH' : currencyIdB
                  }`}
                >
                  Receive ETH
                </StyledInternalLink>
              ) : null}
            </RowBetween>
          </SemiTransparent>
        ) : null}
      </AutoColumn>
    </RemovedLiquidityWrapper>
  )
}
