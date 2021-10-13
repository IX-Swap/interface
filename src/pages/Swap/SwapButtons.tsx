import { Trans } from '@lingui/macro'
import { SwapErrorCard } from 'components/Card'
import { ConfirmSwapInfo } from 'components/swap/ConfirmSwapInfo'
import { OutputInfo } from 'components/swap/OutputInfo'
import { MouseoverTooltip } from 'components/Tooltip'
import useIsArgentWallet from 'hooks/useIsArgentWallet'
import { useSwapCallbackError } from 'hooks/useSwapCallback'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { CheckCircle, HelpCircle } from 'react-feather'
import { Text } from 'rebass'
import { useWalletModalToggle } from 'state/application/hooks'
import { useDerivedSwapInfo, useSwapState } from 'state/swap/hooks'
import { ParsedAmounts } from 'state/swap/typings'
import { useSetSwapState } from 'state/swapHelper/hooks'
import { useExpertModeManager, useUserSingleHopOnly } from 'state/user/hooks'
import { ButtonIXSWide } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import CurrencyLogo from '../../components/CurrencyLogo'
import Loader from '../../components/Loader'
import { AutoRow } from '../../components/Row'
import { BottomGrouping, SwapCallbackError } from '../../components/swap/styleds'
import { ApprovalState } from '../../hooks/useApproveCallback'
import { UseERC20PermitState } from '../../hooks/useERC20Permit'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { Field } from '../../state/swap/actions'
import { useHandleSwap } from './handleSwap'
import { usePriceImpact } from './usePriceImpact'
import { useSwapApproval } from './useSwapApproval'
import JSBI from 'jsbi'
import { useIsSwapUnsupported } from 'hooks/useIsSwapUnsupported'

