import { Currency, CurrencyAmount, Percent, TradeType } from '@ixswap1/sdk-core'
import { Pair, Trade as V2Trade } from '@ixswap1/v2-sdk'
import { t } from '@lingui/macro'
import * as H from 'history'
import { useCurrency } from 'hooks/Tokens'
import useParsedQueryString from 'hooks/useParsedQueryString'
import { useSwapSecTokenAddresses } from 'hooks/useSwapCallback'
import { useV2Pairs } from 'hooks/useV2Pairs'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { tokens } from 'services/apiUrls'
import { setModalDetails } from 'state/application/actions'
import { ModalType } from 'state/application/reducer'
import { getStringAmount } from 'utils/getStringAmount'
import { hexTimeToTokenExpirationTime, shouldRenewToken } from 'utils/time'
import { AppDispatch, AppState } from '../index'
import {
  clearAuthorization,
  saveAuthorization,
  setAuthorizationInProgress,
  setLoadingSwap,
  setOpenModal,
  setSwapState,
} from './actions'
import { BrokerDealerSwapDto, SwapAuthorization, SwapConfirmArguments } from './typings'

export function useSwapHelpersState(): AppState['swapHelper'] {
  const data = useSelector<AppState, AppState['swapHelper']>((state) => state.swapHelper)
  return data
}
export function useAuthorizationsState() {
  const { authorizations } = useSwapHelpersState()
  const { chainId } = useActiveWeb3React()
  return useMemo(() => (chainId ? authorizations?.[chainId] : undefined), [chainId, authorizations])
}

export function useClearAuthorization() {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()
  return useCallback(
    (addresses: string[]) => {
      if (chainId) {
        dispatch(clearAuthorization({ addresses, chainId }))
      }
    },
    [chainId]
  )
}

export const isDifferenceAcceptable = ({ cached, newSum }: { cached: number; newSum: number }) => {
  const acceptedDifference = cached * 0.04
  const actualDifference = Math.abs(cached - newSum)
  return actualDifference <= acceptedDifference
}
export const getAddressIfChanged = ({
  address,
  authorizations,
  amountToCompare,
}: {
  address?: string
  authorizations:
    | {
        [address: string]: SwapAuthorization | null
      }
    | undefined
  amountToCompare: string
}) => {
  if (address && amountToCompare) {
    const authorization = authorizations?.[address]
    if (authorization) {
      const { amount } = authorization
      const numberAmount = parseInt(amount, 10)
      const numberInputAmount = parseInt(amountToCompare || '', 10)
      if (!isNaN(numberAmount) && !isNaN(numberInputAmount)) {
        if (!isDifferenceAcceptable({ cached: numberAmount, newSum: numberInputAmount })) {
          return address
        }
      }
    }
  }
  return null
}

export const getAddressesIfChangedAmount = ({
  secPairs,
  trade,
  authorizations,
  allowedSlippage,
}: {
  secPairs: Array<Pair | null>
  trade: V2Trade<Currency, Currency, TradeType> | undefined | null
  allowedSlippage: Percent
  authorizations:
    | {
        [address: string]: SwapAuthorization | null
      }
    | undefined
}) => {
  const adressesToRemove = []
  const inputAmount = trade ? getStringAmount(trade?.maximumAmountIn(allowedSlippage)) : ''
  const outputAmount = trade ? getStringAmount(trade?.minimumAmountOut(allowedSlippage)) : ''
  const inputAddress = secPairs?.[0]?.liquidityToken.address
  const outputAddress = secPairs?.[1]?.liquidityToken.address
  const addressFirst = getAddressIfChanged({ address: inputAddress, authorizations, amountToCompare: inputAmount })
  const addressSecond = getAddressIfChanged({ address: outputAddress, authorizations, amountToCompare: outputAmount })
  if (addressFirst) {
    adressesToRemove.push(addressFirst)
  }
  if (addressSecond) {
    adressesToRemove.push(addressSecond)
  }
  return adressesToRemove
}

