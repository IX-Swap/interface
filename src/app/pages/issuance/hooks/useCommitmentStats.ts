import { useQuery } from 'react-query'
import { issuanceQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { useIssuanceQuery } from 'app/pages/issuance/hooks/useIssuanceQuery'

export const useCommitmentStats = () => {
  const { apiService, dsoId, queryEnabled } = useIssuanceQuery()
  const url = issuanceURL.dso.commitmentsStats(dsoId)

  const fetchCommitmentStats = async () => await apiService.get(url)
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.commitmentsStats(dsoId)],
    fetchCommitmentStats,
    { enabled: queryEnabled }
  )

  return {
    ...rest,
    data: data?.data
  }
}
