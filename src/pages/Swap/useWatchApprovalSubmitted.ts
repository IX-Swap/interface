import { Currency, Percent, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import { useEffect } from 'react'
import { useSubmitApproval, useSwapState } from 'state/swap/hooks'

export function useWatchApprovalSubmitted({
  trade,
  allowedSlippage,
}: {
  trade: V2Trade<Currency, Currency, TradeType> | undefined
  allowedSlippage: Percent
}) {
  const { approvalSubmitted } = useSwapState()

  const setApprovalSubmitted = useSubmitApproval()
  const [approvalState] = useApproveCallbackFromTrade(trade, allowedSlippage)

  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted, setApprovalSubmitted])
}
