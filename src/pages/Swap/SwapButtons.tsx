import { Trans } from '@lingui/macro'
import { SwapErrorCard } from 'components/Card'
import { ConfirmSwapInfo } from 'components/swap/ConfirmSwapInfo'
import { OutputInfo } from 'components/swap/OutputInfo'
import { BigNumber, utils } from 'ethers'
import { ApprovalState } from 'hooks/useApproveCallback'
import { UseERC20PermitState } from 'hooks/useERC20Permit'
import useIsArgentWallet from 'hooks/useIsArgentWallet'
import { useIsSwapUnsupported } from 'hooks/useIsSwapUnsupported'
import { useSwapCallbackError } from 'hooks/useSwapCallback'
import { useActiveWeb3React } from 'hooks/web3'
import JSBI from 'jsbi'
import React, { useCallback } from 'react'
import { Text } from 'rebass'
import { useShowError, useWalletModalToggle } from 'state/application/hooks'
import { useDerivedSwapInfo, useSwapState } from 'state/swap/hooks'
import { ParsedAmounts } from 'state/swap/typings'
import { useSetSwapState, useSwapHelpersState } from 'state/swapHelper/hooks'
import { useExpertModeManager, useUserSingleHopOnly } from 'state/user/hooks'
import { verifySwap } from 'utils/verifySwap'
import { ButtonIXSWide } from '../../components/Button'
import { BottomGrouping, SwapCallbackError } from '../../components/swap/styleds'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { Field } from '../../state/swap/actions'
import { ApproveButtons } from './ApproveButtons'
import { useHandleSwap } from './handleSwap'
import { WrapText } from './typings'
import { usePriceImpact } from './usePriceImpact'
import { useSwapApproval } from './useSwapApproval'
import { useSecTokens } from 'state/secTokens/hooks'
import { parseBytes32String } from 'ethers/lib/utils'

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

  const { showConfirm, swapErrorMessage, setSwapState } = useSetSwapState()
  const { authorizationInProgress } = useSwapHelpersState()

  // for expert mode
  const { expertMode } = useExpertModeManager()
  const { priceImpactTooHigh, priceImpactSeverity, priceImpact } = usePriceImpact({ parsedAmounts })
  const handleSwap = useHandleSwap({ priceImpact })

  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle()
  const { error: swapCallbackError } = useSwapCallbackError(trade, allowedSlippage, recipient)
  const [singleHopOnly] = useUserSingleHopOnly()

  const { secTokens } = useSecTokens()
  //const isSecToken = Boolean(secTokens[token.address])

  const showError = useShowError()

  const onClick = useCallback(async () => {
    if (trade && account) {
      const pair = trade.route.pairs[0]

      try {
        await verifySwap({
          tokenFrom: trade.inputAmount.currency.wrapped.address, //pair.token0.address,
          tokenTo: trade.outputAmount.currency.wrapped.address, //pair.token1.address,

          pair: pair.liquidityToken.address,

          kLast: '0', //BigInt(parseFloat(pair.reserve1.multiply(pair.reserve0).toExact()) * 10 ** 18).toString(),

          priceToleranceThreshold: BigNumber.from(parseInt(trade.priceImpact.toFixed())),
          systemFeeRate: BigNumber.from(pair.isSecurity ? 10 : 3), // utils.parseUnits(trade.executionPrice.toFixed()),

          id: `swap-${Math.floor(1 + Math.random() * 100000000)}`,

          amountInFrom: utils.parseUnits(trade.inputAmount.toExact()),
          amountInTo: utils.parseUnits('0'), //utils.parseUnits(trade.maximumAmountIn(allowedSlippage).toExact()),

          amountOutFrom: utils.parseUnits('0'), //utils.parseUnits(trade.minimumAmountOut(allowedSlippage).toExact()),
          amountOutTo: utils.parseUnits(trade.outputAmount.toExact()),

          sender: account,
          receiver: pair.liquidityToken.address,
          slope: 0.05,

          isSecurity: pair.isSecurity,
          pairAddress: pair.liquidityToken.address,
          chainId: chainId || 137,
        })
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
  }, [account, allowedSlippage, authorizationInProgress?.pairAddress, expertMode, handleSwap, setSwapState, trade])

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
          <ConfirmSwapInfo data-testid="confirm-swap-card-info" trade={trade} allowedSlippage={allowedSlippage} />
          {trade && <OutputInfo {...{ trade, recipient, allowedSlippage }} />}
          <BottomGrouping>
            <ButtonIXSWide
              onClick={handleSwap}
              disabled={showAcceptChanges || shouldGetAuthorization}
              data-testid="confirm-swap"
            >
              <Trans>Confirm swap</Trans>
            </ButtonIXSWide>
          </BottomGrouping>
        </>
      )}
      {!showConfirm && (
        <BottomGrouping>
          <ApproveButtons parsedAmounts={parsedAmounts} />
          {swapIsUnsupported && (
            <ButtonIXSWide disabled={true} data-testid="unsupported-asset">
              <Trans>Unsupported asset</Trans>
            </ButtonIXSWide>
          )}

          {showConnectWallet && (
            <ButtonIXSWide onClick={toggleWalletModal} data-testid="connect-wallet-from-swap">
              <Trans>Connect Wallet</Trans>
            </ButtonIXSWide>
          )}
          {showWrapButton && (
            <ButtonIXSWide disabled={Boolean(wrapInputError)} onClick={onWrap} data-testid="wrap">
              {wrapInputError ?? WrapText[wrapType] ?? null}
            </ButtonIXSWide>
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
            <ButtonIXSWide
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
              <Text fontSize={18} fontWeight={600}>
                {swapInputError ? (
                  swapInputError
                ) : shouldGetAuthorization ? (
                  <Trans>Authorization missing</Trans>
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

// : priceImpactTooHigh ? (
//   <Trans>Price impact too high</Trans>
// ) : priceImpactSeverity > 2 ? (
//   <Trans>Price impact is high. Swap anyway</Trans>
// )
