import { ButtonIXSGradient } from 'components/Button'
import { RowBetween } from 'components/Row'
import { useSwapAuthorizeFirstStep } from 'hooks/useSwapAuthorize'
import { useMissingAuthorizations } from 'hooks/useSwapCallback'
import React from 'react'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { useUserSecTokens } from 'state/user/hooks'

export const AuthorizationButtons = ({ formRef, allowSwap }: { formRef: any; allowSwap: boolean }) => {
  const { toggledTrade: trade, allowedSlippage } = useDerivedSwapInfo()
  const missingAuthorizations = useMissingAuthorizations(trade)
  const { secTokens } = useUserSecTokens()
  const authorizeFirstStep = useSwapAuthorizeFirstStep(trade, allowedSlippage, formRef)

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
              Authorize {secTokens[address]?.symbol}
            </ButtonIXSGradient>
          )}
        </React.Fragment>
      ))}
    </RowBetween>
  )
}