export function useWatchAuthorizationExpire(trade: V2Trade<Currency, Currency, TradeType> | undefined | null) {
  const authorizations = useAuthorizationsState()
  const { chainId } = useActiveWeb3React()
  const clearAuthorization = useClearAuthorization()
  const { secPairs } = useSwapSecPairs(trade)

  useEffect(() => {
    if (!authorizations || Object.keys(authorizations).length === 0 || (secPairs[0] === null && secPairs[1] === null)) {
      return
    }

    const authorizationKeys = Object.keys(authorizations)
    const adressesToDelete = authorizationKeys.filter((address) => {
      const authorization = authorizations?.[address]
      return authorization && shouldRenewToken(authorization?.expiresAt)
    })
    if (adressesToDelete?.length) {
      clearAuthorization(adressesToDelete)
    }
  }, [chainId, authorizations, clearAuthorization, secPairs])
}

// the swap will have at most 2 relevant sec tokens
// expected result [Pair, Pair] or [Pair, null] or [null, Pair] or [null, null]
export function useSwapSecPairs(trade: V2Trade<Currency, Currency, TradeType> | undefined | null) {
  const tokenPath = trade?.route?.path
  const addresses = tokenPath?.map((token) => token?.address)
  // array where strings are sec token addresses on the first or last position and the rest of elements are null
  const swapSecTokens = useSwapSecTokenAddresses(trade)
  const currency0 = useCurrency(addresses?.[0] || undefined)
  const currency1 = useCurrency(addresses?.[1] || undefined)
  const currency3 = useCurrency(addresses?.[addresses?.length - 1] || undefined)
  const currency4 = useCurrency(addresses?.[addresses?.length - 2] || undefined)
  const pairs = useV2Pairs([
    [currency0, currency1],
    [currency3, currency4],
  ])
  const isFirstSec = Boolean(swapSecTokens[0])
  const isLastSec = Boolean(swapSecTokens[swapSecTokens?.length - 1])
  const secPairs = [isFirstSec ? pairs[0][1] : null, isLastSec ? pairs[1][1] : null]
  const currencies = [currency0, currency1, currency3, currency4]
  return { secPairs, currencies }
}

export function useSubmitBrokerDealerForm() {
  const submitForm = useCallback(({ dto, formRef }: { dto: BrokerDealerSwapDto; formRef: any }) => {
    const endpoint = dto?.endpoint
    const callbackEndpoint = `${dto?.callbackEndpoint}/${dto?.brokerDealerId}`
    const data = dto?.encryptedData
    const hash = dto?.hash
    const formValues: { [key: string]: string } = {
      callbackEndpoint,
      data,
      hash,
    }
    if (formRef?.current) {
      formRef.current.action = endpoint
      for (const key in formValues) {
        const input = document.createElement('input')
        input.setAttribute('name', key)
        input.setAttribute('value', formValues[key])
        formRef.current.appendChild(input)
      }
      formRef.current.submit()
    }
  }, [])
  return submitForm
}

