import { trading as tradingApiUrl } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { isEmptyString } from 'helpers/strings'

export const useOTCOrderBook = (pairId?: string) => {
  const { apiService } = useServices()

  const getOrderBook = async () => {
    return await apiService.get(tradingApiUrl.getOtcOrderBook(pairId))
  }

  const { data, ...rest } = useQuery(
    tradingQueryKeys.orderBook(pairId),
    getOrderBook,
    { enabled: !isEmptyString(pairId) }
  )
  return { ...rest, data: data?.data }
}
