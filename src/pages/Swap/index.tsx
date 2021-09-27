import { Currency, CurrencyAmount, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import { Trans } from '@lingui/macro'
import { SwapErrorCard } from 'components/Card'
import { AcceptChanges } from 'components/swap/AcceptChanges'
import { ConfirmSwapInfo } from 'components/swap/ConfirmSwapInfo'
import { CurrentRate } from 'components/swap/CurrentRate'
import { EditRecipient } from 'components/swap/EditRecipient'
import { OutputInfo } from 'components/swap/OutputInfo'
import { PendingSuccesModals } from 'components/swap/PendingSuccesModals'
import { tradeMeaningfullyDiffers } from 'components/swap/tradeMeaningfullyDiffers'
import UnsupportedCurrencyFooter from 'components/swap/UnsupportedCurrencyFooter'
import { MouseoverTooltip } from 'components/Tooltip'
import JSBI from 'jsbi'
import { SUPPORTED_TGE_CHAINS } from 'pages/App'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CheckCircle, HelpCircle } from 'react-feather'
import ReactGA from 'react-ga'
import { RouteComponentProps } from 'react-router-dom'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import { ButtonIXSWide } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import CurrencyLogo from '../../components/CurrencyLogo'
import Loader from '../../components/Loader'
import { AutoRow } from '../../components/Row'
import confirmPriceImpactWithoutFee from '../../components/swap/confirmPriceImpactWithoutFee'
import { CurrencyInput } from '../../components/swap/CurrencyInput'
import { BottomGrouping, SwapCallbackError, Wrapper } from '../../components/swap/styleds'
import SwapHeader from '../../components/swap/SwapHeader'
import TokenWarningModal from '../../components/TokenWarningModal'
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback'
import useENSAddress from '../../hooks/useENSAddress'
import { useERC20PermitFromTrade, UseERC20PermitState } from '../../hooks/useERC20Permit'
import useIsArgentWallet from '../../hooks/useIsArgentWallet'
import { useIsSwapUnsupported } from '../../hooks/useIsSwapUnsupported'
import { useSwapCallback, useSwapCallbackError } from '../../hooks/useSwapCallback'
import { Version } from '../../hooks/useToggledVersion'
import { useUSDCValue } from '../../hooks/useUSDCPrice'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { useActiveWeb3React } from '../../hooks/web3'
import { useWalletModalToggle } from '../../state/application/hooks'
import { Field } from '../../state/swap/actions'
import { useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from '../../state/swap/hooks'
import { useExpertModeManager, useUserSingleHopOnly } from '../../state/user/hooks'
import { computeFiatValuePriceImpact } from '../../utils/computeFiatValuePriceImpact'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { warningSeverity } from '../../utils/prices'
import AppBody from '../AppBody'

export default function Swap({ history }: RouteComponentProps) {
  const { account, chainId } = useActiveWeb3React()
  const theme = useContext(ThemeContext)
  const [openModal, setOpenModal] = useState<boolean>(false)
  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle()

  // for expert mode
  const { expertMode } = useExpertModeManager()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const {
    toggledTrade: trade,
    allowedSlippage,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError,
  } = useDerivedSwapInfo()

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const { address: recipientAddress } = useENSAddress(recipient)

  const parsedAmounts = useMemo(
    () =>
      showWrap
        ? {
            [Field.INPUT]: parsedAmount,
            [Field.OUTPUT]: parsedAmount,
          }
        : {
            [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
            [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
          },
    [independentField, parsedAmount, showWrap, trade]
  )

  const fiatValueInput = useUSDCValue(parsedAmounts[Field.INPUT])
  const fiatValueOutput = useUSDCValue(parsedAmounts[Field.OUTPUT])
  const priceImpact = computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput)

  const { onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError

  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: V2Trade<Currency, Currency, TradeType> | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  )
  const routeNotFound = !trade?.route

  // check whether the user has approved the router on the input token
  const [approvalState, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)
  const { state: signatureState, gatherPermitSignature } = useERC20PermitFromTrade(trade, allowedSlippage)

  const handleApprove = useCallback(async () => {
    if (signatureState === UseERC20PermitState.NOT_SIGNED && gatherPermitSignature) {
      try {
        await gatherPermitSignature()
      } catch (error) {
        // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
        if (error?.code !== 4001) {
          await approveCallback()
        }
      }
    } else {
      await approveCallback()
    }
  }, [approveCallback, gatherPermitSignature, signatureState])

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted])

  const maxInputAmount: CurrencyAmount<Currency> | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  // the callback to execute the swap
  const getSwapCallback = useSwapCallback(trade, allowedSlippage, recipient)
  const { error: swapCallbackError } = useSwapCallbackError(trade, allowedSlippage, recipient)

  const [singleHopOnly] = useUserSingleHopOnly()

  const handleSwap = useCallback(async () => {
    const { callback: swapCallback } = await getSwapCallback()
    if (swapCallbackError) {
      return
    }
    if (!swapCallback) {
      return
    }
    if (priceImpact && !confirmPriceImpactWithoutFee(priceImpact)) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: undefined })
    setOpenModal(true)
    swapCallback()
      .then((hash) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: undefined,
          txHash: hash,
        })

        ReactGA.event({
          category: 'Swap',
          action:
            recipient === null
              ? 'Swap w/o Send'
              : (recipientAddress ?? recipient) === account
              ? 'Swap w/o Send + recipient'
              : 'Swap w/ Send',
          label: [
            trade?.inputAmount?.currency?.symbol,
            trade?.outputAmount?.currency?.symbol,
            Version.v2,
            singleHopOnly ? 'SH' : 'MH',
          ].join('/'),
        })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [
    priceImpact,
    getSwapCallback,
    tradeToConfirm,
    showConfirm,
    recipient,
    recipientAddress,
    account,
    trade,
    singleHopOnly,
  ])

  // errors

  // warnings on the greater of fiat value price impact and execution price impact
  const priceImpactSeverity = useMemo(() => {
    const executionPriceImpact = trade?.priceImpact
    return warningSeverity(
      executionPriceImpact && priceImpact
        ? executionPriceImpact.greaterThan(priceImpact)
          ? executionPriceImpact
          : priceImpact
        : executionPriceImpact ?? priceImpact
    )
  }, [priceImpact, trade])

  const isArgentWallet = useIsArgentWallet()

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !isArgentWallet &&
    !swapInputError &&
    (approvalState === ApprovalState.NOT_APPROVED ||
      approvalState === ApprovalState.PENDING ||
      (approvalSubmitted && approvalState === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !expertMode)

  const handleHideConfirm = useCallback(() => {
    setSwapState({ showConfirm: false, tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
  }, [attemptingTxn, swapErrorMessage, tradeToConfirm, txHash])

  const handleConfirmDismiss = useCallback(() => {
    handleHideConfirm()
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
    setOpenModal(false)
  }, [onUserInput, txHash, handleHideConfirm])
  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn, showConfirm })
  }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash])

  const swapIsUnsupported = useIsSwapUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  const priceImpactTooHigh = priceImpactSeverity > 3 && !expertMode
  const showAcceptChanges = useMemo(
    () =>
      Boolean(
        trade instanceof V2Trade && tradeToConfirm instanceof V2Trade && tradeMeaningfullyDiffers(trade, tradeToConfirm)
      ),
    [tradeToConfirm, trade]
  )

  return (
    <>
      <TokenWarningModal history={history} />
      <AppBody blurred={chainId === SUPPORTED_TGE_CHAINS.MAIN}>
        <SwapHeader />
        <Wrapper id="swap-page">
          <PendingSuccesModals
            trade={trade}
            swapErrorMessage={swapErrorMessage}
            onDismiss={handleConfirmDismiss}
            attemptingTxn={attemptingTxn}
            txHash={txHash}
            isOpen={openModal}
          />
          <AutoColumn gap={'1.25rem'}>
            <CurrencyInput
              {...{ parsedAmounts, setApprovalSubmitted, maxInputAmount, showWrap, currencies, handleHideConfirm }}
            />

            {recipient !== null && !showWrap ? <EditRecipient {...{ recipient, onChangeRecipient }} /> : null}

            {showWrap ? null : <CurrentRate {...{ trade, allowedSlippage }} />}
            {showAcceptChanges ? <AcceptChanges handleAcceptChanges={handleAcceptChanges} /> : null}
            {showConfirm && (
              <>
                <ConfirmSwapInfo data-testid="confirm-swap-card-info" trade={trade} allowedSlippage={allowedSlippage} />
                {trade && <OutputInfo {...{ trade, recipient, allowedSlippage }} />}
                <BottomGrouping>
                  <ButtonIXSWide onClick={handleSwap} disabled={showAcceptChanges} data-testid="confirm-swap">
                    <Trans>Confirm swap</Trans>
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
                        confirmed={
                          approvalState === ApprovalState.APPROVED || signatureState === UseERC20PermitState.SIGNED
                        }
                      >
                        <AutoRow justify="space-between" style={{ flexWrap: 'nowrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', marginRight: '12px' }}>
                            <CurrencyLogo
                              currency={currencies[Field.INPUT]}
                              size={'20px'}
                              style={{ marginRight: '8px', flexShrink: 0 }}
                            />
                            {/* we need to shorten this string on mobile */}
                            {approvalState === ApprovalState.APPROVED ||
                            signatureState === UseERC20PermitState.SIGNED ? (
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
                      ) : (
                        <Trans>Swap</Trans>
                      )}
                    </Text>
                  </ButtonIXSWide>
                )}
                {expertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
              </BottomGrouping>
            )}
          </AutoColumn>
        </Wrapper>
      </AppBody>
      {!swapIsUnsupported ? null : (
        <UnsupportedCurrencyFooter show={swapIsUnsupported} currencies={[currencies.INPUT, currencies.OUTPUT]} />
      )}
    </>
  )
}
