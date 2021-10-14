import { useCallback } from 'react'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { useApproveCallbackFromTrade } from '../../hooks/useApproveCallback'
import { useERC20PermitFromTrade, UseERC20PermitState } from '../../hooks/useERC20Permit'

export function useSwapApproval() {
  const { toggledTrade: trade, allowedSlippage } = useDerivedSwapInfo()

  const { state: signatureState, gatherPermitSignature } = useERC20PermitFromTrade(trade, allowedSlippage)

  const [approvalState, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  const handleApprove = useCallback(async () => {
    if (signatureState === UseERC20PermitState.NOT_SIGNED && gatherPermitSignature) {
      try {
        await gatherPermitSignature()
      } catch (error) {
        // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
        if ((error as any)?.code !== 4001) {
          await approveCallback()
        }
      }
    } else {
      await approveCallback()
    }
  }, [approveCallback, gatherPermitSignature, signatureState])

  return { approvalState, signatureState, handleApprove }
}
