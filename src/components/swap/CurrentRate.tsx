import { Currency, Percent, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import { Trans } from '@lingui/macro'
import { AdvancedSwapDetails } from 'components/swap/AdvancedSwapDetails'
import { MouseoverTooltipContent } from 'components/Tooltip'
import React, { useState } from 'react'
import { Info } from 'react-feather'
import styled from 'styled-components'
import Row, { RowFixed } from '../../components/Row'
import TradePrice from '../../components/swap/TradePrice'

interface Props {
  trade?: V2Trade<Currency, Currency, TradeType>
  allowedSlippage: Percent
}

const StyledInfo = styled(Info)`
  opacity: 0.4;
  color: ${({ theme }) => theme.text1};
  height: 16px;
  width: 16px;
  :hover {
    opacity: 0.8;
  }
`
const RateRow = styled(Row)<{ active: boolean }>`
  justify-content: space-between;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.text2};
`

export const CurrentRate = ({ trade, allowedSlippage }: Props) => {
  const [showInverted, setShowInverted] = useState<boolean>(false)
  return (
    <RateRow active={!!trade}>
      <RowFixed>
        <Trans>Current Rate</Trans>
      </RowFixed>
      {trade ? (
        <RowFixed>
          <TradePrice price={trade.executionPrice} showInverted={showInverted} setShowInverted={setShowInverted} />
          <MouseoverTooltipContent content={<AdvancedSwapDetails trade={trade} allowedSlippage={allowedSlippage} />}>
            <StyledInfo />
          </MouseoverTooltipContent>
        </RowFixed>
      ) : (
        <Row justify="center" maxWidth="5rem">
          -
        </Row>
      )}
    </RateRow>
  )
}
