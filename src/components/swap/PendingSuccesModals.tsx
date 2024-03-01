import { Currency, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import { Trans } from '@lingui/macro'
import ConfirmationModalContent, { TransactionErrorContent } from 'components/TransactionConfirmationModal'
import React, { useCallback } from 'react'

interface Props {
  trade?: V2Trade<Currency, Currency, TradeType>
  swapErrorMessage?: string
  onDismiss: () => void
  attemptingTxn: boolean
  txHash?: string
  isOpen: boolean
}
export const PendingSuccesModals = ({ trade, swapErrorMessage, onDismiss, attemptingTxn, txHash, isOpen }: Props) => {
  const pendingText = (
    <Trans>
      Swapping {trade?.inputAmount?.toSignificant(6)} {trade?.inputAmount?.currency?.symbol} for{' '}
      {trade?.outputAmount?.toSignificant(6)} {trade?.outputAmount?.currency?.symbol}
    </Trans>
  )
  const confirmationContent = useCallback(
    () => (swapErrorMessage ? <TransactionErrorContent onDismiss={onDismiss} message={swapErrorMessage} /> : null),
    [onDismiss, swapErrorMessage]
  )
  return (
    <ConfirmationModalContent
      isOpen={isOpen}
      onDismiss={onDismiss}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      content={confirmationContent}
      pendingText={pendingText}
      currencyToAdd={trade?.outputAmount.currency}
      trade={trade}
    />
  )
}
