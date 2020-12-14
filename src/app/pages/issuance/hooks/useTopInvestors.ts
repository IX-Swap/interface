import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { issuanceQueryKeys } from 'config/queryKeys'
import { useIssuanceRouter } from '../router'

export const useTopInvestors = () => {
  const { apiService } = useServices()
  const { params } = useIssuanceRouter()
  const url = `/issuance/dso/${params.dsoId}/charts/top-investors`

  const fetchCommitmentStats = async () => await apiService.get(url)
  const { data, ...rest } = useQuery(
    [issuanceQueryKeys.topInvestors],
    fetchCommitmentStats
  )

  return {
    ...rest,
    data: data?.data
  }
}
