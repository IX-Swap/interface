import React, { useCallback, useEffect } from 'react'

import { ButtonIXSGradient } from 'components/Button'
import { RowBetween } from 'components/Row'
import { useSwapAuthorizeFirstStep } from 'hooks/useSwapAuthorize'
import { useMissingAuthorizations } from 'hooks/useSwapCallback'
import { useBrokerDealerState, useFakeApprovalState, useToggleFakeApproval } from 'state/application/hooks'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { useSubmitBrokerDealerForm, useSwapHelpersState } from 'state/swapHelper/hooks'
import { useUserSecTokens } from 'state/user/hooks'

export const AuthorizationButtons = ({ formRef, allowSwap }: { formRef: any; allowSwap: boolean }) => {
  const showFakeApproval = useFakeApprovalState()
  const setShowFakeApproval = useToggleFakeApproval()
  const { authorizationInProgress } = useSwapHelpersState()

  const brokerDealerDTO = useBrokerDealerState()
  const submitToBrokerDealer = useSubmitBrokerDealerForm()

  // const [removeApproval, setRemoveApproval] = useState(false)

  const { toggledTrade: trade, allowedSlippage, insufficientBalance } = useDerivedSwapInfo()
  const missingAuthorizations = useMissingAuthorizations(trade)
  const { secTokens } = useUserSecTokens()
  const authorizeFirstStep = useSwapAuthorizeFirstStep(trade, allowedSlippage, formRef)

  useEffect(() => {
    if (showFakeApproval) {
      setTimeout(() => {
        setShowFakeApproval(false)
        submitToBrokerDealer({
          dto: { ...brokerDealerDTO, pairAddress: authorizationInProgress?.pairAddress },
          formRef,
        })
      }, 5000)
    }
  }, [
    setShowFakeApproval,
    brokerDealerDTO,
    formRef,
    submitToBrokerDealer,
    showFakeApproval,
    authorizationInProgress?.pairAddress,
  ])

  const startFirstStep = useCallback(
    (address: any) => {
      authorizeFirstStep(secTokens[address])
    },
    [authorizeFirstStep, secTokens]
  )

  if (!missingAuthorizations || missingAuthorizations?.length === 0 || insufficientBalance) {
    return null
  }

  return (
    <RowBetween style={{ flexWrap: 'wrap', gap: '16px' }}>
      {missingAuthorizations.map((address) => (
        <React.Fragment key={address}>
          {address && secTokens[address] && allowSwap && (
            <>
              {Boolean(authorizationInProgress) ? (
                <ButtonIXSGradient disabled style={{ width: '100%' }}>
                  Confirming transaction with broker...
                </ButtonIXSGradient>
              ) : (
                <ButtonIXSGradient onClick={() => startFirstStep(address)} style={{ width: '100%' }}>
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