export const SwapButtons = ({
  formRef,
  parsedAmounts,
  showAcceptChanges,
}: {
  formRef: any
  showAcceptChanges: boolean
  parsedAmounts: ParsedAmounts | undefined
}) => {
  const { account } = useActiveWeb3React()
  const { approvalSubmitted, recipient, typedValue, independentField } = useSwapState()

  const theme = useTheme()
  const {
    toggledTrade: trade,
    allowedSlippage,
    currencies,
    inputError: swapInputError,
    shouldGetAuthorization,
  } = useDerivedSwapInfo()

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)

  const { showConfirm, swapErrorMessage, setSwapState } = useSetSwapState()
  const { approvalState, handleApprove, signatureState } = useSwapApproval()
  // for expert mode
  const { expertMode } = useExpertModeManager()
  const { priceImpactTooHigh, priceImpactSeverity, priceImpact } = usePriceImpact({ parsedAmounts })
  const handleSwap = useHandleSwap({ formRef, priceImpact })
  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle()
  const { error: swapCallbackError } = useSwapCallbackError(trade, allowedSlippage, recipient)
  const [singleHopOnly] = useUserSingleHopOnly()
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE

  const isArgentWallet = useIsArgentWallet()

  const showApproveFlow =
    !isArgentWallet &&
    !swapInputError &&
    (approvalState === ApprovalState.NOT_APPROVED ||
      approvalState === ApprovalState.PENDING ||
      (approvalSubmitted && approvalState === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !expertMode)
  const routeNotFound = !trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] &&
      currencies[Field.OUTPUT] &&
      parsedAmounts?.[independentField]?.greaterThan(JSBI.BigInt(0))
  )
  const isValid = !swapInputError
  const swapIsUnsupported = useIsSwapUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  return (
    <>
      {showConfirm && (
        <>
          <ConfirmSwapInfo data-testid="confirm-swap-card-info" trade={trade} allowedSlippage={allowedSlippage} />
          {trade && <OutputInfo {...{ trade, recipient, allowedSlippage }} />}
          <BottomGrouping>
            <ButtonIXSWide onClick={handleSwap} disabled={showAcceptChanges} data-testid="confirm-swap">
              {shouldGetAuthorization ? <Trans>Get authorization</Trans> : <Trans>Confirm swap</Trans>}
            </ButtonIXSWide>
          </BottomGrouping>
        </>
      )}
      {!showConfirm && (
        <BottomGrouping>
          {swapIsUnsupported ? (
            <ButtonIXSWide disabled={true} data-testid="unsupported-asset">
              <Trans>Unsupported asset</Trans>
            </ButtonIXSWide>
          ) : !account ? (
            <ButtonIXSWide onClick={toggleWalletModal} data-testid="connect-wallet-from-swap">
              <Trans>Connect Wallet</Trans>
            </ButtonIXSWide>
          ) : showWrap ? (
            <ButtonIXSWide disabled={Boolean(wrapInputError)} onClick={onWrap} data-testid="wrap">
              {wrapInputError ??
                (wrapType === WrapType.WRAP ? (
                  <Trans>Wrap</Trans>
                ) : wrapType === WrapType.UNWRAP ? (
                  <Trans>Unwrap</Trans>
                ) : null)}
            </ButtonIXSWide>
          ) : routeNotFound && userHasSpecifiedInputOutput ? (
            <SwapErrorCard style={{ textAlign: 'center' }}>
              {singleHopOnly ? (
                <Trans>Insufficient liquidity for this trade. Try enabling multi-hop trades.</Trans>
              ) : (
                <Trans>Insufficient liquidity for this trade</Trans>
              )}
            </SwapErrorCard>
          ) : showApproveFlow ? (
            <AutoRow style={{ flexWrap: 'nowrap', width: '100%' }}>
              <AutoColumn style={{ width: '100%' }} gap="12px">
                <ButtonIXSWide
                  onClick={handleApprove}
                  disabled={
                    approvalState !== ApprovalState.NOT_APPROVED ||
                    approvalSubmitted ||
                    signatureState === UseERC20PermitState.SIGNED
                  }
                  width="100%"
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
                        <Trans>Allow IXSwap to use your {currencies[Field.INPUT]?.symbol}</Trans>
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
                            You must give the IXS smart contracts permission to use your{' '}
                            {currencies[Field.INPUT]?.symbol}. You only have to do this once per token.
                          </Trans>
                        }
                      >
                        <HelpCircle size="20" color={'white'} style={{ marginLeft: '8px' }} />
                      </MouseoverTooltip>
                    )}
                  </AutoRow>
                </ButtonIXSWide>
                <ButtonIXSWide
                  onClick={() => {
                    if (expertMode) {
                      handleSwap()
                    } else {
                      setSwapState({
                        tradeToConfirm: trade,
                        attemptingTxn: false,
                        swapErrorMessage: undefined,
                        showConfirm: true,
                        txHash: undefined,
                      })
                    }
                  }}
                  width="100%"
                  data-testid="swap-button"
                  id="swap-button"
                  disabled={
                    !isValid ||
                    (approvalState !== ApprovalState.APPROVED && signatureState !== UseERC20PermitState.SIGNED) ||
                    priceImpactTooHigh
                  }
                >
                  <Text fontSize={17} fontWeight={600}>
                    {priceImpactTooHigh ? (
                      <Trans>High price impact</Trans>
                    ) : priceImpactSeverity > 2 ? (
                      <Trans>Price impact is high. Swap anyway</Trans>
                    ) : (
                      <Trans>Swap</Trans>
                    )}
                  </Text>
                </ButtonIXSWide>
              </AutoColumn>
            </AutoRow>
          ) : (
            <ButtonIXSWide
              onClick={() => {
                if (expertMode) {
                  handleSwap()
                } else {
                  setSwapState({
                    tradeToConfirm: trade,
                    attemptingTxn: false,
                    swapErrorMessage: undefined,
                    showConfirm: true,
                    txHash: undefined,
                  })
                }
              }}
              data-testid="swap-button"
              id="swap-button"
              disabled={!isValid || priceImpactTooHigh || !!swapCallbackError}
            >
              <Text fontSize={18} fontWeight={600}>
                {swapInputError ? (
                  swapInputError
                ) : priceImpactTooHigh ? (
                  <Trans>Price impact too high</Trans>
                ) : priceImpactSeverity > 2 ? (
                  <Trans>Price impact is high. Swap anyway</Trans>
                ) : shouldGetAuthorization ? (
                  <Trans>Get authorization</Trans>
                ) : (
                  <Trans>Swap</Trans>
                )}
              </Text>
            </ButtonIXSWide>
          )}
          {expertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
        </BottomGrouping>
      )}
    </>
  )
}
