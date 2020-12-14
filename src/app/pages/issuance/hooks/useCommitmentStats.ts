import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { issuanceQueryKeys } from 'config/queryKeys'
import { useIssuanceRouter } from '../router'

export const useCommitmentStats = () => {
  const { apiService } = useServices()
  const { params } = useIssuanceRouter()
  const url = `/issuance/dso/${params.dsoId}/charts/commitment-stats`

  const fetchCommitmentStats = async () => await apiService.get(url)
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.commitmentsStats(params.dsoId)],
    fetchCommitmentStats
  )

  return {
    ...rest,
    data: data?.data
  }
}
