import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { OTCMarket } from 'types/market'

export const useFeaturedPair = () => {
  const { apiService } = useServices()

  const getFeaturedPair = async () => {
    return await apiService.get<OTCMarket>(trading.getFeaturedPair)
  }

  const { data, ...rest } = useQuery(
    tradingQueryKeys.featuredPair,
    getFeaturedPair
  )
  return { ...rest, data: data?.data }
}
