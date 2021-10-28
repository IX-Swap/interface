import { Currency, Percent, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
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
import { completeDispatch } from 'utils/completeDispatch'
import { getTokenExpiration, shouldRenewToken } from 'utils/time'
import { AppDispatch, AppState } from '../index'
import { saveAuthorization, saveTokenInProgress, setOpenModal, setSwapState } from './actions'
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

export function useWatchAuthorizationExpire() {
  const authorizations = useAuthorizationsState()
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()
  useEffect(() => {
    for (const address in authorizations) {
      const authorization = authorizations?.[address]
      if (authorization && chainId) {
        const isExpired = shouldRenewToken(authorization?.expiresAt)
        if (isExpired && authorization) {
          dispatch(saveAuthorization({ authorization: null, chainId, address }))
        }
      }
    }
  }, [chainId, authorizations])
}

export function useSwapAuthorization(trade: V2Trade<Currency, Currency, TradeType> | undefined | null) {
  const authorizations = useAuthorizationsState()
  const dispatch = useDispatch<AppDispatch>()
  const secAddresses = useSwapSecTokenAddresses(trade)
  const address = secAddresses.find((addr) => addr !== null)
  const { chainId } = useActiveWeb3React()
  if (chainId && address) {
    const authorization = authorizations?.[address]
    if (!authorization) {
      return null
    }
    const isExpired = shouldRenewToken(authorization?.expiresAt)
    if (isExpired && authorization) {
      dispatch(saveAuthorization({ authorization: null, chainId, address }))
      return null
    }
    const { s, v, r, operator, deadline } = authorization
    return { s, v, r, operator, deadline }
  }
  return null
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
  return [isFirstSec ? pairs[0][1] : null, isLastSec ? pairs[1][1] : null]
}
export function usePersistAuthorization() {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()

  return useCallback(
    async (authorization, address) => {
      if (chainId && address) {
        console.log({ setAuthorization: `${address} ${authorization}` })
        await completeDispatch({
          dispatch,
          action: saveAuthorization,
          args: { authorization: authorization || null, chainId, address },
        })
      }
    },
    [chainId]
  )
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
  const authorizations = useAuthorizationsState()
  const { tokenInProgress } = useSwapHelpersState()
  const { chainId } = useActiveWeb3React()
  useEffect(() => {
    fetchAuthorization()
    async function fetchAuthorization() {
      if (!tokenInProgress) {
        return
      }
      const authorization = authorizations?.[tokenInProgress?.address]
      const accreditationRequest = (tokenInProgress as any)?.tokenInfo?.accreditationRequest
      if (!accreditationRequest || authorization) {
        return
      }

      const swapConfirm = {
        hash: (parsedQs?.hash as string) || '',
        encryptedData: (parsedQs?.result as string) || '',
        brokerDealerId: accreditationRequest?.brokerDealerId,
      }
      const address = (tokenInProgress as any)?.tokenInfo?.address
      try {
        if (!parsedQs?.hash || !parsedQs?.result || !accreditationRequest || !chainId || !address) {
          return
        }
        dispatch(saveTokenInProgress({ token: null }))

        const response = await getSwapConfirmAuthorization({ ...swapConfirm })
        const data = response.data
        const { s, v, r, operator, deadline } = data
        const persistedAuthorization = { s, v, r, operator, deadline, expiresAt: getTokenExpiration('1 hour') }
        history.push(`/swap`)
        dispatch(saveAuthorization({ authorization: persistedAuthorization, chainId, address }))
      } catch (e) {
        console.log({ e })
      }
    }
  }, [tokenInProgress, chainId, authorizations, parsedQs?.hash, parsedQs?.result, history])
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
