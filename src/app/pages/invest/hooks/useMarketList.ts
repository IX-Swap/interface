import { useFavoritePairs } from 'app/pages/invest/hooks/useFavoritePairs'
import { exchange as exchangeURL } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useParsedData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useInfiniteQuery } from 'react-query'
import { PaginatedData } from 'services/api/types'
import useMarketListFilters from 'app/pages/invest/hooks/useMarketListFilters'
import { useHistory } from 'react-router-dom'

export interface Pair {
  _id: string
  name: string
  isFavorite: boolean
  latestPrice: number
  _24hChangePercentage: number
  otc?: any
}

export const useMarketList = (showFilter: boolean | undefined = false) => {
  const { location } = useHistory()
  const { apiService } = useServices()
  const { data: favorites } = useFavoritePairs()
  const context = showFilter ? 'withFilter' : ''
  const filters = useMarketListFilters(showFilter)

  const fetchMarketList = async (
    queryKey: string,
    usedFilters?: any,
    cursor: number | undefined = 0
  ) => {
    const { listingKeyword, currency, sortBy, sortField } = usedFilters
    if (location?.pathname?.includes('trading')) {
      return await apiService.post<PaginatedData<Pair>>(exchangeURL.otcList, {
        skip: cursor,
        limit: 100,
        listingKeyword
        // currency,
        // sortBy,
        // sortField
      })
    } else {
      return await apiService.post<PaginatedData<Pair>>(
        exchangeURL.marketList,
        {
          skip: cursor,
          limit: 25,
          listingKeyword,
          currency,
          sortBy,
          sortField
        }
      )
    }
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

  const getFinalList = (list: Pair[]) => {
    if (filters.isFavorite ?? false) {
      return filterByFavorite(list)
    }
    return list
  }

  const parsedData = useParsedData<Pair>(data, '_id')
  return {
    data: {
      raw: parsedData.raw,
      map: parsedData.map,
      list: getFinalList(parsedData.list)
    },
    ...rest
  }
}
