import { useQuery } from 'react-query'
import { issuanceQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'

export const useMostPopularSTOs = (limit: number = 0) => {
  const { apiService } = useServices()
  const url = issuanceURL.sto.mostPopular

  const fetchMostPopularSTOs = async () =>
    await apiService.get(url, { params: { limit } })
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.mostPopular],
    fetchMostPopularSTOs
  )

  return {
    ...rest,
    data: data?.data
  }
}
