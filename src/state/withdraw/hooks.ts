import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import { t } from '@lingui/macro'
import { BigNumber, utils } from 'ethers'
import { useCurrency } from 'hooks/Tokens'
import { useBurnWSecContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { useWeb3React } from 'hooks/useWeb3React'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { custody } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import { useCancelDepositCallback } from 'state/deposit/hooks'
import { useEventState, useGetEventCallback } from 'state/eventLog/hooks'
import { tryParseAmount } from 'state/swap/helpers'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { isAddress } from 'utils'
import {
  setCurrency,
  setNetwork,
  setTransaction,
  typeAmount,
  typeReceiver,
  withdrawCurrency,
  resetWithdraw,
  getWithdrawStatus,
  getFeePrice,
  postCreateDraftWithdraw,
  postPaidFee,
  payFee,
} from './actions'
import walletValidator from 'multicoin-address-validator'
import { useAddPopup, useToggleTransactionModal } from 'state/application/hooks'
import { setLogItem } from 'state/eventLog/actions'
import { formatRpcError } from 'utils/formatRpcError'
import { NETWORK_ADDRESS_PATTERNS } from 'state/wallet/constants'
import { WITHDRAW_FLOW_EVENT, WalletEvent } from 'utils/event-logs'
import { calculateGasPriceMargin } from 'utils/calculateGasPriceMargin'

// eslint-disable-next-line @typescript-eslint/no-var-requires

export function useWithdrawState(): AppState['withdraw'] {
  return useSelector<AppState, AppState['withdraw']>((state) => state.withdraw)
}

export function useWithdrawActionHandlers(): {
  onTypeAmount: (typedValue: string) => void
  onTypeReceiver: (typedValue: string) => void
  onCurrencySet: (currencyId: string) => void
  onSetNetWorkName: (networkName: string) => void
  onResetWithdraw: () => void
} {
  const dispatch = useDispatch<AppDispatch>()

  const onTypeAmount = useCallback(
    (typedValue: string) => {
      dispatch(typeAmount({ typedValue }))
    },
    [dispatch]
  )

  const onTypeReceiver = useCallback(
    (typedValue: string) => {
      dispatch(typeReceiver({ typedValue }))
    },
    [dispatch]
  )

  const onCurrencySet = useCallback(
    (currencyId: string) => {
      dispatch(setCurrency({ currencyId }))
    },
    [dispatch]
  )
  const onSetNetWorkName = useCallback(
    (networkName: string) => {
      dispatch(setNetwork({ networkName }))
    },
    [dispatch]
  )
  const onResetWithdraw = useCallback(() => {
    dispatch(resetWithdraw())
  }, [dispatch])
  return {
    onTypeAmount,
    onTypeReceiver,
    onCurrencySet,
    onSetNetWorkName,
    onResetWithdraw,
  }
}

export function useDerivedWithdrawInfo(): {
  parsedAmount: CurrencyAmount<Currency> | undefined
  inputError?: string
  formattedTo: string | false
} {
  const { account } = useActiveWeb3React()

  const { amount, receiver, currencyId, networkName } = useWithdrawState()

  const inputCurrency = useCurrency(currencyId)

  const parsedAmount = tryParseAmount(amount ? amount.toString() : '0', inputCurrency ?? undefined)
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency ?? undefined)
  let inputError: string | undefined
  if (!account) {
    inputError = `Connect Wallet`
  }

  if (!parsedAmount) {
    inputError = inputError ?? `Enter an amount`
  }

  let formattedTo = isAddress(receiver)
  if (!receiver) {
    inputError = inputError ?? t`Enter a receiver`
  } else {
    //if (!formattedTo) {
    const network = networkName || 'Ethereum'
    const currency = walletValidator.findCurrency(network)
    let isValidForNetwork = true

    if (currency) {
      isValidForNetwork = walletValidator.validate(receiver, network)
    } else {
      isValidForNetwork = manualValidation(receiver, network)
    }

    if (!isValidForNetwork) {
      inputError = inputError ?? `Receiver is invalid`
    }
    if (isValidForNetwork) {
      formattedTo = receiver
    }
  }

  const sufficientBalance = parsedAmount && balance && !balance.lessThan(parsedAmount)
  if (!sufficientBalance) {
    inputError = inputError ?? `Insufficient balance`
  }
  return {
    parsedAmount,
    formattedTo,
    inputError,
  }
}