export function useSwapConfirmDataFromURL(
  trade: V2Trade<Currency, Currency, TradeType> | undefined,
  allowedSlippage: Percent,
  history: H.History
) {
  const dispatch = useDispatch<AppDispatch>()
  const parsedQs = useParsedQueryString()
  // maybe later avoid the request if there already is an authorization but maybe not
  const authorizations = useAuthorizationsState()
  const { authorizationInProgress } = useSwapHelpersState()
  const { chainId } = useActiveWeb3React()
  const address = authorizationInProgress?.pairAddress
  const brokerDealerId = authorizationInProgress?.brokerDealerId
  const amount = authorizationInProgress?.amount || '0'
  useEffect(() => {
    fetchAuthorization()
    async function fetchAuthorization() {
      if (parsedQs?.isError) {
        dispatch(setAuthorizationInProgress({ authorizationInProgress: null }))
        dispatch(setLoadingSwap({ isLoading: false }))
        dispatch(
          setModalDetails({
            modalType: ModalType.ERROR,
            modalTitle: t`Something went wrong`,
            modalMessage: t`Please retry`,
          })
        )
        history.push(`/swap`)
        return
      }
      if (!parsedQs?.hash || !parsedQs?.result || !authorizationInProgress) {
        return
      }

      if (brokerDealerId === undefined || !chainId || !address) {
        dispatch(setAuthorizationInProgress({ authorizationInProgress: null }))
        dispatch(setLoadingSwap({ isLoading: false }))
        history.push(`/swap`)
        return
      }

      const swapConfirm = {
        hash: (parsedQs?.hash as string) || '',
        encryptedData: (parsedQs?.result as string) || '',
        brokerDealerId,
      }
      try {
        const response = await getSwapConfirmAuthorization({ ...swapConfirm })
        const data = response.data
        const { s, v, r, operator, deadline } = data
        const persistedAuthorization = {
          s,
          v,
          r,
          operator,
          deadline,
          expiresAt: hexTimeToTokenExpirationTime(deadline),
          amount,
        }
        dispatch(setLoadingSwap({ isLoading: false }))
        dispatch(setAuthorizationInProgress({ authorizationInProgress: null }))
        dispatch(saveAuthorization({ authorization: persistedAuthorization, chainId, address }))
        dispatch(
          setModalDetails({
            modalType: ModalType.SUCCESS,
            modalTitle: t`Success`,
            modalMessage: t`Transaction authorized by broker dealer`,
          })
        )
        history.push(`/swap`)
      } catch (e) {
        console.log({ e })
        dispatch(setLoadingSwap({ isLoading: false }))
        dispatch(setAuthorizationInProgress({ authorizationInProgress: null }))
        dispatch(
          setModalDetails({
            modalType: ModalType.ERROR,
            modalTitle: t`Something went wrong`,
            modalMessage: t`Please retry`,
          })
        )
        history.push(`/swap`)
      }
    }
  }, [
    chainId,
    amount,
    authorizations,
    parsedQs?.hash,
    parsedQs?.result,
    history,
    parsedQs?.isError,
    brokerDealerId,
    address,
  ])
}

export async function getSwapConfirmAuthorization({ brokerDealerId, hash, encryptedData }: SwapConfirmArguments) {
  const response = await apiService.post(tokens.swapConfirm(brokerDealerId), { hash, encryptedData })
  return response
}

export function useSetSwapState() {
  const dispatch = useDispatch<AppDispatch>()
  const { localSwap } = useSwapHelpersState()
  const localSetSwapState = useCallback(
    ({
      showConfirm,
      tradeToConfirm,
      attemptingTxn,
      swapErrorMessage,
      txHash,
    }: {
      showConfirm: boolean
      tradeToConfirm: V2Trade<Currency, Currency, TradeType> | undefined
      attemptingTxn: boolean
      swapErrorMessage: string | undefined
      txHash: string | undefined
    }) => {
      dispatch(setSwapState({ showConfirm, tradeToConfirm, attemptingTxn, swapErrorMessage, txHash }))
    },
    [dispatch]
  )
  return {
    showConfirm: localSwap?.showConfirm,
    tradeToConfirm: localSwap?.tradeToConfirm,
    attemptingTxn: localSwap?.attemptingTxn,
    swapErrorMessage: localSwap?.swapErrorMessage,
    txHash: localSwap?.txHash,
    setSwapState: localSetSwapState,
  }
}

export function useOpenModal() {
  const { openModal } = useSwapHelpersState()
  const dispatch = useDispatch<AppDispatch>()
  const localSetOpenModal = useCallback(
    (open: boolean) => {
      dispatch(setOpenModal({ openModal: open }))
    },
    [dispatch]
  )
  return { openModal, setOpenModal: localSetOpenModal }
}
