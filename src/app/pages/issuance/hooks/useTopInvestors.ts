import { useQuery } from 'react-query'
import { issuanceQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { useIssuanceQuery } from 'app/pages/issuance/hooks/useIssuanceQuery'

export const useTopInvestors = () => {
  const { apiService, dsoId, queryEnabled } = useIssuanceQuery()
  const url = issuanceURL.dso.topInvestors(dsoId)

  const fetchTopInvestors = async () => await apiService.get(url)
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.topInvestors(dsoId)],
    fetchTopInvestors,
    { enabled: queryEnabled }
  )

  return {
    ...rest,
    data: data?.data
  }
}
