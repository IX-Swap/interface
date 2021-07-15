import { Currency, Percent, TradeType } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import React from 'react'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import { TYPE } from 'theme'
import { isAddress, shortenAddress } from 'utils'
import { AutoColumn } from '../../components/Column'

interface Props {
  recipient: string | null
  trade: V2Trade<Currency, Currency, TradeType>
  allowedSlippage: Percent
}
export const OutputInfo = ({ trade, allowedSlippage, recipient }: Props) => {
  return (
    <div style={{ opacity: '0.7' }}>
      <AutoColumn justify="flex-start" gap="sm" style={{ padding: '0 2rem' }}>
        {trade.tradeType === TradeType.EXACT_INPUT ? (
          <TYPE.description2>
            <Trans>
              Output is estimated. You will receive at least{' '}
              <b>
                {trade.minimumAmountOut(allowedSlippage).toSignificant(6)} {trade.outputAmount.currency.symbol}
              </b>{' '}
              or the transaction will revert.
            </Trans>
          </TYPE.description2>
        ) : (
          <TYPE.description2>
            <Trans>
              Input is estimated. You will sell at most{' '}
              <b>
                {trade.maximumAmountIn(allowedSlippage).toSignificant(6)} {trade.inputAmount.currency.symbol}
              </b>{' '}
              or the transaction will revert.
            </Trans>
          </TYPE.description2>
        )}
        {requestAnimationFrame !== null && recipient ? (
          <TYPE.description2>
            <Trans>
              Output will be sent to{' '}
              <b title={recipient}>{isAddress(recipient) ? shortenAddress(recipient) : recipient}</b>.
            </Trans>
          </TYPE.description2>
        ) : null}
      </AutoColumn>
    </div>
  )
}
