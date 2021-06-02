import { exchange as exchangeURL } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useParsedData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useInfiniteQuery } from 'react-query'
import { PaginatedData } from 'services/api/types'

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
      search: showFilter ? search : undefined,
      isFavorite: showFilter ? isFavorite : undefined,
      currency: showFilter ? currency : undefined,
      sortBy: showFilter ? sortBy : undefined,
      orderBy: showFilter ? orderBy : undefined
    }

    return filters
  }

  const fetchMarketList = async (
    queryKey: string,
    cursor: number | undefined = 0
  ) => {
    return await apiService.post<PaginatedData<Pair>>(exchangeURL.marketList, {
      skip: cursor,
      limit: 25,
      ...getMarketListFilter()
    })
  }

  const { data, ...rest } = useInfiniteQuery(
    exchangeQueryKeys.marketList,
    fetchMarketList,
    {
      getFetchMore: (lastGroup, allGroups) =>
        lastGroup.data?.[0].limit + lastGroup.data?.[0].skip
    }
  )

  return {
    data: {
      ...useParsedData<Pair>(data, '_id')
    },
    ...rest
  }
}
