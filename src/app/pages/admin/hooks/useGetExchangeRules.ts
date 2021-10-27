import { resources } from 'config/apiURL'
import { resourcesQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery, useQueryCache } from 'react-query'

export const useGetExchangeRules = () => {
  const { apiService } = useServices()
  const queryCache = useQueryCache()

  const getExchangeRules = async () => {
    return await apiService.get(resources.getExchangeRules)
  }

  const { data, ...rest } = useQuery(
    resourcesQueryKeys.exchangeRules,
    getExchangeRules,
    {
      retry: 0,
      onError: () => {
        queryCache.setQueryData(
          resourcesQueryKeys.exchangeRules,
          () => undefined
        )
      }
    }
  )

  return {
    data: data?.data,
    ...rest
  }
}
