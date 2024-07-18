import React, { useCallback, useState } from 'react'
import JSBI from 'jsbi'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'

import { SwapErrorCard } from 'components/Card'
import { OutputInfo } from 'components/swap/OutputInfo'
import { ApprovalState } from 'hooks/useApproveCallback'
import { UseERC20PermitState } from 'hooks/useERC20Permit'
import useIsArgentWallet from 'hooks/useIsArgentWallet'
import { useIsSwapUnsupported } from 'hooks/useIsSwapUnsupported'
import { useSwapCallbackError } from 'hooks/useSwapCallback'
import { useActiveWeb3React } from 'hooks/web3'
import { useShowError } from 'state/application/hooks'
import { useDerivedSwapInfo, useSwapState } from 'state/swap/hooks'
import { ParsedAmounts } from 'state/swap/typings'
import { useSetSwapState } from 'state/swapHelper/hooks'
import { useExpertModeManager, useUserSingleHopOnly } from 'state/user/hooks'
import { useUserSecTokens } from 'state/user/hooks'
import { verifySwap } from 'utils/verifySwap'

import { ButtonIXSWide, PinnedContentButton } from '../../components/Button'
import { BottomGrouping, SwapCallbackError } from '../../components/swap/styleds'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { Field } from '../../state/swap/actions'
import { ApproveButtons } from './ApproveButtons'
import { useHandleSwap } from './handleSwap'
import { WrapText } from './typings'
import { usePriceImpact } from './usePriceImpact'
import { useSwapApproval } from './useSwapApproval'
import { AccreditationStatusEnum } from 'components/Vault/enum'
import Modal from 'components/Modal'
import ConnectionDialog from 'components/Launchpad/Wallet/ConnectionDialog'

