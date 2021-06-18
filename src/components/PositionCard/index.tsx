import React, { useState } from 'react'
import JSBI from 'jsbi'
import { Percent } from '@ixswap1/sdk-core'
import { darken } from 'polished'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useTotalSupply } from '../../hooks/useTotalSupply'
import { Trans } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/web3'
import { useTokenBalance } from '../../state/wallet/hooks'
import { currencyId } from '../../utils/currencyId'
import { unwrappedToken } from '../../utils/unwrappedToken'
import { ButtonGradient } from '../Button'

import { useColor } from '../../hooks/useColor'
import Card, { LightCard } from '../Card'
import { AutoColumn } from '../Column'
import { RowBetween, ButtonRow } from '../Row'
import { BIG_INT_ZERO } from '../../constants/misc'
import { PositionCardProps } from './interfaces'
import { CurrencyHeader } from './CurrencyHeader'
import { ChevronElement } from './ChevronElement'
import { routes } from 'utils/routes'
import { TextRow } from '../TextRow/TextRow'
import { PoolInformation } from './PoolInformation'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

export const HoverCard = styled(Card)`
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.bg2)};
  }
`
const StyledPositionCard = styled(LightCard)<{ bgColor: any }>`
  border: none;
  background: ${({ theme }) => theme.bgGradientDark};
  position: relative;
  overflow: hidden;
  padding: 2rem 2rem 1.5rem 2rem;
  margin-bottom: 0.5rem;
`

export default function FullPositionCard({ pair, border, stakedBalance }: PositionCardProps) {
  const { account } = useActiveWeb3React()
  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userDefaultPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  // if staked balance balance provided, add to standard liquidity amount
  const userPoolBalance = stakedBalance ? userDefaultPoolBalance?.add(stakedBalance) : userDefaultPoolBalance

  const poolTokenPercentage =
    !!userPoolBalance &&
    !!totalPoolTokens &&
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? new Percent(userPoolBalance.quotient, totalPoolTokens.quotient)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  const backgroundColor = useColor(pair?.token0)

  return (
    <StyledPositionCard border={border} bgColor={backgroundColor}>
      <AutoColumn gap="12px">
        <FixedHeightRow>
          <CurrencyHeader currency0={currency0} currency1={currency1} />
          <ChevronElement showMore={showMore} setShowMore={setShowMore} />
        </FixedHeightRow>

        {showMore && (
          <AutoColumn gap="8px">
            <TextRow
              textLeft={<Trans>Pooled {currency0.symbol}</Trans>}
              textRight={token0Deposited?.toSignificant(6)}
              currency={currency0}
            />
            <TextRow
              textLeft={<Trans>Pooled {currency1.symbol}</Trans>}
              textRight={token1Deposited?.toSignificant(6)}
              currency={currency1}
            />
            <TextRow textLeft={<Trans>IXS Rewards (on quit)</Trans>} textRight={stakedBalance?.toSignificant(4)} />
            <TextRow textLeft={<Trans>Your pool tokens</Trans>} textRight={userPoolBalance?.toSignificant(4)} />

            <TextRow
              textLeft={<Trans>Your pool share</Trans>}
              textRight={
                poolTokenPercentage ? (
                  <Trans>
                    {poolTokenPercentage?.toFixed(2) === '0.00' ? '<0.01' : poolTokenPercentage?.toFixed(2)} %
                  </Trans>
                ) : null
              }
            />
            {/* TODO: unhide when we have the link */}
            {/* <PoolInformation /> */}
            {userDefaultPoolBalance && JSBI.greaterThan(userDefaultPoolBalance.quotient, BIG_INT_ZERO) && (
              <ButtonRow marginTop="10px">
                <ButtonGradient as={Link} to={routes.add(currency0, currency1)}>
                  <Trans>Add</Trans>
                </ButtonGradient>
                <ButtonGradient as={Link} to={routes.remove(currency0, currency1)}>
                  <Trans>Remove Liquidity</Trans>
                </ButtonGradient>
              </ButtonRow>
            )}
            {stakedBalance && JSBI.greaterThan(stakedBalance.quotient, BIG_INT_ZERO) && (
              <RowBetween marginTop="10px">
                <ButtonGradient as={Link} to={`/uni/${currencyId(currency0)}/${currencyId(currency1)}`} width="100%">
                  <Trans>Manage Liquidity in Rewards Pool</Trans>
                </ButtonGradient>
              </RowBetween>
            )}
          </AutoColumn>
        )}
      </AutoColumn>
    </StyledPositionCard>
  )
}
