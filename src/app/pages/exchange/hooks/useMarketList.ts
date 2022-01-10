import { useFavoritePairs } from 'app/pages/exchange/hooks/useFavoritePairs'
import { exchange as exchangeURL } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useParsedData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useInfiniteQuery } from 'react-query'
import { PaginatedData } from 'services/api/types'
import useMarketListFilters from './useMarketListFilters'

export interface Pair {
  _id: string
  name: string
  isFavorite: boolean
  latestPrice: number
  _24hChangePercentage: number
}

export const useMarketList = (showFilter: boolean | undefined = false) => {
  const { apiService } = useServices()
  const { data: favorites } = useFavoritePairs()
  const context = showFilter ? 'withFilter' : ''
  const filters = useMarketListFilters(showFilter)

  const fetchMarketList = async (
    queryKey: string,
    usedFilters?: any,
    cursor: number | undefined = 0
  ) => {
    const { listingKeyword } = usedFilters
    return await apiService.post<PaginatedData<Pair>>(exchangeURL.marketList, {
      skip: cursor,
      limit: 25,
      listingKeyword
    })
  }

  const { data, ...rest } = useInfiniteQuery(
    [`${exchangeQueryKeys.marketList}-${context}`, filters],
    fetchMarketList,
    {
      getFetchMore: (lastGroup, allGroups) =>
        lastGroup.data?.[0].limit + lastGroup.data?.[0].skip
    }
  )

  const filterByFavorite = (list: Pair[]) => {
    if (favorites !== undefined && favorites.length > 0) {
      return list.filter((pair: Pair) => favorites.includes(pair._id))
    }
    return list
  }

  const parsedData = useParsedData<Pair>(data, '_id')
  return {
    data: {
      raw: parsedData.raw,
      map: parsedData.map,
      list:
        filters.isFavorite ?? false
          ? filterByFavorite(parsedData.list)
          : parsedData.list
    },
    ...rest
  }
}
