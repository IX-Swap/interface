import React, { useMemo } from 'react'
import { DarkCard } from 'components/Card'
import { Trans } from '@lingui/macro'
import { Percent, Currency, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import { computeRealizedLPFeePercent } from '../../utils/prices'
import { AutoColumn } from '../Column'
import FormattedPriceImpact from './FormattedPriceImpact'
import SwapRoute from './SwapRoute'
import { TextRow } from '../TextRow/TextRow'

interface Props {
  trade?: V2Trade<Currency, Currency, TradeType>
  allowedSlippage: Percent
}
export const ConfirmSwapInfo = ({ trade, allowedSlippage }: Props) => {
  const { realizedLPFee, priceImpact } = useMemo(() => {
    if (!trade) return { realizedLPFee: undefined, priceImpact: undefined }

    const realizedLpFeePercent = computeRealizedLPFeePercent(trade)
    const realizedLPFee = trade.inputAmount.multiply(realizedLpFeePercent)
    const priceImpact = trade.priceImpact.subtract(realizedLpFeePercent)
    return { priceImpact, realizedLPFee }
  }, [trade])

  return !trade ? null : (
    <DarkCard>
      <AutoColumn gap="8px">
        <TextRow
          textLeft={<Trans>Liquidity Provider Fee</Trans>}
          textRight={<>{realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${realizedLPFee.currency.symbol}` : ''}</>}
        />
        <TextRow textLeft={<Trans>Route</Trans>} textRight={<SwapRoute trade={trade} />} />
        <TextRow
          textLeft={<Trans>Price impact</Trans>}
          textRight={<FormattedPriceImpact priceImpact={priceImpact} />}
        />
        <TextRow
          textLeft={
            <>
              {trade.tradeType === TradeType.EXACT_INPUT ? (
                <Trans>Minimum received</Trans>
              ) : (
                <Trans>Maximum sent</Trans>
              )}
            </>
          }
          textRight={
            <>
              {trade.tradeType === TradeType.EXACT_INPUT
                ? `${trade.minimumAmountOut(allowedSlippage).toSignificant(6)} ${trade.outputAmount.currency.symbol}`
                : `${trade.maximumAmountIn(allowedSlippage).toSignificant(6)} ${trade.inputAmount.currency.symbol}`}
            </>
          }
        />
        <TextRow textLeft={<Trans>Slippage tolerance</Trans>} textRight={<>{allowedSlippage.toFixed(2)}%</>} />
      </AutoColumn>
    </DarkCard>
  )
}
