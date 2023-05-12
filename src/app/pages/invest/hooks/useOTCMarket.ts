import {
  trading as tradingApiUrl,
  exchange as exchangeApiUrl
} from 'config/apiURL'
import { tradingQueryKeys, exchangeMarketQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { isEmptyString } from 'helpers/strings'

export const useOTCMarket = (pairId?: string) => {
  const { apiService } = useServices()

  const getMarket = async () => {
    return await apiService.get(tradingApiUrl.getMarket(pairId))
  }

  const { data, ...rest } = useQuery(
    tradingQueryKeys.market(pairId),
    getMarket,
    { enabled: !isEmptyString(pairId) }
  )
  return { ...rest, data: data?.data }
}

export const useExchage = (pairId?: string) => {
  const { apiService } = useServices()

  const getExchange = async () => {
    return await apiService?.get(exchangeApiUrl?.getMarket(pairId))
  }

  const { data } = useQuery(
    exchangeMarketQueryKeys.getOrdersList(pairId),
    getExchange,
    { enabled: !isEmptyString(pairId) }
  )
  return { data: data?.data }
}
