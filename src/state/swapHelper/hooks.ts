import { Currency, Percent, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import useParsedQueryString from 'hooks/useParsedQueryString'
import { useSwapSecToken } from 'hooks/useSwapAuthorize'
import { useMultihopAuthorization } from 'hooks/useSwapCallback'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { tokens } from 'services/apiUrls'
import { useAccreditationStatus } from 'state/secTokens/hooks'
import { completeDispatch } from 'utils/completeDispatch'
import { getTokenExpiration, shouldRenewToken } from 'utils/time'
import { AppDispatch, AppState } from '../index'
import { saveAuthorization } from './actions'
import { BrokerDealerSwapDto, SwapConfirmArguments } from './typings'
import { useHistory, useLocation } from 'react-router-dom'

export function useSwapHelpersState(): AppState['swapHelper'] {
  const data = useSelector<AppState, AppState['swapHelper']>((state) => state.swapHelper)
  return data
}
export function useSwapAuthorization(trade: V2Trade<Currency, Currency, TradeType> | undefined | null) {
  const { authorizations } = useSwapHelpersState()
  const { chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const secAddresses = useMultihopAuthorization(trade)
  const address = secAddresses.find((addr) => addr !== null)
  if (chainId && address) {
    const authorization = authorizations?.[chainId]?.[address]
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

export function usePersistAuthorization() {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()

  return useCallback(
    async (authorization, address) => {
      if (chainId) {
        console.log({ setAuthorization: `${address} ${authorization}` })
        await completeDispatch({ dispatch, action: saveAuthorization, args: { authorization: null, chainId, address } })
      }
    },
    [chainId]
  )
}
export function useSubmitAuthorizationToBrokerDealer() {
  const { submitForm } = useSubmitBrokerDealerForm()
  return useCallback(
    async (dto: BrokerDealerSwapDto, formRef: any) => {
      submitForm({ dto, formRef })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [submitForm]
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
    if (formRef.current !== null) {
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
  return { submitForm }
}

export function useSwapConfirmDataFromURL(
  trade: V2Trade<Currency, Currency, TradeType> | undefined,
  allowedSlippage: Percent
) {
  const dispatch = useDispatch<AppDispatch>()
  const parsedQs = useParsedQueryString()
  const authorization = useSwapAuthorization(trade)
  const { selectedCurrency } = useSwapSecToken(trade, allowedSlippage)
  const { accreditationRequest } = useAccreditationStatus((selectedCurrency as any)?.address)
  const { chainId } = useActiveWeb3React()
  const location = useLocation()
  const history = useHistory()
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const swapConfirm = {
      hash: (parsedQs?.hash as string) || '',
      encryptedData: (parsedQs?.result as string) || '',
      brokerDealerId: (accreditationRequest as any)?.brokerDealerId,
    }
    fetchAuthorization()
    async function fetchAuthorization() {
      const address = (selectedCurrency as any)?.address
      try {
        if (!parsedQs?.hash || !parsedQs?.result || authorization || !accreditationRequest || !chainId || !address) {
          return
        }
        const response = await getSwapConfirmAuthorization({ ...swapConfirm })
        const data = response.data
        const { s, v, r, operator, deadline } = data
        const persistedAuthorization = { s, v, r, operator, deadline, expiresAt: getTokenExpiration('1 hour') }
        history.replace({
          search: queryParams.toString(),
        })
        dispatch(saveAuthorization({ authorization: persistedAuthorization, chainId, address }))
      } catch (e) {
        console.log({ e })
      }
    }
  }, [accreditationRequest, chainId, selectedCurrency, authorization, parsedQs?.hash, parsedQs?.result])
}

export async function getSwapConfirmAuthorization({ brokerDealerId, hash, encryptedData }: SwapConfirmArguments) {
  const response = await apiService.post(tokens.swapConfirm(brokerDealerId), { hash, encryptedData })
  return response
}
