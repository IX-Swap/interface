import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useIdentityStats = () => {
  const { apiService } = useServices()

  const getIdentityStats = async () =>
    await apiService.get(identityURL.stats.get)

  const { data, ...rest } = useQuery(
    identityQueryKeys.getStats,
    getIdentityStats
  )

  return {
    ...rest,
    data: data?.data
  }
}
