import { ButtonIXSGradient } from 'components/Button'
import { RowBetween } from 'components/Row'
import { useSwapAuthorizeFirstStep } from 'hooks/useSwapAuthorize'
import { useMissingAuthorizations } from 'hooks/useSwapCallback'
import React, { useCallback, useEffect, useState } from 'react'
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

  const { toggledTrade: trade, allowedSlippage, insufficientBalance } = useDerivedSwapInfo()
  const missingAuthorizations = useMissingAuthorizations(trade)
  const { secTokens } = useUserSecTokens()
  const authorizeFirstStep = useSwapAuthorizeFirstStep(trade, allowedSlippage, formRef)

  const [startedFirstStep, setStartedFirstStep] = useState(false)

  useEffect(() => {
    if (showFakeApproval) {
      setTimeout(() => {
        setShowFakeApproval(false)
        submitToBrokerDealer({ dto: brokerDealerDTO, formRef, cb: () => setStartedFirstStep(false) })
      }, 5000)
    }
  }, [setShowFakeApproval, brokerDealerDTO, formRef, submitToBrokerDealer, showFakeApproval])

  const startFirstStep = useCallback(
    (address: any) => {
      setStartedFirstStep(true)
      authorizeFirstStep(secTokens[address])
    },
    [authorizeFirstStep, secTokens]
  )

  if (!missingAuthorizations || missingAuthorizations?.length === 0 || insufficientBalance) {
    return null
  }

  return (
    <RowBetween style={{ flexWrap: 'wrap' }}>
      {missingAuthorizations.map((address) => (
        <React.Fragment key={address}>
          {address && secTokens[address] && allowSwap && (
            <>
              {(startedFirstStep || showFakeApproval) && (
                <ButtonIXSGradient
                  disabled
                  style={{ width: missingAuthorizations.length === 1 ? '100%' : 'fit-content' }}
                >
                  Confirming transaction with broker...
                </ButtonIXSGradient>
              )}

              {!startedFirstStep && !showFakeApproval && (
                <ButtonIXSGradient
                  onClick={() => startFirstStep(address)}
                  style={{ width: missingAuthorizations.length === 1 ? '100%' : 'fit-content' }}
                >
                  Authorize {secTokens[address]?.symbol}
                </ButtonIXSGradient>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </RowBetween>
  )
}
