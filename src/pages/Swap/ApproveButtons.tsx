import React from 'react'
import { Trans } from '@lingui/macro'
import { HelpCircle } from 'react-feather'
import { ReactComponent as CheckCircle } from 'assets/images/newRightCheck.svg'

import { MouseoverTooltip } from 'components/Tooltip'
import useIsArgentWallet from 'hooks/useIsArgentWallet'
import useTheme from 'hooks/useTheme'
import { useDerivedSwapInfo, useSwapState } from 'state/swap/hooks'
import { ParsedAmounts } from 'state/swap/typings'
import { useExpertModeManager } from 'state/user/hooks'
import { useWhitelabelState } from 'state/whitelabel/hooks'

import { ButtonIXSWide } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import Loader from '../../components/Loader'
import { AutoRow } from '../../components/Row'
import { ApprovalState } from '../../hooks/useApproveCallback'
import { UseERC20PermitState } from '../../hooks/useERC20Permit'
import { Field } from '../../state/swap/actions'
import { usePriceImpact } from './usePriceImpact'

export const ApproveButtons = ({
  parsedAmounts,
  approvalState,
  handleApprove,
  signatureState,
}: {
  parsedAmounts: ParsedAmounts | undefined
  approvalState: ApprovalState
  handleApprove: () => Promise<void>
  signatureState: UseERC20PermitState
}) => {
  const { approvalSubmitted } = useSwapState()
  const isArgentWallet = useIsArgentWallet()
  const { config } = useWhitelabelState()
  const { currencies, inputError: swapInputError, shouldGetAuthorization } = useDerivedSwapInfo()
  const { expertMode } = useExpertModeManager()
  const { priceImpactSeverity } = usePriceImpact({ parsedAmounts })
  const showApproveFlow =
    !isArgentWallet &&
    !swapInputError &&
    (approvalState === ApprovalState.NOT_APPROVED ||
      approvalState === ApprovalState.PENDING ||
      (approvalSubmitted && approvalState === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !expertMode)

  if (!showApproveFlow || shouldGetAuthorization) {
    return null
  }

  return (
    <AutoRow style={{ flexWrap: 'nowrap', width: '100%', marginBottom: '10px' }}>
      <AutoColumn style={{ width: '100%', textAlign: 'center' }} gap="12px">
        <ButtonIXSWide
          onClick={handleApprove}
          disabled={
            approvalState !== ApprovalState.NOT_APPROVED ||
            approvalSubmitted ||
            signatureState === UseERC20PermitState.SIGNED
          }
          data-testid="approve-use-token"
          altDisabledStyle={approvalState === ApprovalState.PENDING} // show solid button while waiting
          confirmed={approvalState === ApprovalState.APPROVED || signatureState === UseERC20PermitState.SIGNED}
          style={{
            height: 53,
            fontSize: 16,
          }}
        >
          <AutoRow justify="center" style={{ flexWrap: 'nowrap' }}>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '12px',
              }}
            >
              {approvalState === ApprovalState.APPROVED || signatureState === UseERC20PermitState.SIGNED ? (
                <span style={{ textAlign: 'center' }} color="#0ec080">
                  <Trans>You can now trade {currencies[Field.INPUT]?.symbol}</Trans>
                </span>
              ) : (
                <span style={{ textAlign: 'center' }} color="#ffffff">
                  <Trans>
                    Allow {config?.name || 'IX Swap'} to use your {currencies[Field.INPUT]?.symbol}
                  </Trans>
                </span>
              )}
            </span>
            {approvalState === ApprovalState.PENDING ? (
              <Loader stroke="white" />
            ) : (approvalSubmitted && approvalState === ApprovalState.APPROVED) ||
              signatureState === UseERC20PermitState.SIGNED ? (
              <CheckCircle />
            ) : null}
          </AutoRow>
        </ButtonIXSWide>
      </AutoColumn>
    </AutoRow>
  )
}
