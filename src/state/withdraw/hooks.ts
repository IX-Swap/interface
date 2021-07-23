import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import { t } from '@lingui/macro'
import { useCurrency } from 'hooks/Tokens'
import { useBurnWSecContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { tokens } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import { useWithdrawModalToggle } from 'state/application/hooks'
import { tryParseAmount } from 'state/swap/helpers'
import { isAddress } from 'utils'
import { setCurrency, setTransaction, typeAmount, typeReceiver, withdrawCurrency } from './actions'
import { BigNumber, utils } from 'ethers'

export function useWithdrawState(): AppState['withdraw'] {
  return useSelector<AppState, AppState['withdraw']>((state) => state.withdraw)
}

export function useWithdrawActionHandlers(): {
  onTypeAmount: (typedValue: string) => void
  onTypeReceiver: (typedValue: string) => void
  onCurrencySet: (currencyId: string) => void
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
  return {
    onTypeAmount,
    onTypeReceiver,
    onCurrencySet,
  }
}

export function useDerivedWithdrawInfo(): {
  parsedAmount: CurrencyAmount<Currency> | undefined
  inputError?: string
  formattedTo: string | false
} {
  const { account } = useActiveWeb3React()

  const { amount, receiver, currencyId } = useWithdrawState()

  const inputCurrency = useCurrency(currencyId)

  const parsedAmount = tryParseAmount(amount, inputCurrency ?? undefined)

  let inputError: string | undefined
  if (!account) {
    inputError = t`Connect Wallet`
  }

  if (!parsedAmount) {
    inputError = inputError ?? t`Enter an amount`
  }

  const formattedTo = isAddress(receiver)
  if (!receiver) {
    inputError = inputError ?? t`Enter a receiver`
  } else if (!formattedTo) {
    inputError = inputError ?? t`Receiver is invalid`
  }

  return {
    parsedAmount,
    formattedTo,
    inputError,
  }
}
export const withdrawToken = async ({ id, amount }: { id: number; amount: number }) => {
  const response = await apiService.post(tokens.withdraw(id), { amount })
  return response
}
interface WithdrawProps {
  id: number
  amount: number
  onSuccess: () => void
  onError: () => void
}
export function useWithdrawCallback(
  currencyId?: string
): ({ id, amount, onSuccess, onError }: WithdrawProps) => Promise<void> {
  const dispatch = useDispatch<AppDispatch>()
  const router = useBurnWSecContract(currencyId)
  return useCallback(
    async ({ id, amount, onSuccess, onError }: WithdrawProps) => {
      dispatch(withdrawCurrency.pending())
      try {
        const response = await withdrawToken({ id, amount })
        const { data } = response
        const { operator, amount: sum, deadline, v, r, s } = data
        const burned = await router?.burn(
          operator,
          BigNumber.from(sum.hex),
          deadline,
          v,
          utils.hexlify(r.data),
          utils.hexlify(s.data)
        )
        dispatch(setTransaction({ tx: burned.hash }))
        dispatch(withdrawCurrency.fulfilled())
        onSuccess()
      } catch (error) {
        console.error(`Could not withdraw amount`, error)
        dispatch(withdrawCurrency.rejected({ errorMessage: error.message }))
        onError()
      }
    },
    [dispatch, router]
  )
}
