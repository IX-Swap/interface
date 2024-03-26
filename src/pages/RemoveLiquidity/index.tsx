import { useEffect } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { TransactionResponse } from '@ethersproject/providers'
import { Percent, WETH9 } from '@ixswap1/sdk-core'
import { t, Trans } from '@lingui/macro'
import { TextRow } from 'components/TextRow/TextRow'
import { TipWithMessage } from 'components/TipWithMessage'
import { ConfirmationModalContent } from 'components/TransactionConfirmationModal/ConfirmationModalContent'
import AppBody from 'pages/AppBody'
import React, { useCallback, useMemo, useState } from 'react'
import ReactGA from 'react-ga'
import { RouteComponentProps } from 'react-router'
import { Box, Text } from 'rebass'
import { setPoolTransactionHash, useMitigationEnabled } from 'state/pool/hooks'
import { routes } from 'utils/routes'
import { ButtonIXSWide, NewApproveButton, PinnedContentButton } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import { MinimalPositionCard } from '../../components/PositionCard/MinimalPositionCard'
import { RowBetween } from '../../components/Row'
import { Dots } from '../../components/swap/styleds'
import TransactionConfirmationModal from '../../components/TransactionConfirmationModal'
import { useCurrency } from '../../hooks/Tokens'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import { useLiquidityRouterContract, usePairContract } from '../../hooks/useContract'
import { UseERC20PermitState, useV2LiquidityTokenPermit } from '../../hooks/useERC20Permit'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import { useWeb3React } from '@web3-react/core'
import { useWalletModalToggle } from '../../state/application/hooks'
import { Field } from '../../state/burn/actions'
import { useBurnState, useDerivedBurnInfo } from '../../state/burn/hooks'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { useUserSlippageToleranceWithDefault } from '../../state/user/hooks'
import { calculateGasMargin } from '../../utils/calculateGasMargin'
import { calculateSlippageAmount } from '../../utils/calculateSlippageAmount'
import { ModalBottom } from './ModalBottom'
import { ModalHeader } from './ModalHeader'
import { RemoveAmount } from './RemoveAmount'
import { RemovedLiquidity } from './RemovedLiquidity'
import useCurrencyInput from './useCurrencyInput'
// import { AddLiduidityContainer } from 'pages/AddLiquidityV2/redirects'
// import { Header } from 'pages/Launchpad/Header'
import { useSetHideHeader } from 'state/application/hooks'
import { SUPPORTED_TGE_CHAINS, TGE_CHAINS_WITH_STAKING } from 'constants/addresses'
import Portal from '@reach/portal'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { NetworkNotAvailable } from 'components/Launchpad/NetworkNotAvailable'
import Header from 'components/Header'
import { NotAvailablePage } from 'components/NotAvailablePage'

const DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE = new Percent(5, 100)

