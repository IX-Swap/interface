import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { issuanceQueryKeys } from 'config/queryKeys'
import { useIssuanceRouter } from '../router'
import { issuanceURL } from 'config/apiURL'

export const useCommitmentStats = () => {
  const { apiService } = useServices()
  const { params } = useIssuanceRouter()
  const url = issuanceURL.dso.commitmentsStats(params.dsoId)

  const fetchCommitmentStats = async () => await apiService.get(url)
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.commitmentsStats(params.dsoId)],
    fetchCommitmentStats,
    { enabled: params.dsoId !== ':dsoId' }
  )

  return {
    ...rest,
    data: data?.data
  }
}
