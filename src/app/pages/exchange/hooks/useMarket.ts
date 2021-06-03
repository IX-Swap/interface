import { exchange as exchangeApiUrl } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useMarket = (pairId: string) => {
  const { apiService } = useServices()

  const getMarket = async () => {
    return await apiService.get(exchangeApiUrl.getMarket(pairId))
  }

  const { data, ...rest } = useQuery(
    exchangeQueryKeys.market(pairId),
    getMarket
  )
  return { ...rest, data: data?.data }
}
