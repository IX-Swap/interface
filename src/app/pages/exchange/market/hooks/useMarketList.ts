import { exchange as exchangeURL } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export interface Pair {
  _id: string
  name: string
  isFavorite: boolean
  lastPrice: number
  change: number
  trend: 'up' | 'down'
}

export const useMarketList = (showFilter: boolean | undefined = false) => {
  const { apiService } = useServices()
  const { getFilterValue } = useQueryFilter()

  const getMarketListFilter = () => {
    const pairFilter = getFilterValue('pairFilter')
    const pairFilterIsFavorite = pairFilter === 'favorite'
    const isFavorite = pairFilterIsFavorite ? true : undefined
    const currency = pairFilterIsFavorite ? 'all' : pairFilter
    const search = getFilterValue('search')
    const sortBy = getFilterValue('sortBy')
    const orderBy = getFilterValue('orderBy')

    const filters = {
      skip: 0,
      limit: 500,
      search: showFilter ? search : undefined,
      isFavorite: showFilter ? isFavorite : undefined,
      currency: showFilter ? currency : undefined,
      sortBy: showFilter ? sortBy : undefined,
      orderBy: showFilter ? orderBy : undefined
    }

    return filters
  }

  const fetchMarketList = async (args: any) => {
    const response = await apiService.post<any>(
      exchangeURL.marketList,
      getMarketListFilter()
    )

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
