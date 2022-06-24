import React, { useCallback, useMemo, useRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import styled from 'styled-components'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'

import { GeneralModal } from 'components/GeneralModal/GeneralModal'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { AcceptChanges } from 'components/swap/AcceptChanges'
import { CurrentRate } from 'components/swap/CurrentRate'
import { EditRecipient } from 'components/swap/EditRecipient'
import { PendingSuccesModals } from 'components/swap/PendingSuccesModals'
import { tradeMeaningfullyDiffers } from 'components/swap/tradeMeaningfullyDiffers'
import UnsupportedCurrencyFooter from 'components/swap/UnsupportedCurrencyFooter'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import {
  useOpenModal,
  useSetSwapState,
  useSwapConfirmDataFromURL,
  useSwapHelpersState,
  useWatchAuthorizationExpire,
} from 'state/swapHelper/hooks'
import { ConfirmSwapInfo } from 'components/swap/ConfirmSwapInfo'

import { AutoColumn } from '../../components/Column'
import { CurrencyInput } from '../../components/swap/CurrencyInput'
import { Wrapper } from '../../components/swap/styleds'
import SwapHeader from '../../components/swap/SwapHeader'
import TokenWarningModal from '../../components/TokenWarningModal'
import { useIsSwapUnsupported } from '../../hooks/useIsSwapUnsupported'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { useActiveWeb3React } from '../../hooks/web3'
import { Field } from '../../state/swap/actions'
import { useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from '../../state/swap/hooks'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import AppBody from '../AppBody'
import { AuthorizationButtons } from './AuthorizationButtons'
import { BrokerDealerForm } from './BrokerDealerForm'
import { SwapButtons } from './SwapButtons'
import { useWatchApprovalSubmitted } from './useWatchApprovalSubmitted'

type CurrencyWithSec = Currency & { isSecToken?: boolean }

export default function Swap({ history }: RouteComponentProps) {
  const { chainId } = useActiveWeb3React()
  const formRef = useRef() as any
  const { openModal, setOpenModal } = useOpenModal()
  const { loadingSwap } = useSwapHelpersState()
  const { independentField, typedValue, recipient } = useSwapState()

  const { onUserInput, onChangeRecipient } = useSwapActionHandlers()

  const {
    toggledTrade: trade,
    allowedSlippage,
    currencyBalances,
    parsedAmount,
    currencies,
    isLoading,
  } = useDerivedSwapInfo()

  const { wrapType } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)

  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE

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

  const { showConfirm, tradeToConfirm, attemptingTxn, swapErrorMessage, txHash, setSwapState } = useSetSwapState()

  const maxInputAmount: CurrencyAmount<Currency> | undefined = maxAmountSpend(currencyBalances[Field.INPUT])

  useSwapConfirmDataFromURL(trade, allowedSlippage, history)
  useWatchApprovalSubmitted({ trade, allowedSlippage })
  const handleHideConfirm = useCallback(() => {
    setSwapState({ showConfirm: false, tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
  }, [attemptingTxn, swapErrorMessage, tradeToConfirm, txHash, setSwapState])

  const handleConfirmDismiss = useCallback(() => {
    handleHideConfirm()
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
    setOpenModal(false)
  }, [onUserInput, txHash, handleHideConfirm, setOpenModal])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn, showConfirm })
  }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash, setSwapState])

  const swapIsUnsupported = useIsSwapUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  const showAcceptChanges = useMemo(
    () =>
      Boolean(
        trade instanceof V2Trade && tradeToConfirm instanceof V2Trade && tradeMeaningfullyDiffers(trade, tradeToConfirm)
      ),
    [tradeToConfirm, trade]
  )
  useWatchAuthorizationExpire(trade)
  const showLoading =
    loadingSwap ||
    isLoading ||
    (!trade &&
      parsedAmounts.INPUT &&
      !parsedAmounts.OUTPUT &&
      typedValue &&
      !currencyBalances.INPUT &&
      !currencyBalances.OUTPUT)

  // TO DO - add logic to get this logic from back
  const allowSwapSecurity = true
  const withSecToken =
    (currencies.INPUT as CurrencyWithSec)?.isSecToken || (currencies.OUTPUT as CurrencyWithSec)?.isSecToken

  return (
    <>
      <TokenWarningModal history={history} />
      <GeneralModal />
      <BrokerDealerForm ref={formRef} />
      <AppBody blurred={chainId !== undefined && !TGE_CHAINS_WITH_SWAP.includes(chainId)}>
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
            <CurrencyInput {...{ parsedAmounts, maxInputAmount, showWrap, currencies, handleHideConfirm }} />
            {showWrap ? null : <CurrentRate {...{ trade, allowedSlippage }} />}

            <ConfirmSwapInfo data-testid="confirm-swap-card-info" trade={trade} allowedSlippage={allowedSlippage} />

            {!showLoading && (
              <>
                {recipient !== null && !showWrap ? <EditRecipient {...{ recipient, onChangeRecipient }} /> : null}

                {showAcceptChanges ? <AcceptChanges handleAcceptChanges={handleAcceptChanges} /> : null}
                <AuthorizationButtons formRef={formRef} allowSwap={allowSwapSecurity || !withSecToken} />
                <SwapButtons
                  parsedAmounts={parsedAmounts}
                  showAcceptChanges={showAcceptChanges}
                  allowSwap={allowSwapSecurity || !withSecToken}
                />
              </>
            )}
            {showLoading && (
              <LoaderContainer>
                <LoaderThin size={48} />
              </LoaderContainer>
            )}
          </AutoColumn>
          {/* {showFakeApproval && <FakeBrokerDealerApproval formRef={formRef} />} */}
        </Wrapper>
      </AppBody>
      {!swapIsUnsupported ? null : (
        <UnsupportedCurrencyFooter show={swapIsUnsupported} currencies={[currencies.INPUT, currencies.OUTPUT]} />
      )}
    </>
  )
}

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
`
