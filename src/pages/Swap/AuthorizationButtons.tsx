import { ButtonIXSGradient } from 'components/Button'
import { RowBetween } from 'components/Row'
import { useSwapAuthorizeFirstStep } from 'hooks/useSwapAuthorize'
import { useMissingAuthorizations } from 'hooks/useSwapCallback'
import React from 'react'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { useUserSecTokens } from 'state/user/hooks'

export const AuthorizationButtons = (formRef: any) => {
  const { toggledTrade: trade, allowedSlippage } = useDerivedSwapInfo()
  const missingAuthorizations = useMissingAuthorizations(trade)
  const { secTokens } = useUserSecTokens()
  const authorizeFirstStep = useSwapAuthorizeFirstStep(trade, allowedSlippage, formRef)
  if (!missingAuthorizations || missingAuthorizations?.length === 0) {
    return null
  }

  return (
    <RowBetween>
      {missingAuthorizations.map((address) => (
        <>
          {address && secTokens[address] && (
            <ButtonIXSGradient key={address} onClick={() => authorizeFirstStep(secTokens[address])}>
              Authorize {secTokens[address]?.symbol}
            </ButtonIXSGradient>
          )}
        </>
      ))}
    </RowBetween>
  )
}
