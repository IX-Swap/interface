import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { issuanceQueryKeys } from 'config/queryKeys'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { issuanceURL } from 'config/apiURL'

export const useTopInvestors = () => {
  const { apiService } = useServices()
  const { params } = useIssuanceRouter()
  const url = issuanceURL.dso.topInvestors(params.dsoId)

  const fetchTopInvestors = async () => await apiService.get(url)
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.topInvestors(params.dsoId)],
    fetchTopInvestors
  )

  return {
    ...rest,
    data: data?.data
  }
}