export default function RemoveLiquidity({
  history,
  match: {
    params: { currencyIdA, currencyIdB },
  },
}: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const [currencyA, currencyB] = [useCurrency(currencyIdA) ?? undefined, useCurrency(currencyIdB) ?? undefined]
  const { account, chainId, provider } = useWeb3React()
  const [tokenA, tokenB] = useMemo(() => [currencyA?.wrapped, currencyB?.wrapped], [currencyA, currencyB])
  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle()
  const setCurrentPoolTransctionHash = setPoolTransactionHash()

  // burn state
  const { independentField, typedValue } = useBurnState()
  const { pair, parsedAmounts, error } = useDerivedBurnInfo(currencyA ?? undefined, currencyB ?? undefined)
  const mitigationEnabled = useMitigationEnabled(pair?.liquidityToken?.address)

  const isValid = !error

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState(false) // clicked confirm

  // txn values
  const [txHash, setTxHash] = useState<string>('')
  const deadline = useTransactionDeadline()
  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE)

  const formattedAmounts = {
    [Field.LIQUIDITY_PERCENT]: parsedAmounts[Field.LIQUIDITY_PERCENT].equalTo('0')
      ? '0'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].lessThan(new Percent('1', '100'))
      ? '<1'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0),
    [Field.LIQUIDITY]:
      independentField === Field.LIQUIDITY ? typedValue : parsedAmounts[Field.LIQUIDITY]?.toSignificant(6) ?? '',
    [Field.CURRENCY_A]:
      independentField === Field.CURRENCY_A ? typedValue : parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
    [Field.CURRENCY_B]:
      independentField === Field.CURRENCY_B ? typedValue : parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
  }

  // pair contract
  const pairContract: Contract | null = usePairContract(pair?.liquidityToken?.address)

  const router = useLiquidityRouterContract()

  // allowance handling
  const { gatherPermitSignature, signatureData, state } = useV2LiquidityTokenPermit(
    parsedAmounts[Field.LIQUIDITY],
    router?.address
  )

  const [approval, approveCallback] = useApproveCallback(parsedAmounts[Field.LIQUIDITY], router?.address)

  // useEffect(() => {
  //   const getSignature = async () => {
  //     try {
  //       if (gatherPermitSignature) {
  //         await gatherPermitSignature()
  //       }
  //     } catch (error: any) {
  //       // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
  //       if (error?.code !== 4001) {
  //         await approveCallback()
  //       }
  //     }
  //   }

  //   if (state != UseERC20PermitState.SIGNED && approval === ApprovalState.APPROVED) {
  //     getSignature()
  //   }
  // }, [state, gatherPermitSignature, approval])

  async function onAttemptToApprove() {
    if (!pairContract || !pair || !provider || !deadline) throw new Error('missing dependencies')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    if (gatherPermitSignature) {
      try {
        await gatherPermitSignature()
      } catch (error: any) {
        // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
        if (error?.code !== 4001) {
          await approveCallback()
        }
      }
    } else {
      await approveCallback()
    }
  }

  const { onUserInput } = useCurrencyInput()

  // tx sending
  const addTransaction = useTransactionAdder()

  async function onRemove() {
    setCurrentPoolTransctionHash(null)
    if (!chainId || !provider || !account || !deadline || !router) throw new Error('missing dependencies')
    const { [Field.CURRENCY_A]: currencyAmountA, [Field.CURRENCY_B]: currencyAmountB } = parsedAmounts
    if (!currencyAmountA || !currencyAmountB) {
      throw new Error('missing currency amounts')
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0],
    }

    if (!currencyA || !currencyB) throw new Error('missing tokens')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    const currencyBIsETH = currencyB.isNative
    const oneCurrencyIsETH = currencyA.isNative || currencyBIsETH

    if (!tokenA || !tokenB) throw new Error('could not wrap')

    let methodNames: string[], args: Array<string | string[] | number | boolean>
    // we have approval, use normal remove liquidity
    if (approval === ApprovalState.APPROVED) {
      // removeLiquidityETH
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETH', 'removeLiquidityETHSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          deadline.toHexString(),
        ]
      }
      // removeLiquidity
      else {
        methodNames = ['removeLiquidity']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          deadline.toHexString(),
        ]
      }
    }
    // we have a signature, use permit versions of remove liquidity
    else if (signatureData !== null) {
      // removeLiquidityETHWithPermit
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETHWithPermit', 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
      // removeLiquidityETHWithPermit
      else {
        methodNames = ['removeLiquidityWithPermit']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
    } else {
      throw new Error('Attempting to confirm without approval or a signature. Please contact support.')
    }

    const safeGasEstimates: (BigNumber | undefined)[] = await Promise.all(
      methodNames.map((methodName) =>
        router.estimateGas[methodName](...args)
          .then(calculateGasMargin)
          .catch((error) => {
            console.error(`estimateGas failed`, methodName, args, error)
            return undefined
          })
      )
    )

    const indexOfSuccessfulEstimation = safeGasEstimates.findIndex((safeGasEstimate) =>
      BigNumber.isBigNumber(safeGasEstimate)
    )

    // all estimations failed...
    if (indexOfSuccessfulEstimation === -1) {
      console.error('This transaction would fail. Please contact support.')
    } else {
      const methodName = methodNames[indexOfSuccessfulEstimation]
      const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation]

      setAttemptingTxn(true)
      await router[methodName](...args, {
        gasLimit: safeGasEstimate,
      })
        .then((response: TransactionResponse) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary: `Remove ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
              currencyA?.symbol
            } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencyB?.symbol}`,
          })

          setTxHash(response.hash)

          ReactGA.event({
            category: 'Liquidity',
            action: 'Remove',
            label: [currencyA?.symbol, currencyB?.symbol].join('/'),
          })
          setCurrentPoolTransctionHash(response.hash)
        })
        .catch((error: Error) => {
          setAttemptingTxn(false)
          // we only care if the error is something _other_ than the user rejected the tx
          console.error(error)
        })
    }
  }

  const modalHeader = useCallback(
    () => <ModalHeader {...{ parsedAmounts, currencyA, currencyB, allowedSlippage }} />,
    [parsedAmounts, currencyA, currencyB, allowedSlippage]
  )

  const modalBottom = () => <ModalBottom {...{ currencyA, currencyB, approval, signatureData, onRemove }} />

  const pendingText = `Removing ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)} ${
    currencyA?.symbol
  } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)} ${currencyB?.symbol}`

  const oneCurrencyIsWETH = Boolean(
    chainId && WETH9[chainId] && (currencyA?.equals(WETH9[chainId]) || currencyB?.equals(WETH9[chainId]))
  )
  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.LIQUIDITY_PERCENT, '0')
      history.push(routes.pool)
    }
    setTxHash('')
  }, [onUserInput, txHash, history])

  const hideHeader = useSetHideHeader()

  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])

  const blurred = React.useMemo(
    () => ![...TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS.MAIN].includes(chainId || 0),
    [account, chainId]
  )

  if (blurred) {
    return (
      <Portal>
        <CenteredFixed width="100vw" height="100vh">
          <NotAvailablePage />
        </CenteredFixed>
      </Portal>
    )
  }

  return (
    <>
      <TransactionConfirmationModal
        isOpen={showConfirm}
        onDismiss={handleDismissConfirmation}
        attemptingTxn={attemptingTxn}
        hash={txHash ? txHash : ''}
        content={() => (
          // <ModalBlurWrapper>
          <ConfirmationModalContent
            title={<Trans>You will receive</Trans>}
            onDismiss={handleDismissConfirmation}
            topContent={modalHeader}
            bottomContent={modalBottom}
          />
          // </ModalBlurWrapper>
        )}
        pendingText={pendingText}
      />
      <>
        <Header />
        {/* <AddLiduidityContainer> */}
        <Box>
          <AppBody page="liquidity">
            <AddRemoveTabs creating={false} adding={false} showBadge={mitigationEnabled} />
            <Box mb={'20px'}>
              <AutoColumn gap="md">
                <RemoveAmount {...{ parsedAmounts, formattedAmounts, onUserInput }} />
                <RemovedLiquidity {...{ currencyIdA, currencyIdB, chainId, formattedAmounts }} />
                {pair && (
                  <Box padding={'10px 20px'}>
                    <TextRow
                      textLeft={<Trans>Price</Trans>}
                      textRight={
                        <>
                          1 {currencyA?.symbol} = {tokenA ? pair.priceOf(tokenA).toSignificant(6) : '-'}{' '}
                          {currencyB?.symbol}
                        </>
                      }
                    />
                    <TextRow
                      textLeft={<></>}
                      textRight={
                        <>
                          1 {currencyB?.symbol} = {tokenB ? pair.priceOf(tokenB).toSignificant(6) : '-'}{' '}
                          {currencyA?.symbol}
                        </>
                      }
                    />
                  </Box>
                )}
                <div style={{ position: 'relative' }}>
                  {!account ? (
                    <ButtonIXSWide onClick={toggleWalletModal} data-testid="connect-wallet-remove-liquidity">
                      <Trans>Connect Wallet</Trans>
                    </ButtonIXSWide>
                  ) : (
                    <>
                      <RowBetween style={{ gap: '16px' }}>
                        <PinnedContentButton
                          data-testid="approve-currency-a-remove"
                          onClick={onAttemptToApprove}
                          disabled={approval !== ApprovalState.NOT_APPROVED || signatureData !== null}
                        >
                          {approval === ApprovalState.PENDING ? (
                            <Dots>
                              <Trans>Approving</Trans>
                            </Dots>
                          ) : approval === ApprovalState.APPROVED || signatureData !== null ? (
                            <Trans>Approved</Trans>
                          ) : (
                            <>{error || <Trans>Approve</Trans>}</>
                          )}
                        </PinnedContentButton>
                        <NewApproveButton
                          style={{ border: '1px solid #E6E6FF' }}
                          data-testid="approve-currency-b-remove"
                          onClick={() => {
                            setShowConfirm(true)
                          }}
                          disabled={!isValid || signatureData === null}
                        >
                          <Text color={!isValid || signatureData === null ? '#f8c0c0' : '#FF6161'}>
                            {<Trans>Remove</Trans>}
                          </Text>
                        </NewApproveButton>
                      </RowBetween>
                    </>
                  )}
                </div>
              </AutoColumn>
            </Box>
            {pair ? <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} /> : null}
          </AppBody>

          <Box mb={'50px'} mt={'30px'}>
            <TipWithMessage
              message={
                <Trans>
                  Removing pool tokens converts your position back into underlying tokens at the current rate,
                  proportional to your share of the pool. Accrued fees are included in the amounts you receive.
                </Trans>
              }
            />
          </Box>
        </Box>
        {/* </AddLiduidityContainer> */}
      </>
    </>
  )
}
