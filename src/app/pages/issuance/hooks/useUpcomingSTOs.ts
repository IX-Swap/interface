import { useQuery } from 'react-query'
import { issuanceQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'

export const useUpcomingSTOs = (limit: number = 0) => {
  const { apiService } = useServices()
  const url = issuanceURL.sto.upcoming

  const fetchUpcomingSTOs = async () => await apiService.post(url, { limit })
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.upcoming],
    fetchUpcomingSTOs
  )

  return {
    ...rest,
    data: data?.data
  }
}
