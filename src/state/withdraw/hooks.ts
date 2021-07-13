import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import { t } from '@lingui/macro'
import { useCurrency } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { tryParseAmount } from 'state/swap/helpers'
import { isAddress } from 'utils'
import { setCurrency, typeAmount, typeReceiver } from './actions'

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
