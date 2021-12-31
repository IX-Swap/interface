import { useParsedData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useInfiniteQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { balanceQueryKeys } from 'config/queryKeys'

export const useDistribution = () => {
  const { apiService } = useServices()
  const { dsoId } = useParams<{ dsoId: string; issuerId: string }>()

  const fetchDistribution = async () => {
    const uri = '/issuance/distribution/list'
    return await apiService.post(uri, {
      skip: 0,
      limit: 10,
      status: 'Approved'
    })
  }

  const { data, ...rest } = useInfiniteQuery(
    balanceQueryKeys.getDistribution(dsoId),
    fetchDistribution
  )
  return {
    data: useParsedData<any>(data, '_id'),
    ...rest
  }
}
