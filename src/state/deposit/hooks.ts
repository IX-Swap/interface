import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import { t } from '@lingui/macro'
import { ActionTypes } from 'components/Vault/enum'
import { useCurrency } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { custody } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import { setLogItem } from 'state/eventLog/actions'
import { useEventState, useGetEventCallback } from 'state/eventLog/hooks'
import { tryParseAmount } from 'state/swap/helpers'
import { isAddress } from 'utils'
import { depositSecTokens, setCurrency, typeAmount, typeSender } from './actions'

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

export const depositToken = async ({
  tokenId,
  amount,
  fromAddress,
}: {
  tokenId: number
  amount: number
  fromAddress: string
}) => {
  const response = await apiService.post(custody.deposit, { tokenId, amount, fromAddress })
  return response
}

export const cancelDeposit = async ({ requestId }: { requestId: number }) => {
  const response = await apiService.post(custody.cancelDeposit(requestId), {})
  return response
}

interface DepositProps {
  id: number
  amount: number
  fromAddress: string
  onSuccess: () => void
  onError: () => void
  onPending?: () => void
}
interface CancelDepositProps {
  requestId: number
  onSuccess: () => void
}

export function useDepositCallback(): ({ id, amount, onSuccess, onError, onPending }: DepositProps) => Promise<void> {
  const dispatch = useDispatch<AppDispatch>()
  const getEvents = useGetEventCallback()
  const { tokenId } = useEventState()
  return useCallback(
    async ({ id, amount, fromAddress, onSuccess, onError, onPending }: DepositProps) => {
      dispatch(depositSecTokens.pending())
      onPending && onPending()
      try {
        const response = await depositToken({ tokenId: id, amount, fromAddress })
        dispatch(setLogItem({ logItem: response.data }))
        getEvents({ tokenId, filter: 'all' })
        dispatch(depositSecTokens.fulfilled())
        onSuccess()
      } catch (error) {
        console.error(`Could not deposit amount`, error)
        dispatch(depositSecTokens.rejected({ errorMessage: error.message }))
        onError()
      }
    },
    [dispatch, getEvents, tokenId]
  )
}

export function useCancelDepositCallback(): ({ requestId }: CancelDepositProps) => Promise<void> {
  const dispatch = useDispatch<AppDispatch>()
  const getEvents = useGetEventCallback()
  const { tokenId } = useEventState()
  return useCallback(
    async ({ requestId, onSuccess }: CancelDepositProps) => {
      dispatch(depositSecTokens.pending())
      try {
        await cancelDeposit({ requestId })
        getEvents({ tokenId, filter: 'all' })
        dispatch(depositSecTokens.fulfilled())
        onSuccess()
      } catch (error) {
        console.error(`Could not cancel deposit`, error)
        dispatch(depositSecTokens.rejected({ errorMessage: error.message }))
      }
    },
    [dispatch, getEvents, tokenId]
  )
}
