import React, { useState } from 'react'
import { Pair } from '@ixswap1/v2-sdk'
import { Trans } from '@lingui/macro'
import { ChevronElement } from 'components/ChevronElement'
import { usePair } from 'components/PositionCard/usePair'
import JSBI from 'jsbi'
import { darken } from 'polished'
import { Link } from 'react-router-dom'
import { Box } from 'rebass'
import styled from 'styled-components/macro'
import { routes } from 'utils/routes'
import { BIG_INT_ZERO } from '../../constants/misc'
import { ButtonGradient } from '../Button'
import Card, { LightCard } from '../Card'
import { AutoColumn } from '../Column'
import { RowBetween, RowCenter } from '../Row'
import { TextRow } from '../TextRow/TextRow'
import { CurrencyHeader } from './CurrencyHeader'
import { Status } from './Status'
import { STOStatus } from './STOStatus'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

export const HoverCard = styled(Card)`
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.bg2)};
  }
`
const StyledPositionCard = styled(LightCard)`
  border: none;
  background: ${({ theme }) => theme.bgG4};
  position: relative;
  overflow: hidden;
  padding: 2rem 2rem 1.5rem 2rem;
  margin-bottom: 0.5rem;
`

export default function SecurityCard({ pair }: { pair: Pair }) {
  const [showMore, setShowMore] = useState(false)
  const { currency0, currency1, userDefaultPoolBalance } = usePair({
    pair,
  })
  // TODO: adjust status when you will have the data
  return (
    <StyledPositionCard>
      <AutoColumn gap="12px">
        <FixedHeightRow>
          <CurrencyHeader currency={currency0} />
          <Box style={{ gap: '6px', display: 'flex', width: 'fit-content' }}>
            <Status status={STOStatus.PENDING} />
            <ChevronElement showMore={showMore} setShowMore={setShowMore} />
          </Box>
        </FixedHeightRow>

        {showMore && (
          <AutoColumn gap="8px">
            <TextRow textLeft={<Trans>Token ID</Trans>} />
            <TextRow textLeft={<Trans>Deposit address wallet</Trans>} />
            <TextRow textLeft={<Trans>Amount</Trans>} />
            <TextRow textLeft={<Trans>Deadline</Trans>} />
            {userDefaultPoolBalance && JSBI.greaterThan(userDefaultPoolBalance.quotient, BIG_INT_ZERO) && (
              <RowCenter marginTop="10px">
                <ButtonGradient as={Link} to={routes.securityTokens(currency0)} width={'50%'} data-testid="token-info">
                  <Trans>Info</Trans>
                </ButtonGradient>
              </RowCenter>
            )}
          </AutoColumn>
        )}
      </AutoColumn>
    </StyledPositionCard>
  )
}
