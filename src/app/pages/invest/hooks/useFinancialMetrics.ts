import { exchange as exchangeApiUrls } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export const useFinancialMetrics = () => {
  const { pairId } = useParams<{ pairId: string }>()
  const { apiService } = useServices()

  const fetchMetrics = async () => {
    const url = exchangeApiUrls.getMetrics(pairId)
    return await apiService.get(url)
  }

  const { data, ...rest } = useQuery<any>(
    exchangeQueryKeys.getMetrics(pairId),
    fetchMetrics
  )

  return {
    data,
    ...rest
  }
}
