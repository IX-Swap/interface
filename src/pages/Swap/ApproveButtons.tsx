import React from 'react'
import { Trans } from '@lingui/macro'
import { CheckCircle, HelpCircle } from 'react-feather'

import { MouseoverTooltip } from 'components/Tooltip'
import useIsArgentWallet from 'hooks/useIsArgentWallet'
import useTheme from 'hooks/useTheme'
import { useDerivedSwapInfo, useSwapState } from 'state/swap/hooks'
import { ParsedAmounts } from 'state/swap/typings'
import { useExpertModeManager } from 'state/user/hooks'
import { useWhitelabelState } from 'state/whitelabel/hooks'

import { ButtonIXSWide } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import CurrencyLogo from '../../components/CurrencyLogo'
import Loader from '../../components/Loader'
import { AutoRow } from '../../components/Row'
import { ApprovalState } from '../../hooks/useApproveCallback'
import { UseERC20PermitState } from '../../hooks/useERC20Permit'
import { Field } from '../../state/swap/actions'
import { usePriceImpact } from './usePriceImpact'
import { useSwapApproval } from './useSwapApproval'

export const ApproveButtons = ({ parsedAmounts }: { parsedAmounts: ParsedAmounts | undefined }) => {
  const { approvalState, handleApprove, signatureState } = useSwapApproval()
  const { approvalSubmitted } = useSwapState()
  const theme = useTheme()
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
      <AutoColumn style={{ width: '100%' }} gap="12px">
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
        >
          <AutoRow justify="space-between" style={{ flexWrap: 'nowrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', marginRight: '12px' }}>
              <CurrencyLogo
                currency={currencies[Field.INPUT]}
                size={'20px'}
                style={{ marginRight: '8px', flexShrink: 0 }}
              />
              {/* we need to shorten this string on mobile */}
              {approvalState === ApprovalState.APPROVED || signatureState === UseERC20PermitState.SIGNED ? (
                <Trans>You can now trade {currencies[Field.INPUT]?.symbol}</Trans>
              ) : (
                <Trans>
                  Allow {config?.name || 'IX Swap'} to use your {currencies[Field.INPUT]?.symbol}
                </Trans>
              )}
            </span>
            {approvalState === ApprovalState.PENDING ? (
              <Loader stroke="white" />
            ) : (approvalSubmitted && approvalState === ApprovalState.APPROVED) ||
              signatureState === UseERC20PermitState.SIGNED ? (
              <CheckCircle size="20" color={theme.green1} />
            ) : (
              <MouseoverTooltip
                text={
                  <Trans>
                    You must give the IXS smart contracts permission to use your {currencies[Field.INPUT]?.symbol}. You
                    only have to do this once per token.
                  </Trans>
                }
              >
                <HelpCircle size="20" color={'white'} style={{ marginLeft: '8px' }} />
              </MouseoverTooltip>
            )}
          </AutoRow>
        </ButtonIXSWide>
      </AutoColumn>
    </AutoRow>
  )
}
