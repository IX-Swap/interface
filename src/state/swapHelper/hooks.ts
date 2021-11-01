import { Currency, Percent, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
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
import { getTokenExpiration, shouldRenewToken } from 'utils/time'
import { AppDispatch, AppState } from '../index'
import {
  clearAuthorization,
  saveAuthorization,
  setAuthorizationInProgress,
  setLoadingSwap,
  setOpenModal,
  setSwapState,
} from './actions'
import { BrokerDealerSwapDto, SwapConfirmArguments } from './typings'

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
export function useWatchAuthorizationExpire() {
  const authorizations = useAuthorizationsState()
  const { chainId } = useActiveWeb3React()
  const clearAuthorization = useClearAuthorization()
  useEffect(() => {
    if (!authorizations) {
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
  }, [chainId, authorizations, clearAuthorization])
}

// export function useSwapAuthorization(trade: V2Trade<Currency, Currency, TradeType> | undefined | null) {
//   const authorizations = useAuthorizationsState()
//   const secAddresses = useSwapSecTokenAddresses(trade)
//   const clearAuthorization = useClearAuthorization()
//   const address = secAddresses.find((addr) => addr !== null)
//   if (address) {
//     const authorization = authorizations?.[address]
//     if (!authorization) {
//       return null
//     }
//     const isExpired = shouldRenewToken(authorization?.expiresAt)
//     if (isExpired && authorization) {
//       clearAuthorization([address])
//       return null
//     }
//     const { s, v, r, operator, deadline } = authorization
//     return { s, v, r, operator, deadline }
//   }
//   return null
// }

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
  console.log({ secPairs })
  return secPairs
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
  const address = authorizationInProgress?.tokenAddress
  const brokerDealerId = authorizationInProgress?.brokerDealerId
  useEffect(() => {
    fetchAuthorization()
    async function fetchAuthorization() {
      if (parsedQs?.isError) {
        console.log('has error')
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
      if (!parsedQs?.hash || !parsedQs?.result) {
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
        const persistedAuthorization = { s, v, r, operator, deadline, expiresAt: getTokenExpiration('1 hour') }
        dispatch(setLoadingSwap({ isLoading: false }))
        dispatch(setAuthorizationInProgress({ authorizationInProgress: null }))
        dispatch(saveAuthorization({ authorization: persistedAuthorization, chainId, address }))
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
  }, [chainId, authorizations, parsedQs?.hash, parsedQs?.result, history, parsedQs?.isError, brokerDealerId, address])
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
