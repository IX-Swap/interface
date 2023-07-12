import { useQuery } from 'react-query'
import { issuanceQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'

export const useTotalStats = () => {
  const { apiService } = useServices()
  const url = issuanceURL.sto.totalStats

  const fetchTotalStats = async () => await apiService.get(url)
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.totalStats],
    fetchTotalStats
  )

  return {
    ...rest,
    data: data?.data
  }
}
