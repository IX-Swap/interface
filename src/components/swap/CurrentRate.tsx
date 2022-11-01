import React, { useState } from 'react'
import { Currency, Percent, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import { Trans } from '@lingui/macro'
import { AdvancedSwapDetails } from 'components/swap/AdvancedSwapDetails'
import { MouseoverTooltipContent } from 'components/Tooltip'
import styled from 'styled-components'
import Row, { RowEnd, RowFixed } from '../../components/Row'
import TradePrice from '../../components/swap/TradePrice'

interface Props {
  trade?: V2Trade<Currency, Currency, TradeType>
  allowedSlippage: Percent
}

const RateRow = styled(Row)<{ active: boolean }>`
  justify-content: space-between;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.text2};
  padding: 0 0 0 2rem;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 0 10px 0 1rem;
  `};
`

export const CurrentRate = ({ trade, allowedSlippage }: Props) => {
  const [showInverted, setShowInverted] = useState<boolean>(false)
  return (
    <RateRow active={!!trade} data-testid="currentRate">
      <RowFixed>
        <Trans>Current Rate</Trans>
      </RowFixed>
      {trade ? (
        <RowFixed>
          <MouseoverTooltipContent content={<AdvancedSwapDetails trade={trade} allowedSlippage={allowedSlippage} />}>
            <TradePrice price={trade.executionPrice} showInverted={showInverted} setShowInverted={setShowInverted} />
          </MouseoverTooltipContent>
        </RowFixed>
      ) : (
        <RowEnd style={{ maxWidth: '10px', paddingRight: '36px' }}>-</RowEnd>
      )}
    </RateRow>
  )
}
