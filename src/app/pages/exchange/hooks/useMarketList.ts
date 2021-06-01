import { exchange as exchangeURL } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export interface Pair {
  _id: string
  name: string
}

export const useMarketList = () => {
  const { apiService } = useServices()

  const fetchMarketList = async (args: any) => {
    const response = await apiService.post<any>(exchangeURL.marketList, {
      skip: 0,
      limit: 500
    })

    return response.data[0].documents
  }

  const { data, ...rest } = useQuery(
    exchangeQueryKeys.marketList,
    fetchMarketList
  )

  return {
    data: data,
    ...rest
  }
}
