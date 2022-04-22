import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import { t } from '@lingui/macro'
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
import {
  depositSecTokens,
  setCurrency,
  setModalView,
  setNetworkName,
  typeAmount,
  typeSender,
  resetDeposit,
} from './actions'
import { DepositModalView } from './reducer'
import walletValidator from 'multicoin-address-validator'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal, useToggleTransactionModal } from 'state/application/hooks'

export function useDepositState(): AppState['deposit'] {
  return useSelector<AppState, AppState['deposit']>((state) => state.deposit)
}

export function useDepositActionHandlers(): {
  onTypeAmount: (typedValue: string) => void
  onTypeSender: (typedValue: string) => void
  onCurrencySet: (currencyId: string) => void
  onNetworkSet: (networkName: string) => void
  onResetDeposit: () => void
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
  const onNetworkSet = useCallback(
    (networkName: string) => {
      dispatch(setNetworkName({ networkName }))
    },
    [dispatch]
  )
  const onResetDeposit = useCallback(() => {
    dispatch(resetDeposit())
  }, [dispatch])
  return {
    onTypeAmount,
    onTypeSender,
    onCurrencySet,
    onNetworkSet,
    onResetDeposit,
  }
}

export function useDerivedDepositInfo(): {
  parsedAmount: CurrencyAmount<Currency> | undefined
  inputError?: string
  formattedFrom: string | false
} {
  const { account } = useActiveWeb3React()

  const { amount, sender, currencyId, networkName } = useDepositState()

  const inputCurrency = useCurrency(currencyId)

  const parsedAmount = tryParseAmount(amount, inputCurrency ?? undefined)

  let inputError: string | undefined
  if (!account) {
    inputError = t`Connect Wallet`
  }

  if (!parsedAmount) {
    inputError = inputError ?? t`Enter an amount`
  }

  let formattedFrom = isAddress(sender)
  if (!sender) {
    inputError = inputError ?? t`Enter a sender`
  } else if (!formattedFrom) {
    const isValidForNetwork = walletValidator.validate(sender, networkName ?? 'Ethereum')
    if (!isValidForNetwork) {
      inputError = inputError ?? t`Sender is invalid`
    }
    if (isValidForNetwork) {
      formattedFrom = sender
    }
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
}
interface CancelDepositProps {
  requestId: number
  onSuccess?: () => void
}

export function useDepositCallback(): ({ id, amount }: DepositProps) => Promise<void> {
  const dispatch = useDispatch<AppDispatch>()
  const getEvents = useGetEventCallback()
  const { tokenId } = useEventState()
  const toggle = useToggleTransactionModal()

  return useCallback(
    async ({ id, amount, fromAddress }: DepositProps) => {
      dispatch(setModalView({ view: DepositModalView.PENDING }))
      dispatch(depositSecTokens.pending())
      try {
        const response = await depositToken({ tokenId: id, amount, fromAddress })
        if (!response?.data) {
          throw new Error(t`Something went wrong. Could not deposit amount`)
        }
        dispatch(setLogItem({ logItem: response.data }))
        toggle()

        getEvents({ tokenId, filter: 'all' })
        dispatch(depositSecTokens.fulfilled())
      } catch (error: any) {
        console.error(`Could not deposit amount`, error)
        dispatch(depositSecTokens.rejected({ errorMessage: error.message }))
        dispatch(setModalView({ view: DepositModalView.ERROR }))
      }
    },
    [dispatch, getEvents, tokenId]
  )
}

export function useCancelDepositCallback(): ({ requestId, onSuccess }: CancelDepositProps) => Promise<void> {
  const dispatch = useDispatch<AppDispatch>()
  const getEvents = useGetEventCallback()
  const { tokenId } = useEventState()
  return useCallback(
    async ({ requestId, onSuccess }: CancelDepositProps) => {
      dispatch(setModalView({ view: DepositModalView.PENDING }))
      dispatch(depositSecTokens.pending())
      try {
        await cancelDeposit({ requestId })
        getEvents({ tokenId, filter: 'all' })
        dispatch(depositSecTokens.fulfilled())
        dispatch(setLogItem({ logItem: null }))
        dispatch(setModalView({ view: DepositModalView.CREATE_REQUEST }))
        onSuccess && onSuccess()
      } catch (error: any) {
        console.error(`Could not cancel transaction ${requestId}`, error)
        dispatch(depositSecTokens.rejected({ errorMessage: error.message }))
        dispatch(setModalView({ view: DepositModalView.ERROR }))
      }
    },
    [dispatch, getEvents, tokenId]
  )
}

export const useShowAboutWrappingCallback = () => {
  const dispatch = useDispatch<AppDispatch>()
  const open = useModalOpen(ApplicationModal.DEPOSIT)
  const toggle = useToggleModal(ApplicationModal.DEPOSIT)
  return useCallback(() => {
    if (!open) {
      toggle()
    }
    dispatch(setModalView({ view: DepositModalView.ABOUT_WRAPPING }))
  }, [dispatch, open, toggle])
}

export function useHideAboutWrappingCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(() => {
    dispatch(setModalView({ view: DepositModalView.CREATE_REQUEST }))
  }, [dispatch])
}
