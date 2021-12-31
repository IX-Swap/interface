import { atlasOneURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export const useTimeSeries = () => {
  const { apiService } = useServices()
  const { ticker } = useParams<{ ticker: string }>()

  const getTimeSeries = async () => {
    return await apiService.post<any>(atlasOneURL.getTimeSeries, { ticker })
  }

  const { data, ...rest } = useQuery([ticker, 'time-series'], getTimeSeries)
  const flat = data?.data[0].documents

  return {
    data: flat?.map((item: any) => ({ time: item.date, value: item.price })),
    ...rest
  }
}
