import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import { t } from '@lingui/macro'
import { BigNumber, utils } from 'ethers'
import { useCurrency } from 'hooks/Tokens'
import { useBurnWSecContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
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
import { useAddPopup } from 'state/application/hooks'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3') // for some reason import Web3 from web3 didn't see eth module

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

  const parsedAmount = tryParseAmount(amount, inputCurrency ?? undefined)
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency ?? undefined)
  let inputError: string | undefined
  if (!account) {
    inputError = t`Connect Wallet`
  }

  if (!parsedAmount) {
    inputError = inputError ?? t`Enter an amount`
  }

  let formattedTo = isAddress(receiver)
  if (!receiver) {
    inputError = inputError ?? t`Enter a receiver`
  } else if (!formattedTo) {
    const isValidForNetwork = walletValidator.validate(receiver, networkName ?? 'Ethereum')
    if (!isValidForNetwork) {
      inputError = inputError ?? t`Receiver is invalid`
    }
    if (isValidForNetwork) {
      formattedTo = receiver
    }
  }

  const sufficientBalance = parsedAmount && balance && !balance.lessThan(parsedAmount)
  if (!sufficientBalance) {
    inputError = inputError ?? t`Insufficient balance`
  }
  return {
    parsedAmount,
    formattedTo,
    inputError,
  }
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
  const dispatch = useDispatch<AppDispatch>()
  const router = useBurnWSecContract(currencyId)
  const getEvents = useGetEventCallback()
  const { tokenId } = useEventState()
  const addTransaction = useTransactionAdder()
  const cancelAction = useCancelDepositCallback()
  return useCallback(
    async ({ id, amount, onSuccess, onError, receiver }: WithdrawProps) => {
      dispatch(withdrawCurrency.pending())
      let withdrawId = null
      try {
        const response = await withdrawToken({ id, amount, receiver })
        const data = response?.data
        if (!data) {
          throw new Error(response?.message || t`An error occured. Could not submit withdraw request`)
        }
        const { withdrawRequest, signature } = data
        withdrawId = withdrawRequest.id
        const { operator, amount: sum, deadline, v, r, s } = signature
        const burned = await router?.burn(
          operator,
          BigNumber.from(sum.hex),
          deadline,
          v,
          utils.hexlify(r.data),
          utils.hexlify(s.data)
        )
        if (!burned.hash) {
          throw new Error(t`An error occured. Could not submit withdraw request`)
        }
        getEvents({ tokenId, filter: 'all' })
        addTransaction(burned, { summary: t`Withdraw ${amount} ${currencySymbol}` })
        dispatch(setTransaction({ tx: burned.hash }))
        dispatch(withdrawCurrency.fulfilled())
        onSuccess()
      } catch (error: any) {
        if (withdrawId) {
          await cancelAction({ requestId: withdrawId })
        }
        console.error(`Could not withdraw amount`, error)
        dispatch(withdrawCurrency.rejected({ errorMessage: error.message }))
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

export const getFeePriceReq = async (id: string | number) => {
  const response = await apiService.get(custody.feePrice(id))
  return response.data
}

export const useGetFeePrice = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (id: string | number) => {
      try {
        dispatch(getFeePrice.pending())
        const response = await getFeePriceReq(id)
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
  feeContractAddress: string
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
          feeContractAddress: data.feeContractAddress,
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
    [dispatch, payfee, getEvents]
  )
}

export const usePayFee = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { library, account } = useActiveWeb3React()
  const web3 = new Web3(library?.provider)
  const paidFee = usePaidWithdrawFee()

  return useCallback(
    async ({ feeContractAddress, feeAmount, tokenId, id }) => {
      try {
        dispatch(payFee.pending())

        const tx = {
          from: account,
          to: feeContractAddress,
          value: web3.utils.toWei(`${feeAmount}`, 'ether'),
          gasLimit: '450000',
          gasPrice: web3.utils.toWei('30', 'gwei'),
        }

        const txRes = await web3.eth.sendTransaction(tx)
        if (txRes.transactionHash) {
          await paidFee({ tokenId, id, feeTxHash: txRes.transactionHash })
        }
        dispatch(payFee.fulfilled())
      } catch (error: any) {
        dispatch(payFee.rejected({ errorMessage: error.message }))
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

export const postPaidFeeReq = async (data: PaidFee) => {
  const response = await apiService.post(custody.paidFee, data)
  return response.data
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
