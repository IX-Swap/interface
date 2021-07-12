import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import { t } from '@lingui/macro'
import { useCurrency } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { tryParseAmount } from 'state/swap/helpers'
import { isAddress } from 'utils'
import { setCurrency, typeAmount, typeSender } from './actions'

export function useDepositState(): AppState['deposit'] {
  return useSelector<AppState, AppState['deposit']>((state) => state.deposit)
}

export function useDepositActionHandlers(): {
  onTypeAmount: (typedValue: string) => void
  onTypeSender: (typedValue: string) => void
  onCurrencySet: (currencyId: string) => void
} {
  const dispatch = useDispatch<AppDispatch>()

  const onTypeAmount = useCallback(
    (typedValue: string) => {
      dispatch(typeAmount({ typedValue }))
    },
    [dispatch]
  )

  const onTypeSender = useCallback(
    (typedValue: string) => {
      dispatch(typeSender({ typedValue }))
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
    onTypeSender,
    onCurrencySet,
  }
}

export function useDerivedDepositInfo(): {
  parsedAmount: CurrencyAmount<Currency> | undefined
  inputError?: string
  formattedFrom: string | false
} {
  const { account } = useActiveWeb3React()

  const { amount, sender, currencyId } = useDepositState()

  const inputCurrency = useCurrency(currencyId)

  const parsedAmount = tryParseAmount(amount, inputCurrency ?? undefined)

  let inputError: string | undefined
  if (!account) {
    inputError = t`Connect Wallet`
  }

  if (!parsedAmount) {
    inputError = inputError ?? t`Enter an amount`
  }

  const formattedFrom = isAddress(sender)
  if (!sender) {
    inputError = inputError ?? t`Enter a sender`
  } else if (!formattedFrom) {
    inputError = inputError ?? t`Sender is invalid`
  }

  return {
    parsedAmount,
    formattedFrom,
    inputError,
  }
}
