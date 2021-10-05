import { Currency, Percent, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import useParsedQueryString from 'hooks/useParsedQueryString'
import { useSwapSecToken } from 'hooks/useSwapAuthorization'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { tokens } from 'services/apiUrls'
import { useAccreditationStatus } from 'state/secTokens/hooks'
import { AppDispatch, AppState } from '../index'
import { saveAuthorization } from './actions'
import { BrokerDealerSwapDto, SwapConfirmArguments } from './typings'

export function useSwapHelpersState(): AppState['swapHelper'] {
  const data = useSelector<AppState, AppState['swapHelper']>((state) => state.swapHelper)
  return data
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
  const { authorization } = useSwapHelpersState()
  const { selectedCurrency } = useSwapSecToken(trade, allowedSlippage)
  const { accreditationRequest } = useAccreditationStatus((selectedCurrency as any)?.address)

  useEffect(() => {
    if (!parsedQs?.hash || !parsedQs?.result || authorization || !accreditationRequest) {
      return
    }
    const swapConfirm = {
      hash: (parsedQs?.hash as string) || '',
      encryptedData: (parsedQs?.result as string) || '',
      brokerDealerId: (accreditationRequest as any)?.brokerDealerId,
    }
    fetchAuthorization()
    async function fetchAuthorization() {
      try {
        const response = await getSwapConfirmAuthorization({ ...swapConfirm })
        dispatch(saveAuthorization({ authorization: response }))
      } catch (e) {
        console.log({ e })
      }
    }
  }, [accreditationRequest, authorization, parsedQs?.hash, parsedQs?.result])
}

export async function getSwapConfirmAuthorization({ brokerDealerId, hash, encryptedData }: SwapConfirmArguments) {
  const response = await apiService.post(tokens.swapConfirm(brokerDealerId), { hash, encryptedData })
  return response
}
