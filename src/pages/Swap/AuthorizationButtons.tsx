import { ButtonIXSGradient } from 'components/Button'
import { RowBetween } from 'components/Row'
import { useSwapAuthorizeFirstStep } from 'hooks/useSwapAuthorize'
import { useMissingAuthorizations } from 'hooks/useSwapCallback'
import React, { useEffect, useState } from 'react'
import { useBrokerDealerState, useFakeApprovalState, useToggleFakeApproval } from 'state/application/hooks'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { useSubmitBrokerDealerForm } from 'state/swapHelper/hooks'
import { useUserSecTokens } from 'state/user/hooks'

export const AuthorizationButtons = ({ formRef, allowSwap }: { formRef: any; allowSwap: boolean }) => {
  const showFakeApproval = useFakeApprovalState()
  const setShowFakeApproval = useToggleFakeApproval()

  const brokerDealerDTO = useBrokerDealerState()
  const submitToBrokerDealer = useSubmitBrokerDealerForm()

  // const [removeApproval, setRemoveApproval] = useState(false)

  const { toggledTrade: trade, allowedSlippage } = useDerivedSwapInfo()
  const missingAuthorizations = useMissingAuthorizations(trade)
  const { secTokens } = useUserSecTokens()
  const authorizeFirstStep = useSwapAuthorizeFirstStep(trade, allowedSlippage, formRef)

  useEffect(() => {
    if (showFakeApproval) {
      setTimeout(() => {
        setShowFakeApproval(false)
        submitToBrokerDealer({
          dto: brokerDealerDTO,
          formRef,
        })
      }, 5000)
    }
  }, [setShowFakeApproval, brokerDealerDTO, formRef, submitToBrokerDealer, showFakeApproval])

  if (!missingAuthorizations || missingAuthorizations?.length === 0) {
    return null
  }

  return (
    <RowBetween style={{ flexWrap: 'wrap' }}>
      {missingAuthorizations.map((address) => (
        <React.Fragment key={address}>
          {address && secTokens[address] && allowSwap && (
            <ButtonIXSGradient
              onClick={() => authorizeFirstStep(secTokens[address])}
              style={{ width: missingAuthorizations.length === 1 ? '100%' : 'fit-content' }}
            >
              {showFakeApproval ? `Authorize ${secTokens[address]?.symbol}` : 'Confirming transaction with broker...'}
            </ButtonIXSGradient>
          )}
        </React.Fragment>
      ))}
    </RowBetween>
  )
}