export const SwapButtons = ({
  parsedAmounts,
  showAcceptChanges,
  allowSwap,
}: {
  showAcceptChanges: boolean
  parsedAmounts: ParsedAmounts | undefined
  allowSwap: boolean
}) => {
  const { account, chainId } = useActiveWeb3React()
  const { recipient, typedValue, independentField, approvalSubmitted } = useSwapState()

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
  const { approvalState, signatureState } = useSwapApproval()

  const { secTokens: userSecTokens } = useUserSecTokens()
  const { showConfirm, swapErrorMessage, setSwapState } = useSetSwapState()

  // for expert mode
  const { expertMode } = useExpertModeManager()
  const { priceImpactSeverity, priceImpact } = usePriceImpact({ parsedAmounts })
  const handleSwap = useHandleSwap({ priceImpact })

  // toggle wallet when disconnected
  const { error: swapCallbackError } = useSwapCallbackError(trade, allowedSlippage, recipient)
  const [singleHopOnly] = useUserSingleHopOnly()

  //const isSecToken = Boolean(secTokens[token.address])
  const showError = useShowError()

  const [isOpenConnectWallet, setOpenConnectWallet] = useState(false)

  const isAccredited = (currency: any): boolean => {
    const currencyId = currency?.address

    return currency?.isSecToken === true
      ? Boolean(
          (userSecTokens[currencyId] as any)?.tokenInfo?.accreditationRequest?.brokerDealerStatus ===
            AccreditationStatusEnum.APPROVED &&
            (userSecTokens[currencyId] as any)?.tokenInfo?.accreditationRequest?.custodianStatus ===
              AccreditationStatusEnum.APPROVED
        )
      : true
  }

  const onClick = useCallback(async () => {
    if (trade && account) {
      try {
        if (!isAccredited(trade.inputAmount.currency) || !isAccredited(trade.outputAmount.currency)) {
          showError('There is no accreditation for the token')
          return
        }

        await verifySwap(trade, chainId || 137)
      } catch (err) {
        showError((err as Error).message)
        return
      }
    }

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
  }, [expertMode, handleSwap, setSwapState, trade])

  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE

  const routeNotFound = !trade?.route

  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] &&
      currencies[Field.OUTPUT] &&
      parsedAmounts?.[independentField]?.greaterThan(JSBI.BigInt(0))
  )
  const isValid = !swapInputError
  const swapIsUnsupported = useIsSwapUnsupported(currencies?.INPUT, currencies?.OUTPUT)
  const isArgentWallet = useIsArgentWallet()

  const showApproveFlow =
    !isArgentWallet &&
    !swapInputError &&
    (approvalState === ApprovalState.NOT_APPROVED ||
      approvalState === ApprovalState.PENDING ||
      (approvalSubmitted && approvalState === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !expertMode)

  const showConnectWallet = !swapIsUnsupported && !account
  const showWrapButton = !swapIsUnsupported && account && showWrap
  const showInsufficientLiquidity =
    !swapIsUnsupported && account && !showWrap && routeNotFound && userHasSpecifiedInputOutput
  const showSwapButton = account && !showWrap && !showInsufficientLiquidity

  return (
    <>
      {showConfirm && (
        <>
          {trade && <OutputInfo {...{ trade, recipient, allowedSlippage }} />}
          <BottomGrouping>
            <PinnedContentButton
              onClick={handleSwap}
              disabled={showAcceptChanges || shouldGetAuthorization}
              data-testid="confirm-swap"
            >
              <Trans>Confirm swap</Trans>
            </PinnedContentButton>
          </BottomGrouping>
        </>
      )}
      {!showConfirm && (
        <BottomGrouping>
          <ApproveButtons parsedAmounts={parsedAmounts} />
          {swapIsUnsupported && (
            <PinnedContentButton disabled={true} data-testid="unsupported-asset">
              <Trans>Unsupported asset</Trans>
            </PinnedContentButton>
          )}

          {showConnectWallet && (
            <>
              <PinnedContentButton onClick={() => setOpenConnectWallet(true)} data-testid="connect-wallet-from-swap">
                <Trans>Connect Wallet</Trans>
              </PinnedContentButton>

              <Modal
                isOpen={isOpenConnectWallet}
                onDismiss={() => setOpenConnectWallet(false)}
                maxWidth="430px"
                maxHeight="310px"
              >
                <ConnectionDialog
                  onConnect={() => {
                    console.log('Connected')
                  }}
                  onClose={() => setOpenConnectWallet(false)}
                />
              </Modal>
            </>
          )}

          {showWrapButton && (
            <PinnedContentButton disabled={Boolean(wrapInputError)} onClick={onWrap} data-testid="wrap">
              <Trans>{wrapInputError ?? WrapText[wrapType] ?? null}</Trans>
            </PinnedContentButton>
          )}
          {showInsufficientLiquidity && (
            <SwapErrorCard style={{ textAlign: 'center' }}>
              {singleHopOnly ? (
                <Trans>Insufficient liquidity for this trade. Try enabling multi-hop trades.</Trans>
              ) : (
                <Trans>Insufficient liquidity for this trade</Trans>
              )}
            </SwapErrorCard>
          )}

          {!allowSwap && (
            <SwapErrorCard style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold' }}>Swap is currently unavailable for this security token</div>
              <div style={{ fontSize: 12, marginTop: 8 }}>
                Due to network or Oracle instability this security token is not tradable for the moment. Please check
                back later.
              </div>
            </SwapErrorCard>
          )}

          {showSwapButton && allowSwap && (
            <PinnedContentButton
              style={{ textAlign: 'center' }}
              onClick={onClick}
              data-testid="swap-button"
              id="swap-button"
              disabled={
                (showApproveFlow &&
                  approvalState !== ApprovalState.APPROVED &&
                  signatureState !== UseERC20PermitState.SIGNED) ||
                !isValid ||
                // priceImpactTooHigh ||
                !!swapCallbackError ||
                shouldGetAuthorization
              }
            >
              <Text fontSize={16} fontWeight={600}>
                {swapInputError ? (
                  swapInputError
                ) : shouldGetAuthorization ? (
                  <Trans>Authorization missing</Trans>
                ) : (
                  <Trans>Swap</Trans>
                )}
              </Text>
            </PinnedContentButton>
          )}

          {expertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
        </BottomGrouping>
      )}
    </>
  )
}

// : priceImpactTooHigh ? (
//   <Trans>Price impact too high</Trans>
// ) : priceImpactSeverity > 2 ? (
//   <Trans>Price impact is high. Swap anyway</Trans>
// )