const manualValidation = (address: string, network: string) => {
  const expressions = NETWORK_ADDRESS_PATTERNS[network]

  return expressions[0].test(address)
  /*if (!expressions[0].test(address)) {
    return false;
  }

  if (expressions[1].test(address) || expressions[2].test(address)) {
    // If it's all small caps or all all caps, return true
    return true;
  }

  return false;*/
}

export const withdrawToken = async ({ id, amount, receiver }: { id: number; amount: string; receiver: string }) => {
  const response = await apiService.post(custody.withdraw, {
    amount,
    tokenId: id,
    fromAddress: receiver,
  })
  return response
}
interface WithdrawProps {
  id: number
  amount: string
  receiver: string
  onSuccess: () => void
  onError: () => void
}
export function useWithdrawCallback(
  currencyId?: string,
  currencySymbol?: string
): ({ id, amount, onSuccess, onError }: WithdrawProps) => Promise<void> {
  const { provider, account, chainId } = useWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const router = useBurnWSecContract(currencyId)
  const getEvents = useGetEventCallback()
  const { tokenId } = useEventState()
  const addTransaction = useTransactionAdder()
  const cancelAction = useCancelDepositCallback()
  const toggle = useToggleTransactionModal()

  return useCallback(
    async ({ id, amount, onSuccess, onError, receiver }: WithdrawProps) => {
      dispatch(withdrawCurrency.pending())
      dispatch(setLogItem({ logItem: null }))
      let withdrawId = null
      try {
        const response = await withdrawToken({ id, amount, receiver })
        const data = response?.data
        if (!data) {
          throw new Error(response?.message || `An error occured. Could not submit withdraw request`)
        }
        const { withdrawRequest, signature } = data
        withdrawId = withdrawRequest.id
        const { operator, amount: sum, deadline, v, r, s } = signature

        const gasPrice = await provider?.getGasPrice()

        const burned = await router?.burn(
          operator,
          BigNumber.from(sum.hex),
          deadline,
          v,
          utils.hexlify(r.data),
          utils.hexlify(s.data),
          {
            gasPrice: calculateGasPriceMargin(chainId, gasPrice),
          }
        )

        new WalletEvent(WITHDRAW_FLOW_EVENT.CREATE_BURN_TX)
          .walletAddress(account || '')
          .data({
            tx: {
              operator,
              amount: BigNumber.from(sum.hex).toString(),
              deadline,
            },
            chainId,
            gasPrice: gasPrice,
            txHash: burned?.hash,
            receiver,
            amount,
            id,
          })
          .info(t`Withdraw ${amount} ${currencySymbol}`)

        if (!burned.hash) {
          throw new Error(`An error occured. Could not submit withdraw request`)
        }

        getEvents({ tokenId, filter: 'all' })
        addTransaction(burned, { summary: `Withdraw ${amount} ${currencySymbol}` })
        dispatch(setTransaction({ tx: burned.hash }))
        dispatch(withdrawCurrency.fulfilled())
        dispatch(setLogItem({ logItem: withdrawRequest }))
        onSuccess()
        toggle()
      } catch (error: any) {
        if (withdrawId) {
          await cancelAction({ requestId: withdrawId })
        }
        const errorMessage = formatRpcError(error)
        dispatch(withdrawCurrency.rejected({ errorMessage }))
        onError()
      }
    },
    [dispatch, router, addTransaction, currencySymbol, tokenId, getEvents]
  )
}

export const getWithdrawStatusReq = async (id: string | number) => {
  const response = await apiService.get(custody.withdrawStatus(id))
  return response.data
}

export const useGetWithdrawStatus = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (id: string | number) => {
      try {
        dispatch(getWithdrawStatus.pending())
        const response = await getWithdrawStatusReq(id)
        dispatch(getWithdrawStatus.fulfilled(response))
      } catch (error: any) {
        dispatch(getWithdrawStatus.rejected({ errorMessage: error.message }))
      }
    },
    [dispatch]
  )
}

export const getFeePriceReq = async (id: string | number, amount: string) => {
  const response = await apiService.get(custody.feePrice(id, amount))
  return response.data
}

export const useGetFeePrice = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (id: string | number, amount: string) => {
      try {
        dispatch(getFeePrice.pending())
        const response = await getFeePriceReq(id, amount)
        dispatch(getFeePrice.fulfilled(response))
      } catch (error: any) {
        dispatch(getFeePrice.rejected({ errorMessage: error.message }))
      }
    },
    [dispatch]
  )
}

