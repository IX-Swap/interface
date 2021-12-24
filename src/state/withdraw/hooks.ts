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
} from './actions'
import walletValidator from 'multicoin-address-validator'

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
      } catch (error) {
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
