import { Trans } from '@lingui/macro'
import { ChevronElement } from 'components/ChevronElement'
import MitigationBadge from 'components/MitigationBadge'
import JSBI from 'jsbi'
import { darken } from 'polished'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMitigationEnabled } from 'state/pool/hooks'
import styled from 'styled-components/macro'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { routes } from 'utils/routes'
import { BIG_INT_ZERO } from '../../constants/misc'
import { ButtonGradient, NewButtonGradient } from '../Button'
import { Text } from 'rebass'
import Card, { LightCard } from '../Card'
import { AutoColumn } from '../Column'
import { ButtonRow, RowBetween, RowCenter } from '../Row'
import { TextRow } from '../TextRow/TextRow'
import { CurrencyHeader } from './CurrencyHeader'
import { PositionCardProps } from './interfaces'
import { usePair } from './usePair'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

export const HorizontalLine = () => {
  const lineStyle = {
    border: '1px solid #E6E6FF',
    width: '100%',
    marginTop: '10px',
  }

  return <hr style={lineStyle} />
}

export const HoverCard = styled(Card)`
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.bg2)};
  }
`
const StyledPositionCard = styled(LightCard)`
  background: ${({ theme }) => theme.bg23};
  position: relative;
  overflow: hidden;
  padding: 2rem 2rem 1.5rem 2rem;
  border: 1px solid #e6e6ff;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  @media (max-width: 540px) {
    padding: 16px;
  }
`

export default function FullPositionCard({ pair }: PositionCardProps) {
  const [showMore, setShowMore] = useState(false)
  const {
    currency0,
    currency1,
    token0Deposited,
    token1Deposited,
    userPoolBalance,
    poolTokenPercentage,
    userDefaultPoolBalance,
  } = usePair({
    pair,
  })
  const mitigationEnabled = useMitigationEnabled(pair?.liquidityToken?.address)
  return (
    <StyledPositionCard>
      <AutoColumn gap="12px">
        <FixedHeightRow>
          <CurrencyHeader currency0={currency0} currency1={currency1} />
          {mitigationEnabled && <MitigationBadge />}
          <ChevronElement showMore={showMore} setShowMore={setShowMore} />
        </FixedHeightRow>

        {showMore && (
          <AutoColumn gap="8px">
            <TextRow
              textLeft={<Trans>Pooled {currency0.symbol}</Trans>}
              textRight={formatAmount(+(token0Deposited?.toSignificant(6) || 0))}
              currency={currency0}
            />
            <TextRow
              textLeft={<Trans>Pooled {currency1.symbol}</Trans>}
              textRight={formatAmount(+(token1Deposited?.toSignificant(6) || 0))}
              currency={currency1}
            />
            <TextRow
              textLeft={<Trans>Your pool tokens</Trans>}
              textRight={formatAmount(+(userPoolBalance?.toSignificant(4) || 0))}
            />

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
            <HorizontalLine />

            <RowCenter>
              <Trans>
                <Text
                  style={{
                    color: '#6666FF',
                    fontSize: '13px',
                    fontWeight: '600',
                    marginTop: '10px',
                    marginBottom: '8px',
                  }}
                >
                  View Pool Information
                </Text>
              </Trans>
            </RowCenter>
            {/* TODO: unhide when we have the link */}
            {/* <PoolInformation /> */}
            {userDefaultPoolBalance && JSBI.greaterThan(userDefaultPoolBalance.quotient, BIG_INT_ZERO) && (
              <ButtonRow marginTop="10px">
                <NewButtonGradient as={Link} to={routes.add(currency0, currency1)} data-testid="add-to-liquidity">
                  <Text color={'#6666FF'}>
                    <Trans>Add</Trans>
                  </Text>
                </NewButtonGradient>
                <NewButtonGradient as={Link} to={routes.remove(currency0, currency1)} data-testid="remove-liquidity">
                  <Text color={'#FF6161'}>
                    <Trans>Remove</Trans>
                  </Text>
                </NewButtonGradient>
              </ButtonRow>
            )}
            {/* {stakedBalance && JSBI.greaterThan(stakedBalance.quotient, BIG_INT_ZERO) && (
              <RowBetween marginTop="10px">
                <ButtonGradient as={Link} to={`/uni/${currencyId(currency0)}/${currencyId(currency1)}`} width="100%">
                  <Trans>Manage Liquidity in Rewards Pool</Trans>
                </ButtonGradient>
              </RowBetween>
            )} */}
          </AutoColumn>
        )}
      </AutoColumn>
    </StyledPositionCard>
  )
}