interface Draft {
  tokenId: number
  amount: string
  fromAddress: string
}

export const postCreateDraftWithdrawReq = async (data: Draft) => {
  const response = await apiService.post(custody.draftWithdraw, data)
  return response.data
}

export const useCreateDraftWitdraw = () => {
  const dispatch = useDispatch<AppDispatch>()
  const getEvents = useGetEventCallback()
  const payfee = usePayFee()
  const addPopup = useAddPopup()

  return useCallback(
    async (data: Draft) => {
      try {
        dispatch(postCreateDraftWithdraw.pending())

        const response = await postCreateDraftWithdrawReq(data)

        dispatch(postCreateDraftWithdraw.fulfilled(response))

        getEvents({ tokenId: data.tokenId, filter: 'all' })
        payfee({
          feeContractAddress: response.feeContractAddress,
          feeAmount: response.feeAmount,
          tokenId: data.tokenId,
          id: response.id,
        })
      } catch (error: any) {
        addPopup({
          info: {
            success: false,
            summary: error.message || 'Faild to create withdrawal request',
          },
        })
        dispatch(postCreateDraftWithdraw.rejected({ errorMessage: error.message }))
      }
    },
    [dispatch, payfee, getEvents, addPopup]
  )
}

export const usePayFee = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { provider, account, chainId } = useWeb3React()
  const paidFee = usePaidWithdrawFee()
  const paidFeeRejected = useFeeRejected()
  const getEvents = useGetEventCallback()

  return useCallback(
    async ({ feeContractAddress, feeAmount, tokenId, id }: any) => {
      try {
        dispatch(payFee.pending())

        const gasPrice = await provider?.getGasPrice()

        const singer = provider?.getSigner(account)

        const tx = {
          from: account,
          to: feeContractAddress,
          value: utils.parseEther(feeAmount.toString()),
          gasPrice: calculateGasPriceMargin(chainId, gasPrice),
        }

        const txResponse = await singer?.sendTransaction(tx)
        if (txResponse?.hash) {
          await postPrepareFeeReq({ id, feeTxHash: txResponse?.hash })
        }

        const receipt = await txResponse?.wait()

        if (receipt?.transactionHash) {
          new WalletEvent(WITHDRAW_FLOW_EVENT.WITHDRAW_FEE_PAID)
            .walletAddress(account || '')
            .data({
              transaction: {
                from: tx.from,
                to: tx.to,
                value: tx.value,
                gasPrice: tx.gasPrice,
              },
              feeTxHash: receipt.transactionHash,
              feeAmount,
              feeContractAddress,
              tokenId,
              id,
            })
            .info('User has paid withdraw fee for tokenId: ' + tokenId)

          await paidFee({ tokenId, id, feeTxHash: receipt.transactionHash })
        }

        getEvents({ tokenId, filter: 'all' })
        dispatch(payFee.fulfilled())
      } catch (error: any) {
        paidFeeRejected(error)
      }
    },
    [account, dispatch, paidFee]
  )
}

interface PaidFee {
  id: number
  tokenId: number
  feeTxHash: string
}

interface PrepareFee {
  id: number
  feeTxHash: string
}

export const postPaidFeeReq = async (data: PaidFee) => {
  const response = await apiService.post(custody.paidFee, data)
  return response.data
}

export const postPrepareFeeReq = async (data: PrepareFee) => {
  const response = await apiService.post(custody.preparePaidFee, data)
  return response.data
}

export const useFeeRejected = () => {
  const dispatch = useDispatch<AppDispatch>()
  const addPopup = useAddPopup()

  return useCallback(
    async (error: any) => {
      const errorMessage = formatRpcError(error)
      addPopup({
        info: {
          success: false,
          summary: errorMessage,
        },
      })
      dispatch(payFee.rejected({ errorMessage }))
    },
    [dispatch]
  )
}

export const usePaidWithdrawFee = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (data: PaidFee) => {
      try {
        dispatch(postPaidFee.pending())
        const response = await postPaidFeeReq(data)
        dispatch(postPaidFee.fulfilled(response))
      } catch (error: any) {
        dispatch(postPaidFee.rejected({ errorMessage: error.message }))
      }
    },
    [dispatch]
  )
}
