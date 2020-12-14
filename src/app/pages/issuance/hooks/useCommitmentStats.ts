import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'

export const useCommitmentStats = () => {
  const { apiService } = useServices()
  const url = `/issuance/dso/th1s1sm0ck1d/charts/commitment-stats`

  const fetchCommitmentStats = async () => await apiService.get(url)
  const { data, ...rest } = useQuery(['commitment-stats'], fetchCommitmentStats)

  return {
    ...rest,
    data: data?.data
  }
}
