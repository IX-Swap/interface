import { trading as tradingApiUrl } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
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
